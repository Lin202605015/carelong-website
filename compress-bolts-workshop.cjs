const sharp = require('sharp');
const src = 'D:\\OneDrive\\桌面\\工厂图\\Bolts and Nuts Workshop\\Bolts and Nuts Workshop1.png';
const dst = 'D:\\龙虾\\QClaw\\workspace\\carelong-website\\public\\images\\factory\\factory-bolts-workshop.jpg';
sharp(src)
  .resize(1920, null, { withoutEnlargement: true })
  .jpeg({ quality: 80 })
  .toFile(dst, (err, info) => {
    if (err) { console.error(err); process.exit(1); }
    console.log('Done:', info.width + 'x' + info.height, Math.round(info.size/1024) + 'KB');
  });
