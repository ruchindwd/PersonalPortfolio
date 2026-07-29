const fs = require('fs');
const path = process.argv[2];
const outDir = process.argv[3];
const buf = fs.readFileSync(path);

const SOI = Buffer.from([0xFF, 0xD8, 0xFF]);
const EOI = Buffer.from([0xFF, 0xD9]);

let idx = 0;
let count = 0;
const results = [];

while (true) {
  const start = buf.indexOf(SOI, idx);
  if (start === -1) break;
  const end = buf.indexOf(EOI, start + 3);
  if (end === -1) break;
  const jpegBuf = buf.slice(start, end + 2);
  results.push({ start, size: jpegBuf.length, buf: jpegBuf });
  idx = end + 2;
  count++;
}

results.sort((a, b) => b.size - a.size);
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
results.slice(0, 5).forEach((r, i) => {
  const outPath = `${outDir}/jpeg_${i}_${r.size}.jpg`;
  fs.writeFileSync(outPath, r.buf);
  console.log(outPath, r.size, 'bytes');
});
console.log('Total JPEG streams found:', results.length);
