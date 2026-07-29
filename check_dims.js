const fs = require('fs');
const path = require('path');
const buf = fs.readFileSync(path.join(__dirname, 'imgs', 'jpeg_0_14245.jpg'));
let i = 2;
while (i < buf.length) {
  if (buf[i] !== 0xFF) { i++; continue; }
  const marker = buf[i + 1];
  if (marker === 0xD8 || marker === 0xD9) { i += 2; continue; }
  if (marker >= 0xC0 && marker <= 0xCF && marker !== 0xC4 && marker !== 0xC8 && marker !== 0xCC) {
    const height = buf.readUInt16BE(i + 5);
    const width = buf.readUInt16BE(i + 7);
    console.log('dimensions:', width, 'x', height);
    break;
  }
  const len = buf.readUInt16BE(i + 2);
  i += 2 + len;
}
