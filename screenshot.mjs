import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(root, 'temporary screenshots');
fs.mkdirSync(outDir, { recursive: true });

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3];

function nextIndex() {
  const existing = fs.readdirSync(outDir)
    .map((f) => f.match(/^screenshot-(\d+)/))
    .filter(Boolean)
    .map((m) => parseInt(m[1], 10));
  return existing.length ? Math.max(...existing) + 1 : 1;
}

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle0' });

const n = nextIndex();
const fileName = `screenshot-${n}${label ? `-${label}` : ''}.png`;
const outPath = path.join(outDir, fileName);
await page.screenshot({ path: outPath, fullPage: true });

await browser.close();
console.log(`Saved ${path.relative(root, outPath)}`);
