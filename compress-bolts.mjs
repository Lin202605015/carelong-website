import sharp from './node_modules/sharp/build/Release/sharp-win32-x64.node';
import path from 'path';
import fs from 'fs';
const __dirname = 'D:\\龙虾\\QClaw\\workspace\\carelong-website';
const srcDir = 'D:\\OneDrive\\桌面\\工厂图\\Bolts and Nuts Workshop';
const outDir = 'D:\\龙虾\\QClaw\\workspace\\carelong-website\\public\\images\\factory';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive:true});
const files = ['1.jpg','2.jpg','3.png','4.jpg','5.jpg','6.jpg'];
for (const f of files) {
  const i = files.indexOf(f);
  const inPath = path.join(srcDir, f);
  const ext = f.endsWith('.png') ? '.png' : '.jpg';
  const outPath = path.join(outDir, 'bolts-workshop-' + (i+1) + ext);
  try {
    await sharp(inPath).resize(1200, null, {withoutEnlargement:true})[ext === '.png' ? 'png' : 'jpeg']({quality:85}).toFile(outPath);
    console.log('OK: bolts-workshop-' + (i+1) + ext);
  } catch(e) {
    console.error('ERR ' + f + ': ' + e.message);
  }
}
console.log('ALL DONE');