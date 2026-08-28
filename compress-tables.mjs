import sharp from 'sharp';
import fs from 'fs';

const srcDir = 'D:/龙虾/QClaw/workspace/carelong-website';
const dstDir = 'D:/龙虾/QClaw/workspace/carelong-website/public/images/products/display-rack';

// Ensure destination dir exists
if (!fs.existsSync(dstDir)) {
  fs.mkdirSync(dstDir, { recursive: true });
}

// Clean up old SVG placeholders for newspaper-racks
for (let i = 1; i <= 4; i++) {
  const oldFile = `${dstDir}/newspaper-racks-0${i}.svg`;
  if (fs.existsSync(oldFile)) {
    fs.unlinkSync(oldFile);
    console.log(`Removed old: newspaper-racks-0${i}.svg`);
  }
}

const items = [
  { num: 1, src: `${srcDir}/tbl-1-original.png` },
  { num: 2, src: `${srcDir}/tbl-2-original.png` },
  { num: 3, src: `${srcDir}/tbl-3-original.png` },
  { num: 4, src: `${srcDir}/tbl-4-original.png` },
  { num: 5, src: `${srcDir}/tbl-5-original.png` }
];

for (const item of items) {
  const out = `${dstDir}/newspaper-racks-0${item.num}.jpg`;
  const srcSize = fs.statSync(item.src).size;
  const result = await sharp(item.src)
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(out);
  const dstSize = fs.statSync(out).size;
  const reduction = ((1 - dstSize/srcSize) * 100).toFixed(0);
  console.log(`newspaper-racks-0${item.num}.jpg: ${(srcSize/1024).toFixed(0)}KB → ${(dstSize/1024).toFixed(0)}KB (${reduction}% reduction)`);
}

// Cleanup originals
for (let i = 1; i <= 5; i++) {
  const orig = `${srcDir}/tbl-${i}-original.png`;
  if (fs.existsSync(orig)) {
    fs.unlinkSync(orig);
    console.log(`Cleaned up: tbl-${i}-original.png`);
  }
}