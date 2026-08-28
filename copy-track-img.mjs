import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const src = 'D:/OneDrive/桌面/新官网图片/Track Bolt履带板螺栓';
const dst = 'D:/龙虾/QClaw/workspace/carelong-website/public/images/products/bolts-and-nuts/track-bolts';

const map = [
  ['track-bolt-1.jpg', 'track-bolt-01.jpg'],
  ['track-bolt-2.jpg', 'track-bolt-02.jpg'],
  ['track-bolt-3.jpg', 'track-bolt-03.jpg'],
  ['track-bolt-4.png', 'track-bolt-04.jpg'],
  ['track-bolt-5.png', 'track-bolt-05.jpg'],
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

// remove stale old images not referenced
for (const old of ['track-bolt-06.jpg', 'track-bolt-07.jpg']) {
  const op = path.join(dst, old);
  if (fs.existsSync(op)) { fs.unlinkSync(op); console.log('removed', old); }
}
console.log('DONE');
