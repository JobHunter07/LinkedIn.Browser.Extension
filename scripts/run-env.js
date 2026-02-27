#!/usr/bin/env node
import { spawnSync } from 'child_process';

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node run-env.js VAR=val [VAR2=val2 ...] -- <command to run>');
  process.exit(1);
}

const sepIndex = args.indexOf('--');
if (sepIndex === -1) {
  console.error('Missing -- separator before command');
  process.exit(1);
}

const envPairs = args.slice(0, sepIndex);
const cmdParts = args.slice(sepIndex + 1);
if (cmdParts.length === 0) {
  console.error('No command provided to run');
  process.exit(1);
}

const isWin = process.platform === 'win32';
const envString = envPairs.join(' ');
const cmd = isWin ? `cross-env ${envString} ${cmdParts.join(' ')}` : `${envString} ${cmdParts.join(' ')}`;

const res = spawnSync(cmd, { stdio: 'inherit', shell: true });
process.exit(res.status ?? 0);
