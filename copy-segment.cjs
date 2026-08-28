const fs = require('fs');
const path = require('path');
const srcDir = 'D:\\OneDrive\\桌面\\新官网图片\\Segment Bolts刀角螺栓';
const dstDir = 'D:\\龙虾\\QClaw\\workspace\\carelong-website\\public\\images\\products\\bolts-and-nuts\\segment-bolts';
const backupDir = 'D:\\龙虾\\QClaw\\workspace\\backups\\segment-bolts-images-20260805';

// Backup existing segment-bolts images
fs.mkdirSync(backupDir, { recursive: true });
for (const f of fs.readdirSync(dstDir)) {
  if (/^segment-bolt-\d+\.(jpg|png)$/i.test(f)) {
    fs.copyFileSync(path.join(dstDir, f), path.join(backupDir, f));
    fs.unlinkSync(path.join(dstDir, f));
    console.log('Backed up & removed:', f);
  }
}

// Copy new 3 images from OneDrive as segment-bolt-01/02/03
const sources = [
  { src: 'Plow bolts (1).jpg', dst: 'segment-bolt-01.jpg' },
  { src: 'Plow bolts (1).png', dst: 'segment-bolt-02.png' },
  { src: 'Plow bolts (2).png', dst: 'segment-bolt-03.png' },
];

// Clear old large gallery thumbnails
for (let i = 4; i <= 7; i++) {
  const candidates = ['jpg', 'png'];
  for (const ext of candidates) {
    const f = path.join(dstDir, `segment-bolt-0${i}.${ext}`);
    if (fs.existsSync(f)) {
      fs.copyFileSync(f, path.join(backupDir, `segment-bolt-0${i}.${ext}`));
      fs.unlinkSync(f);
      console.log('Backed up & removed old thumb:', `segment-bolt-0${i}.${ext}`);
    }
  }
}

// Copy new images
for (const { src, dst } of sources) {
  const srcPath = path.join(srcDir, src);
  const dstPath = path.join(dstDir, dst);
  if (!fs.existsSync(srcPath)) { console.log('MISSING:', src); continue; }
  fs.copyFileSync(srcPath, dstPath);
  const size = fs.statSync(dstPath).size;
  console.log(`Copied: ${src} → ${dst} (${(size/1024).toFixed(1)}KB)`);
}

// List final state
console.log('\nFinal segment-bolts dir:');
fs.readdirSync(dstDir).sort().forEach(f => {
  const s = fs.statSync(path.join(dstDir, f));
  console.log(`  ${f.padEnd(30)} ${(s.size/1024).toFixed(1)}KB`);
});