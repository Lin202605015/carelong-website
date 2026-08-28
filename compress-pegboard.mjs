import sharp from 'sharp';
import fs from 'fs';

const dir = 'D:/龙虾/QClaw/workspace/carelong-website/public/images/products/display-rack';
const files = ['pegboard-slatwall-01.png', 'pegboard-slatwall-02.png', 'pegboard-slatwall-03.png', 'pegboard-slatwall-04.png', 'pegboard-slatwall-05.png'];

(async () => {
  for (const f of files) {
    const src = `${dir}/${f}`;
    const origSize = fs.statSync(src).size;
    await sharp(src)
      .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
      .png({ quality: 85, compressionLevel: 9 })
      .toFile(src.replace('.png', '-tmp.png'));
    const newSize = fs.statSync(src.replace('.png', '-tmp.png')).size;
    fs.renameSync(src.replace('.png', '-tmp.png'), src);
    console.log(`${f}: ${(origSize/1024).toFixed(0)}KB -> ${(newSize/1024).toFixed(0)}KB (${((1-newSize/origSize)*100).toFixed(0)}% smaller)`);
  }
})();
