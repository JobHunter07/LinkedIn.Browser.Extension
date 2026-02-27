import { spawn, spawnSync } from 'node:child_process';
import process from 'node:process';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

const HOST = process.env.STORYBOOK_HOST || '127.0.0.1';
const PORT = Number(process.env.STORYBOOK_PORT || '6006');
const BASE_URL = `http://${HOST}:${PORT}`;
const SERVER_START_TIMEOUT_MS = 120_000;

function npmCommand() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

function storybookStartCommand(port, host) {
  if (process.platform === 'win32') {
    return {
      command: 'cmd.exe',
      args: ['/d', '/s', '/c', `${npmCommand()} run storybook -- --ci --quiet -p ${port} --host ${host}`]
    };
  }

  return {
    command: npmCommand(),
    args: ['run', 'storybook', '--', '--ci', '--quiet', '-p', String(port), '--host', host]
  };
}

function stopServer(serverProcess) {
  if (!serverProcess || serverProcess.killed || serverProcess.exitCode !== null) return;

  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(serverProcess.pid), '/t', '/f'], { stdio: 'ignore' });
    return;
  }

  try {
    process.kill(-serverProcess.pid, 'SIGTERM');
  } catch {
    serverProcess.kill('SIGTERM');
  }
}

async function waitForServer(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, { method: 'GET' });
      if (response.ok) return;
    } catch {
      // Keep polling while server starts.
    }

    await delay(1000);
  }

  throw new Error(`Timed out waiting for Storybook at ${url}`);
}

/**
 * Returns true for errors that are Storybook infrastructure noise rather than
 * real component failures.  These appear in every story when Storybook is loaded
 * headlessly without the full manager/channel running:
 *   • WebSocket 403  – the Storybook server-channel rejects auth-less connections
 *   • storybook/* follower state – addon-vitest expects a manager leader that
 *     doesn't exist in this headless sweep.
 */
function isInfrastructureNoise(text) {
  return (
    (text.includes('WebSocket') && text.includes('403')) ||
    text.includes("No existing state found for follower with id: 'storybook/")
  );
}

async function runPlaywrightZeroErrorSweep(baseUrl) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 120_000 });

    const indexResponse = await fetch(`${baseUrl}/index.json`);
    if (!indexResponse.ok) {
      throw new Error(`Unable to load Storybook index.json: ${indexResponse.status} ${indexResponse.statusText}`);
    }

    const index = await indexResponse.json();
    const entries = Object.values(index.entries || {}).filter((entry) => entry.type === 'story');

    const failures = [];

    for (const entry of entries) {
      const issues = [];

      page.removeAllListeners('console');
      page.removeAllListeners('pageerror');
      page.removeAllListeners('requestfailed');

      page.on('console', (message) => {
        if (message.type() === 'error' && !isInfrastructureNoise(message.text())) {
          issues.push({ kind: 'console', text: message.text() });
        }
      });

      page.on('pageerror', (error) => {
        if (!isInfrastructureNoise(String(error))) {
          issues.push({ kind: 'pageerror', text: String(error) });
        }
      });

      page.on('requestfailed', (request) => {
        const failure = request.failure()?.errorText || '';
        if (!failure.includes('ERR_ABORTED')) {
          issues.push({ kind: 'requestfailed', text: `${request.url()} :: ${failure}` });
        }
      });

      const storyUrl = `${baseUrl}/?path=/story/${entry.id}`;
      await page.goto(storyUrl, { waitUntil: 'networkidle', timeout: 120_000 });
      await page.waitForTimeout(300);

      if (issues.length) {
        failures.push({ id: entry.id, title: entry.title, name: entry.name, issues });
      }
    }

    const summary = {
      storyCount: entries.length,
      failingStories: failures.length,
      failures
    };

    console.log(JSON.stringify(summary, null, 2));

    if (failures.length) {
      throw new Error(`Playwright sweep found ${failures.length} failing stor${failures.length === 1 ? 'y' : 'ies'}.`);
    }
  } finally {
    await browser.close();
  }
}

async function main() {
  const { command, args } = storybookStartCommand(PORT, HOST);

  const serverProcess = spawn(command, args, {
    stdio: 'pipe',
    shell: false,
    env: {
      ...process.env,
      STORYBOOK_DISABLE_TELEMETRY: '1'
    }
  });

  let stderrLog = '';

  serverProcess.stderr.on('data', (chunk) => {
    stderrLog += chunk.toString();
  });

  serverProcess.stdout.on('data', () => {
    // Avoid noisy Storybook logs while preserving background startup.
  });

  try {
    await waitForServer(BASE_URL, SERVER_START_TIMEOUT_MS);
    await runPlaywrightZeroErrorSweep(BASE_URL);
  } finally {
    stopServer(serverProcess);
  }

  if (serverProcess.exitCode && serverProcess.exitCode !== 0 && stderrLog.trim().length > 0) {
    throw new Error(stderrLog.trim());
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
