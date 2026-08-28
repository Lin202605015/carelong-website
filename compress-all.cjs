const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = 'D:\\龙虾\\QClaw\\workspace\\carelong-website\\public';
const backupDir = 'D:\\龙虾\\QClaw\\workspace\\backups\\images-removed-20260804';
const log = [];
const errors = [];

// ==== 1. Convert OPAQUE PNGs > 150KB to JPG (visual-identical) ====
// (pre-scanned: all these are OPAQUE except stamping-parts-01.png)
const pngToJpg = [
  '/images/products/bolts-and-nuts/nuts/hex-nuts-05.png',
  '/images/products/bolts-and-nuts/nuts/hex-nuts-04.png',
  '/images/products/display-rack/wall-mounted-racks-04.png',
  '/images/about/factory/5.png',
  '/images/products/bolts-and-nuts/nuts/flange-nuts-03.png',
  '/images/products/bolts-and-nuts/nuts/bpw-nuts-04.png',
  '/images/products/bolts-and-nuts/nuts/hex-nuts-03.png',
  '/images/products/bolts-and-nuts/nuts/flange-nuts-05.png',
  '/images/products/bolts-and-nuts/nuts/bpw-nuts-02.png',
  '/images/products/bolts-and-nuts/nuts/flange-nuts-04.png',
  '/images/products/plastic-rubber-parts/plastic-rubber-parts-01.png',
  '/images/products/bolts-and-nuts/nuts/nylon-nuts-05.png',
  '/images/products/bolts-and-nuts/nuts/bpw-nuts-03.png',
  '/images/products/bolts-and-nuts/nuts/bpw-nuts-05.png',
  '/images/products/bolts-and-nuts/nuts/nylon-nuts-02.png',
  '/images/products/bolts-and-nuts/nuts/nylon-nuts-01.png',
  '/images/products/bolts-and-nuts/nuts/nylon-nuts-03.png',
  '/images/products/bolts-and-nuts/nuts/bpw-nuts-01.png',
  '/images/products/bolts-and-nuts/nuts/nylon-nuts-04.png',
  '/images/news/production-record.png',
  '/images/products/display-rack/pegboard-slatwall-01.png',
  '/images/products/display-rack/wall-mounted-racks-01.png',
  '/images/products/bolts-and-nuts/track-bolts/track-bolt-01.png',
  '/images/products/bolts-and-nuts/track-bolts/track-bolt-02.png',
  '/images/products/machining-parts/machining-parts-01.png',
  '/images/products/display-rack/wall-mounted-racks-02.png',
  '/images/products/display-rack/wall-mounted-racks-03.png',
  '/images/news/cold-heading-vs-machining.png',
];

// ==== 2. Compress referenced JPGs > 300KB ====
// (scan result: list of referenced jpgs > 300KB)
const jpgToCompress = [
  '/images/capabilities/capability-stamping.jpg',
  '/images/factory/bolts-workshop-1.jpg',
  '/images/factory/cnc-workshop-5.jpg',
  '/images/factory/bolts-workshop-6.jpg',
  '/images/factory/bolts-workshop-4.jpg',
  '/images/capabilities/capability-2.jpg',
  '/images/factory/bolts-workshop-5.jpg',
  '/images/factory/bolts-workshop-2.jpg',
  '/images/products/display-rack/newspaper-racks-05.jpg',
  '/images/capabilities/capability-4.jpg',
  '/images/factory/stamping-workshop-1.jpg',
  '/images/factory/stamping-workshop-3.jpg',
  '/images/factory/stamping-workshop-5.jpg',
  '/images/factory/stamping-workshop-4.jpg',
  '/images/news/featured.jpg',
  '/images/factory/display-workshop-5.jpg',
  '/images/capabilities/capability-1.jpg',
  '/images/factory/stamping-workshop-2.jpg',
  '/images/factory/stamping-workshop-6.jpg',
  '/images/about/factory/3.jpg',
  '/images/factory/display-workshop-4.jpg',
  '/images/news/hot-forging-press.jpg',
  '/images/factory/display-workshop-2.jpg',
  '/images/factory/display-workshop-1.jpg',
  '/images/factory/display-workshop-6.jpg',
  '/images/about/factory/2.jpg',
  '/images/factory/display-workshop-3.jpg',
];

// ==== 3. ALPHA PNG: lossy-optimize keeping PNG format ====
const pngOptimize = [
  '/images/products/stamping-parts/stamping-parts-01.png',
];

const abs = (p) => path.join(publicDir, p.replace(/^\//, '').replace(/\//g, path.sep));

(async () => {
  fs.mkdirSync(backupDir, { recursive: true });

  // Step A: PNG -> JPG
  console.log('=== PNG → JPG ===');
  for (const p of pngToJpg) {
    const fp = abs(p);
    if (!fs.existsSync(fp)) { console.log('SKIP (missing):', p); continue; }
    const jpgPath = fp.replace(/\.png$/i, '.jpg');
    const before = fs.statSync(fp).size;
    try {
      await sharp(fp).jpeg({ quality: 85, mozjpeg: true }).toFile(jpgPath);
      const after = fs.statSync(jpgPath).size;
      const pct = Math.round((1 - after / before) * 100);
      console.log(`✓ ${p}  ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB (${pct}%)`);
      log.push(`${p} → .jpg (${pct}%)`);
    } catch (e) {
      errors.push(`${p}: ${e.message}`);
      console.log('✗', p, e.message);
    }
  }

  // Step B: JPG re-compress (in place via temp)
  console.log('\n=== JPG compress ===');
  for (const p of jpgToCompress) {
    const fp = abs(p);
    if (!fs.existsSync(fp)) { console.log('SKIP (missing):', p); continue; }
    const before = fs.statSync(fp).size;
    try {
      const tmp = fp + '.tmp';
      await sharp(fp)
        .resize(1920, null, { withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(tmp);
      const after = fs.statSync(tmp).size;
      if (after < before) {
        fs.unlinkSync(fp);
        fs.renameSync(tmp, fp);
        const pct = Math.round((1 - after / before) * 100);
        console.log(`✓ ${p}  ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB (${pct}%)`);
        log.push(`${p} recompressed (${pct}%)`);
      } else {
        fs.unlinkSync(tmp);
        console.log(`- ${p} already small, skip (${(before/1024).toFixed(0)}KB)`);
      }
    } catch (e) {
      errors.push(`${p}: ${e.message}`);
      console.log('✗', p, e.message);
    }
  }

  // Step C: ALPHA PNG optimize
  console.log('\n=== PNG optimize (alpha) ===');
  for (const p of pngOptimize) {
    const fp = abs(p);
    if (!fs.existsSync(fp)) { console.log('SKIP (missing):', p); continue; }
    const before = fs.statSync(fp).size;
    try {
      const tmp = fp + '.tmp';
      await sharp(fp).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(tmp);
      const after = fs.statSync(tmp).size;
      if (after < before) {
        fs.unlinkSync(fp);
        fs.renameSync(tmp, fp);
        const pct = Math.round((1 - after / before) * 100);
        console.log(`✓ ${p}  ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB (${pct}%)`);
        log.push(`${p} optimized (${pct}%)`);
      } else {
        fs.unlinkSync(tmp);
        console.log(`- ${p} no gain (${(before/1024).toFixed(0)}KB)`);
      }
    } catch (e) {
      errors.push(`${p}: ${e.message}`);
      console.log('✗', p, e.message);
    }
  }

  // Step D: Move unreferenced big files to backup
  console.log('\n=== Move unreferenced files to backup ===');
  const unreferenced = [
    '/images/factory/1.jpg', '/images/factory/2.jpg', '/images/factory/3.png',
    '/images/factory/4.jpg', '/images/factory/5.jpg', '/images/factory/6.jpg',
    '/images/factory/bolts-workshop-3.png',
    '/images/factory/cnc-workshop-1.png', '/images/factory/cnc-workshop-4.png',
    '/images/factory/cnc-workshop-6.png', '/images/factory/display-workshop-6.png',
    '/images/factory-temp/bolts-workshop-1.jpg', '/images/factory-temp/bolts-workshop-2.jpg',
    '/images/factory-temp/bolts-workshop-3.png', '/images/factory-temp/bolts-workshop-4.jpg',
    '/images/factory-temp/bolts-workshop-5.jpg', '/images/factory-temp/bolts-workshop-6.jpg',
    '/images/products/display-rack/pegboard-slatwall-02.png',
    '/images/products/display-rack/pegboard-slatwall-04.png',
  ];
  for (const p of unreferenced) {
    const fp = abs(p);
    if (!fs.existsSync(fp)) { console.log('SKIP (missing):', p); continue; }
    const dest = path.join(backupDir, p.replace(/^\//, ''));
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.renameSync(fp, dest);
    console.log(`→ moved ${p} (${(fs.statSync(dest).size/1024).toFixed(0)}KB)`);
    log.push(`moved to backup: ${p}`);
  }

  // Step E: remove now-empty factory-temp dir
  const tempDir = path.join(publicDir, 'images', 'factory-temp');
  if (fs.existsSync(tempDir) && fs.readdirSync(tempDir).length === 0) {
    fs.rmdirSync(tempDir);
    console.log('Removed empty factory-temp dir');
  }

  console.log('\n=== SUMMARY ===');
  console.log('Processed:', log.length, 'files');
  if (errors.length) {
    console.log('ERRORS:');
    errors.forEach(e => console.log('  ✗', e));
  }
  fs.writeFileSync(path.join(backupDir, 'compress-log-20260804.txt'), log.join('\n') + (errors.length ? '\n\nERRORS:\n' + errors.join('\n') : ''), 'utf8');
  console.log('Log saved to', path.join(backupDir, 'compress-log-20260804.txt'));
})();
