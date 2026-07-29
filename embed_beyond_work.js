const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'portfolio.html');
const imgDir = "C:\\Users\\bruger\\OneDrive\\Documents\\Resume's\\Portfolio\\images\\beyond-work";

function dataUri(file) {
  const buf = fs.readFileSync(path.join(imgDir, file));
  return `data:image/jpeg;base64,${buf.toString('base64')}`;
}

const map = {
  '__TROLLTUNGA__': dataUri('trolltunga.jpg'),
  '__BARTENDING__': dataUri('bartending.jpg'),
  '__TENNIS__': dataUri('tennis.jpg'),
  '__TRAVELVALLEY__': dataUri('travel-valley.jpg'),
  '__BOULDERING__': dataUri('bouldering.jpg'),
  '__COOKING__': dataUri('cooking.jpg'),
  '__FJORDGEIRANGER__': dataUri('fjord-geiranger.jpg'),
  '__TRAVELSAUNA__': dataUri('travel-sauna.jpg'),
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
