const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlPath = path.join(dir, 'portfolio.html');
const logosDir = path.join(dir, 'logos');

function dataUri(file, mime) {
  const buf = fs.readFileSync(path.join(logosDir, file));
  return `data:${mime};base64,${buf.toString('base64')}`;
}

const everestUri = dataUri('everest.svg', 'image/svg+xml');
const cognizantUri = dataUri('cognizant.svg', 'image/svg+xml');
const techmUri = dataUri('techm.png', 'image/png');

let html = fs.readFileSync(htmlPath, 'utf8');

const replacements = [
  {
    old: '<div class="co-badge accent">EG</div>',
    logo: everestUri,
    alt: 'Everest Group',
  },
  {
    old: '<div class="co-badge navy">CTS</div>',
    logo: cognizantUri,
    alt: 'Cognizant',
  },
  {
    old: '<div class="co-badge brass">TM</div>',
    logo: techmUri,
    alt: 'Tech Mahindra',
  },
];

replacements.forEach(({ old, logo, alt }) => {
  if (!html.includes(old)) {
    console.log('NOT FOUND:', old);
    return;
  }
  const next = `<div class="co-badge"><img src="${logo}" alt="${alt} logo"></div>`;
  html = html.split(old).join(next);
  console.log('Replaced:', alt);
});

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Done. New file size:', fs.statSync(htmlPath).size);
