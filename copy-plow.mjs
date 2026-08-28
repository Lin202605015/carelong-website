import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const src = 'D:/OneDrive/桌面/新官网图片/Plow Bolts犁形螺栓';
const dst = 'D:/龙虾/QClaw/workspace/carelong-website/public/images/products/bolts-and-nuts/plow-bolts';

// copy docx
fs.copyFileSync(path.join(src, 'Plow Bolt & Nut.docx'), 'D:/龙虾/QClaw/workspace/carelong-website/plow-bolts-src.docx');
console.log('docx copied');

// copy images -> plow-bolt-01..05.jpg (PNG->JPG)
const map = [
  ['Plow Bolts1.jpg', 'plow-bolt-01.jpg'],
  ['Plow Bolts2.jpg', 'plow-bolt-02.jpg'],
  ['Plow Bolts3.jpg', 'plow-bolt-03.jpg'],
  ['Plow Bolts5.jpg', 'plow-bolt-04.jpg'],
  ['Plow Bolts14.jpg', 'plow-bolt-05.jpg'],
];
for (const [s, d] of map) {
  const sp = path.join(src, s);
  const dp = path.join(dst, d);
  if (s.endsWith('.png')) {
    await sharp(sp).jpeg({ quality: 85 }).toFile(dp);
  } else {
    fs.copyFileSync(sp, dp);
  }
  console.log(d, fs.statSync(dp).size);
}
console.log('DONE');
