const sharp = require('sharp');

const src = 'D:\\龙虾\\QClaw\\workspace\\carelong-website\\public\\images\\products\\bolts-and-nuts\\nuts\\hex-nuts-05.png';
const outDir = 'C:\\temp-img-test\\';

(async () => {
  const fs = require('fs');
  fs.mkdirSync(outDir, { recursive: true });

  // Test 1: PNG lossless (compressionLevel 9)
  await sharp(src).png({ compressionLevel: 9 }).toFile(outDir + 'lossless.png');
  console.log('PNG lossless:', Math.round(fs.statSync(outDir + 'lossless.png').size / 1024), 'KB');

  // Test 2: PNG palette quality 90
  await sharp(src).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(outDir + 'palette90.png');
  console.log('PNG palette q90:', Math.round(fs.statSync(outDir + 'palette90.png').size / 1024), 'KB');

  // Test 3: PNG palette quality 80
  await sharp(src).png({ compressionLevel: 9, palette: true, quality: 80 }).toFile(outDir + 'palette80.png');
  console.log('PNG palette q80:', Math.round(fs.statSync(outDir + 'palette80.png').size / 1024), 'KB');

  // Test 4: JPG quality 85 (visual comparison)
  await sharp(src).jpeg({ quality: 85, mozjpeg: true }).toFile(outDir + 'q85.jpg');
  console.log('JPG q85:', Math.round(fs.statSync(outDir + 'q85.jpg').size / 1024), 'KB');

  // Test 5: JPG quality 80
  await sharp(src).jpeg({ quality: 80, mozjpeg: true }).toFile(outDir + 'q80.jpg');
  console.log('JPG q80:', Math.round(fs.statSync(outDir + 'q80.jpg').size / 1024), 'KB');

  // Original
  console.log('Original:', Math.round(fs.statSync(src).size / 1024), 'KB');
})();