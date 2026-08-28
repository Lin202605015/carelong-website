const fs = require('fs');
const path = require('path');

const srcDir = 'D:\\龙虾\\QClaw\\workspace\\carelong-website\\src';
const publicDir = 'D:\\龙虾\\QClaw\\workspace\\carelong-website\\public';

// 1. Collect all image references in src/
const refs = new Set();
function scanSrc(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) scanSrc(p);
    else if (/\.(astro|ts|js|mjs|css|json)$/.test(f)) {
      const c = fs.readFileSync(p, 'utf8');
      // match /images/... paths
      const re = /["'`(](\/images\/[^"'`)\s?#]+)/g;
      let m;
      while ((m = re.exec(c)) !== null) refs.add(m[1]);
    }
  }
}
scanSrc(srcDir);

// Also scan public for .html (usually none)
console.log('Total unique image refs:', refs.size);

// 2. Check which referenced files exist in public/
const missing = [];
const existingRefs = [];
for (const r of refs) {
  const fp = path.join(publicDir, r.replace(/^\//, '').replace(/\//g, path.sep));
  if (fs.existsSync(fp)) existingRefs.push(r);
  else missing.push(r);
}
console.log('Existing refs:', existingRefs.length, '| Missing:', missing.length);
if (missing.length) console.log('MISSING:', missing.join('\n'));

// 3. List existing referenced images with sizes, sorted by size desc
const sized = [];
for (const r of existingRefs) {
  const fp = path.join(publicDir, r.replace(/^\//, '').replace(/\//g, path.sep));
  const s = fs.statSync(fp);
  sized.push({ ref: r, size: s.size });
}
sized.sort((a, b) => b.size - a.size);

console.log('\n=== Referenced images sorted by size (top 60) ===');
sized.slice(0, 60).forEach((x, i) => {
  console.log((i + 1).toString().padStart(3) + '. ' + x.ref.padEnd(65) + (x.size / 1024).toFixed(1).padStart(8) + ' KB');
});

// 4. Total size of referenced images
const total = sized.reduce((a, b) => a + b.size, 0);
console.log('\nTotal referenced image size:', (total / 1024 / 1024).toFixed(2), 'MB');

// 5. Find big unreferenced files in public/images (candidates for cleanup)
console.log('\n=== Unreferenced files > 300KB (candidates for cleanup) ===');
function scanPublic(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) scanPublic(p);
    else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(f) && s.size > 300 * 1024) {
      const rel = '/' + path.relative(publicDir, p).replace(/\\/g, '/');
      if (!refs.has(rel)) {
        console.log(rel.padEnd(65) + (s.size / 1024).toFixed(1).padStart(8) + ' KB');
      }
    }
  }
}
scanPublic(path.join(publicDir, 'images'));