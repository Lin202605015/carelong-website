import fs from 'fs';

const srcDir = 'D:/龙虾/QClaw/workspace/carelong-website/public/images/products/display-rack';
for (let i = 1; i <= 5; i++) {
  const num = String(i).padStart(2, '0');
  const src = `${srcDir}/pegboard-slatwall-${num}.png`;
  const dst = `${srcDir}/wall-mounted-racks-${num}.png`;
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    const size = fs.statSync(dst).size;
    console.log(`wall-mounted-racks-${num}.png: ${(size/1024).toFixed(0)}KB`);
  } else {
    console.log(`NOT FOUND: ${src}`);
  }
}