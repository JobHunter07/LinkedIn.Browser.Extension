#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const distManifestPath = path.resolve(process.cwd(), 'dist', 'manifest.json');

function stripUseDynamic(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(stripUseDynamic);
    return;
  }
  if (obj && typeof obj === 'object') {
    if ('use_dynamic_url' in obj) {
      delete obj.use_dynamic_url;
    }
    Object.values(obj).forEach(stripUseDynamic);
  }
}

try {
  if (!fs.existsSync(distManifestPath)) {
    console.warn(`No manifest at ${distManifestPath}, skipping strip step.`);
    process.exit(0);
  }
  const raw = fs.readFileSync(distManifestPath, 'utf8');
  const manifest = JSON.parse(raw);
  stripUseDynamic(manifest);
  fs.writeFileSync(distManifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log('Stripped use_dynamic_url from dist/manifest.json');
} catch (err) {
  console.error('Failed to strip use_dynamic_url:', err);
  process.exit(1);
}
