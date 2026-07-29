const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlPath = path.join(dir, 'portfolio.html');
const jpgPath = path.join(dir, 'imgs', 'jpeg_0_14245.jpg');

const jpgBuf = fs.readFileSync(jpgPath);
console.log('source jpg bytes:', jpgBuf.length, 'SOI/EOI ok:',
  jpgBuf[0] === 0xFF && jpgBuf[1] === 0xD8,
  jpgBuf[jpgBuf.length - 2] === 0xFF && jpgBuf[jpgBuf.length - 1] === 0xD9);

const b64 = jpgBuf.toString('base64');
const dataUri = `data:image/jpeg;base64,${b64}`;

let html = fs.readFileSync(htmlPath, 'utf8');
const re = /src="data:image\/jpeg;base64,[^"]*"/;
if (!re.test(html)) {
  console.log('No existing data URI found to replace');
  process.exit(1);
}
html = html.replace(re, `src="${dataUri}"`);
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Replaced. New html size:', fs.statSync(htmlPath).size);

// verify round-trip
const check = fs.readFileSync(htmlPath, 'utf8');
const m = check.match(/src="data:image\/jpeg;base64,([^"]+)"/);
const decoded = Buffer.from(m[1], 'base64');
console.log('verify decoded bytes:', decoded.length,
  'SOI/EOI ok:', decoded[0] === 0xFF && decoded[1] === 0xD8,
  decoded[decoded.length - 2] === 0xFF && decoded[decoded.length - 1] === 0xD9);
