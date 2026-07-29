const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlPath = path.join(dir, 'portfolio.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const startMarker = '<div class="case-grid">\n';
const endMarker = '\n    </div>\n  </div>\n</section>\n\n<section id="education"';

const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf(endMarker);
if (startIdx === -1 || endIdx === -1) {
  console.log('Markers not found', startIdx, endIdx);
  process.exit(1);
}
const before = html.slice(0, startIdx + startMarker.length);
const inner = html.slice(startIdx + startMarker.length, endIdx);
const after = html.slice(endIdx);

const cardTag = '      <div class="case-card">';
const parts = inner.split(cardTag);
// parts[0] should be '' (nothing before first card)
const cards = parts.slice(1).map(p => cardTag + p);

console.log('Number of existing cards found:', cards.length);
cards.forEach((c, i) => {
  const m = c.match(/<h3>(.*?)<\/h3>/);
  console.log(i, '-', m ? m[1] : '(no h3 found)', '- length', c.length);
});

// Identify by title
const bank = cards.find(c => c.includes('From 50+ Ideas'));
const tva = cards.find(c => c.includes('Reusable Framework'));
const payments = cards.find(c => c.includes('Reengineering 25+ Workflows'));

if (!bank || !tva || !payments) {
  console.log('Could not identify all 3 existing cards. bank:', !!bank, 'tva:', !!tva, 'payments:', !!payments);
  process.exit(1);
}

function dataUri(file) {
  const buf = fs.readFileSync(path.join(dir, 'case-images', file));
  return `data:image/jpeg;base64,${buf.toString('base64')}`;
}

const manufacturingCard = `${cardTag}
        <div class="case-band"><span class="industry">Manufacturing</span><img src="__MANUFACTURING_IMG__" alt="Industrial robot arm in a manufacturing facility"></div>
        <div class="case-body">
          <h3>Cutting Process Wait Times 35% by Funding What Was Ready</h3>
          <div class="case-client">Client: Global manufacturer</div>
          <p>Advised a global manufacturer on AI use-case prioritisation across support functions, scoping opportunities by feasibility and data readiness rather than assumed impact.</p>
          <div class="result">Result: a <span class="fig">35% reduction</span> in process wait times, plus a prioritised path for the next phase.</div>
          <div class="pill-tags"><span class="pill">Feasibility scoring</span><span class="pill">Data readiness</span><span class="pill">Support-function AI</span></div>
        </div>
      </div>
`;

const valuationCard = `${cardTag}
        <div class="case-band"><span class="industry">Private Equity</span><img src="__VALUATION_IMG__" alt="Business handshake signifying a partnership"></div>
        <div class="case-body">
          <h3>Quantifying Agentic AI&rsquo;s Impact on a Domain-Registry Valuation</h3>
          <div class="case-client">Client: Private-equity investor</div>
          <p>Co-led commercial due diligence for a private-equity client, quantifying how agentic AI and evolving digital entry points would reshape the value of a domain-registry asset.</p>
          <div class="result">Result: <span class="fig">an evidence-based strategic view</span> that fed directly into the valuation and investment decision.</div>
          <div class="pill-tags"><span class="pill">Commercial due diligence</span><span class="pill">Agentic AI</span><span class="pill">Valuation impact</span></div>
        </div>
      </div>
`;

const maturityCard = `${cardTag}
        <div class="case-band"><span class="industry">Global Enterprises</span><img src="__BOARDROOM_IMG__" alt="Executive presenting to colleagues in a boardroom"></div>
        <div class="case-body">
          <h3>Grounding AI Strategy in Data Reality</h3>
          <div class="case-client">Client: Global enterprises</div>
          <p>Co-led AI maturity and data-readiness assessments for global enterprises, establishing current-state baselines and surfacing the capability gaps between ambition and reality.</p>
          <div class="result">Result: <span class="fig">AI strategies grounded in data reality</span>, with gaps identified before investment.</div>
          <div class="pill-tags"><span class="pill">AI maturity assessment</span><span class="pill">Data readiness</span><span class="pill">Capability baselining</span></div>
        </div>
      </div>
`;

const newOrder = [bank, manufacturingCard, payments, valuationCard, maturityCard, tva];
let newInner = newOrder.join('');
// ensure trailing formatting matches original (inner ended without extra content after last card's closing div, followed by 4-space indent before endMarker's own leading newline+spaces)
if (!newInner.endsWith('\n')) newInner += '\n';
newInner += '    ';

let newHtml = before + newInner + after;

// embed the 3 new images
const imgMap = {
  '__MANUFACTURING_IMG__': dataUri('manufacturing.jpg'),
  '__VALUATION_IMG__': dataUri('valuation.jpg'),
  '__BOARDROOM_IMG__': dataUri('boardroom.jpg'),
};
Object.entries(imgMap).forEach(([token, uri]) => {
  if (!newHtml.includes(token)) {
    console.log('TOKEN NOT FOUND:', token);
    return;
  }
  newHtml = newHtml.split(token).join(uri);
  console.log('Embedded', token);
});

fs.writeFileSync(htmlPath, newHtml, 'utf8');
console.log('Done. New file size:', fs.statSync(htmlPath).size);
