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

// Scroll-triggered reveal animations only fire once sections enter the
// viewport, so walk the page top to bottom before capturing.
await page.evaluate(async () => {
  const distance = window.innerHeight;
  const delay = 120;
  while (window.scrollY + window.innerHeight < document.body.scrollHeight) {
    window.scrollBy(0, distance);
    await new Promise((r) => setTimeout(r, delay));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 300));
});

const n = nextIndex();
const fileName = `screenshot-${n}${label ? `-${label}` : ''}.png`;
const outPath = path.join(outDir, fileName);
await page.screenshot({ path: outPath, fullPage: true });

await browser.close();
console.log(`Saved ${path.relative(root, outPath)}`);
