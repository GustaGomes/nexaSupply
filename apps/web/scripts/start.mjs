import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';

const apiUrl = process.env['WEB_API_URL'] ?? 'http://localhost:8000';
const runtimeConfig = `window.__NEXASUPPLY_CONFIG__ = ${JSON.stringify({ apiUrl })};\n`;

await mkdir('public', { recursive: true });
await writeFile('public/runtime-config.js', runtimeConfig, 'utf8');

const angular = spawn(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['ng', 'serve', '--host', '0.0.0.0', '--poll', '1000'],
  { stdio: 'inherit' }
);

angular.on('exit', (code) => process.exit(code ?? 1));

