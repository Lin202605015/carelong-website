const fs = require('fs');
const path = require('path');
const srcDir = 'D:\\OneDrive\\桌面\\新官网图片\\Segment Bolts刀角螺栓';
const dstDir = 'D:\\龙虾\\QClaw\\workspace\\carelong-website\\public\\images\\products\\bolts-and-nuts\\segment-bolts';
const backupDir = 'D:\\龙虾\\QClaw\\workspace\\backups\\segment-bolts-images-20260805';

// Clear existing segment-bolts dir, restore to backup
for (const f of fs.readdirSync(dstDir)) {
  fs.unlinkSync(path.join(dstDir, f));
}
for (const f of fs.readdirSync(backupDir)) {
  fs.copyFileSync(path.join(backupDir, f), path.join(dstDir, f));
}
console.log('Restored backup images to dir.');

// Copy all 5 source images
const sources = [
  { src: 'Plow bolts (1).jpg', dst: 'segment-bolt-01.jpg' },
  { src: 'Plow bolts (1).png', dst: 'segment-bolt-02.png' },
  { src: 'Plow bolts (2).png', dst: 'segment-bolt-03.png' },
  { src: 'segment-bolt-03.jpg', dst: 'segment-bolt-04.jpg' },
  { src: 'segment-bolt-04.jpg', dst: 'segment-bolt-05.jpg' },
];
for (const { src, dst } of sources) {
  const sp = path.join(srcDir, src);
  const dp = path.join(dstDir, dst);
  if (!fs.existsSync(sp)) { console.log('MISSING:', src); continue; }
  fs.copyFileSync(sp, dp);
  console.log(`✓ ${src} → ${dst} (${(fs.statSync(dp).size/1024).toFixed(1)}KB)`);
}

console.log('\nFinal dir contents:');
fs.readdirSync(dstDir).sort().forEach(f => {
  const s = fs.statSync(path.join(dstDir, f));
  console.log(`  ${f.padEnd(30)} ${(s.size/1024).toFixed(1)}KB`);
});