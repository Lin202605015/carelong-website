const fs = require('fs');
const path = require('path');

const srcDir = 'D:\\龙虾\\QClaw\\workspace\\carelong-website\\src';
const publicDir = 'D:\\龙虾\\QClaw\\workspace\\carelong-website\\public';
const backupDir = 'D:\\龙虾\\QClaw\\workspace\\backups\\images-removed-20260804';

// Files converted PNG -> JPG (basename mapping)
const converted = [
  'hex-nuts-05', 'hex-nuts-04', 'wall-mounted-racks-04', '5',
  'flange-nuts-03', 'bpw-nuts-04', 'hex-nuts-03', 'flange-nuts-05',
  'bpw-nuts-02', 'flange-nuts-04', 'plastic-rubber-parts-01', 'nylon-nuts-05',
  'bpw-nuts-03', 'bpw-nuts-05', 'nylon-nuts-02', 'nylon-nuts-01',
  'nylon-nuts-03', 'bpw-nuts-01', 'nylon-nuts-04', 'production-record',
  'pegboard-slatwall-01', 'wall-mounted-racks-01', 'track-bolt-01',
  'track-bolt-02', 'machining-parts-01', 'wall-mounted-racks-02',
  'wall-mounted-racks-03', 'cold-heading-vs-machining',
];
const convertedSet = new Set(converted.map(b => b + '.png'));

let changedFiles = [];
let replaceCount = 0;

function processFile(file) {
  const ext = path.extname(file);
  if (!['.astro', '.ts', '.js', '.mjs', '.css', '.json', '.md'].includes(ext)) return;
  const fp = path.join(srcDir, file);
  let c = fs.readFileSync(fp, 'utf8');
  let changed = false;

  // Replace /images/.../<basename>.png -> .jpg where basename was converted
  c = c.replace(/(\/images\/[^"'`)\s]+\/)?([a-zA-Z0-9_-]+)\.png/g, (m, dir, base) => {
    if (convertedSet.has(base + '.png')) {
      replaceCount++;
      changed = true;
      return (dir || '') + base + '.jpg';
    }
    return m;
  });

  if (changed) {
    fs.writeFileSync(fp, c, 'utf8');
    changedFiles.push(file);
  }
}

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) walk(p);
    else if (/\.(astro|ts|js|mjs|css|json|md)$/.test(f)) {
      processFile(path.relative(srcDir, p));
    }
  }
}

walk(srcDir);

console.log('Changed files:', changedFiles.length);
changedFiles.forEach(f => console.log('  ', f));
console.log('Total replacements:', replaceCount);

// Move old PNGs (converted) to backup
console.log('\nMoving old PNGs to backup...');
let moved = 0;
for (const f of converted) {
  const pngPath = path.join(publicDir, 'images');
  // find the actual png file anywhere under public/images
  const found = [];
  (function find(dir) {
    for (const x of fs.readdirSync(dir)) {
      const p = path.join(dir, x);
      const s = fs.statSync(p);
      if (s.isDirectory()) find(p);
      else if (x.toLowerCase() === (f + '.png').toLowerCase()) found.push(p);
    }
  })(pngPath);
  for (const p of found) {
    const rel = path.relative(publicDir, p);
    const dest = path.join(backupDir, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.renameSync(p, dest);
    console.log('→', rel);
    moved++;
  }
}
console.log('Moved:', moved, 'PNG files');