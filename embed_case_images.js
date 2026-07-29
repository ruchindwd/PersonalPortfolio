const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlPath = path.join(dir, 'portfolio.html');
const imgDir = path.join(dir, 'case-images');

function dataUri(file) {
  const buf = fs.readFileSync(path.join(imgDir, file));
  return `data:image/jpeg;base64,${buf.toString('base64')}`;
}

const map = {
  '__FINANCE_IMG__': dataUri('finance.jpg'),
  '__ANALYTICS_IMG__': dataUri('analytics.jpg'),
  '__PAYMENTS_IMG__': dataUri('payments.jpg'),
};

let html = fs.readFileSync(htmlPath, 'utf8');

Object.entries(map).forEach(([token, uri]) => {
  if (!html.includes(token)) {
    console.log('NOT FOUND:', token);
    return;
  }
  html = html.split(token).join(uri);
  console.log('Replaced:', token, '(', uri.length, 'chars )');
});

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Done. New file size:', fs.statSync(htmlPath).size);
