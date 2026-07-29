const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'portfolio.html');
const lines = fs.readFileSync(htmlPath, 'utf8').split('\n');

// 1-indexed boundaries from grep, convert to 0-indexed
const rows = {
  everest: { start: 444, end: 465 },
  cognizant: { start: 466, end: 479 },
  techm: { start: 480, end: 497 },
};

function getBlock(name) {
  const { start, end } = rows[name];
  return lines.slice(start - 1, end).join('\n');
}

function splitRow(rowText) {
  const rowLines = rowText.split('\n');
  const openLine = rowLines[0]; // '      <div class="tl-row">' or '...right">'
  const closeLine = rowLines[rowLines.length - 1]; // '      </div>'
  const inner = rowLines.slice(1, -1);

  const dotLine = inner.find(l => l.trim() === '<div class="dot"></div>');
  const spacerLine = inner.find(l => l.trim() === '<div class="tl-spacer"></div>');
  if (!dotLine || !spacerLine) {
    throw new Error('Could not find dot/spacer line in row: ' + rowText.slice(0, 80));
  }
  const cardLines = inner.filter(l => l !== dotLine && l !== spacerLine);
  return { openLine, closeLine, dotLine, spacerLine, cardLines };
}

function toLeft(rowText) {
  const { closeLine, dotLine, spacerLine, cardLines } = splitRow(rowText);
  return ['      <div class="tl-row">', ...cardLines, dotLine, spacerLine, closeLine].join('\n');
}

function toRight(rowText) {
  const { closeLine, dotLine, spacerLine, cardLines } = splitRow(rowText);
  return ['      <div class="tl-row right">', spacerLine, dotLine, ...cardLines, closeLine].join('\n');
}

const everestBlock = getBlock('everest');
const cognizantBlock = getBlock('cognizant');
const techmBlock = getBlock('techm');

const newEverest = toRight(everestBlock);
const newCognizant = toLeft(cognizantBlock);
const newTechm = toRight(techmBlock);

const freelanceBlock = `      <div class="tl-row">
        <div class="tl-card">
          <div class="tl-head">
            <div class="co-badge"><svg class="icon" viewBox="0 0 24 24" style="color:var(--accent-strong);width:22px;height:22px;"><path d="M9 8l-4 4 4 4"/><path d="M15 8l4 4-4 4"/></svg></div>
            <div>
              <h3>Freelance AI &amp; Automation Consultant</h3>
              <div class="meta">Independent <span class="dates">&middot; May 2026 &ndash; Present</span></div>
            </div>
          </div>
          <p>Since leaving Everest Group, I&rsquo;ve taken on independent AI and automation engagements alongside strategy advisory work. For a pharmaceutical SME client, I designed and built RxField end-to-end as sole developer &mdash; a production field-force management app (React Native, TypeScript, Supabase) replacing manual and spreadsheet-based tracking for a sales team and its full reporting chain. It automates visit logging, tour planning with deviation tracking, order capture and verification, auto-drafted expense claims, and coverage tracking across a 3-tier manager hierarchy, with every data boundary enforced at the database layer via Postgres row-level security rather than client-side checks.</p>
          <div class="award-badge">
            <svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
            In Closed Testing &mdash; Pre-Launch on Google Play
          </div>
        </div>
        <div class="dot"></div>
        <div class="tl-spacer"></div>
      </div>`;

const before = lines.slice(0, rows.everest.start - 1).join('\n');
const after = lines.slice(rows.techm.end).join('\n');

const newHtml = before + '\n' + freelanceBlock + '\n' + newEverest + '\n' + newCognizant + '\n' + newTechm + '\n' + after;

fs.writeFileSync(htmlPath, newHtml, 'utf8');
console.log('Done. New file size:', fs.statSync(htmlPath).size);
