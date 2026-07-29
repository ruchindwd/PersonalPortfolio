const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = __dirname;
const htmlPath = path.join(dir, 'portfolio.html');
const caseImgDir = path.join(dir, 'case-images');
const beyondImgDir = "C:\\Users\\bruger\\OneDrive\\Documents\\Resume's\\Portfolio\\images\\beyond-work";

const jobs = [
  // case-study photos: resize to max width 800, quality 70
  { src: path.join(caseImgDir, 'finance.jpg'), alt: 'New York City financial district skyline', width: 800, quality: 70 },
  { src: path.join(caseImgDir, 'manufacturing.jpg'), alt: 'Industrial robot arm in a manufacturing facility', width: 800, quality: 70 },
  { src: path.join(caseImgDir, 'payments.jpg'), alt: 'Contactless card payment on a terminal', width: 800, quality: 70 },
  { src: path.join(caseImgDir, 'valuation.jpg'), alt: 'Business handshake signifying a partnership', width: 800, quality: 70 },
  { src: path.join(caseImgDir, 'boardroom.jpg'), alt: 'Executive presenting to colleagues in a boardroom', width: 800, quality: 70 },
  { src: path.join(caseImgDir, 'analytics.jpg'), alt: 'Laptop displaying a data analytics chart', width: 800, quality: 70 },
  // beyond-work collage photos: resize to max width 640, quality 66
  { src: path.join(beyondImgDir, 'trolltunga.jpg'), alt: 'On Trolltunga, Norway', width: 640, quality: 66 },
  { src: path.join(beyondImgDir, 'bartending.jpg'), alt: 'Setting up the bar for the night', width: 640, quality: 66 },
  { src: path.join(beyondImgDir, 'tennis.jpg'), alt: 'Playing lawn tennis', width: 640, quality: 66 },
  { src: path.join(beyondImgDir, 'travel-valley.jpg'), alt: 'Hiking a Norwegian valley', width: 640, quality: 66 },
  { src: path.join(beyondImgDir, 'bouldering.jpg'), alt: 'Bouldering at the climbing gym', width: 640, quality: 66 },
  { src: path.join(beyondImgDir, 'cooking.jpg'), alt: 'Frying fresh samosas at home', width: 640, quality: 66 },
  { src: path.join(beyondImgDir, 'fjord-geiranger.jpg'), alt: 'Overlooking Geirangerfjord', width: 640, quality: 66 },
  { src: path.join(beyondImgDir, 'travel-sauna.jpg'), alt: 'Lakeside barrel sauna in Norway', width: 640, quality: 66 },
];

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function run() {
  let html = fs.readFileSync(htmlPath, 'utf8');
  let totalBefore = 0;
  let totalAfter = 0;

  for (const job of jobs) {
    const origBuf = fs.readFileSync(job.src);
    totalBefore += origBuf.length;

    const outBuf = await sharp(origBuf)
      .rotate() // respect EXIF orientation, then strip metadata
      .resize({ width: job.width, withoutEnlargement: true })
      .jpeg({ quality: job.quality, mozjpeg: true })
      .toBuffer();

    totalAfter += outBuf.length;
    const newUri = `data:image/jpeg;base64,${outBuf.toString('base64')}`;

    const altEsc = escapeRegex(job.alt);
    const re = new RegExp('src="data:image\\/jpeg;base64,[^"]+" alt="' + altEsc + '"');
    if (!re.test(html)) {
      console.log('NOT FOUND in html for alt:', job.alt);
      continue;
    }
    html = html.replace(re, `src="${newUri}" alt="${job.alt}"`);
    console.log(job.alt.padEnd(50), origBuf.length, '->', outBuf.length, 'bytes');
  }

  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('---');
  console.log('Total source bytes:', totalBefore, '-> compressed bytes:', totalAfter);
  console.log('New portfolio.html size:', fs.statSync(htmlPath).size);
}

run().catch(e => { console.error(e); process.exit(1); });
