import fs from 'fs';
import path from 'path';

const src = 'D:/OneDrive/桌面/新官网图片/轮毂螺栓hub bolts';
const dst = 'D:/龙虾/QClaw/workspace/carelong-website/public/images/products/bolts-and-nuts/hub-bolts';

const map = [
  ['hub-bolt 1.jpg', 'hub-bolt-01.jpg'],
  ['hub-bolt2.jpg', 'hub-bolt-02.jpg'],
  ['hub-bolt 3.jpg', 'hub-bolt-03.jpg'],
  ['hub-bolt 4.jpg', 'hub-bolt-04.jpg'],
  ['hub-bolt 5.jpg', 'hub-bolt-05.jpg'],
];
for (const [s, d] of map) {
  const sp = path.join(src, s);
  const dp = path.join(dst, d);
  fs.copyFileSync(sp, dp);
  console.log(d, fs.statSync(dp).size);
}
// parameter images for reading
fs.copyFileSync(path.join(src, '参数1.JPG'), 'D:/龙虾/QClaw/workspace/carelong-website/hub-param1.jpg');
fs.copyFileSync(path.join(src, '参数2.JPG'), 'D:/龙虾/QClaw/workspace/carelong-website/hub-param2.jpg');
console.log('params copied');
console.log('DONE');
