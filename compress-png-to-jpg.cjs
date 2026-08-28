const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const factoryDir = path.join(__dirname, 'public', 'images', 'factory');
const pngs = [
  'bolts-workshop-3.png',
  'cnc-workshop-1.png',
  'cnc-workshop-4.png',
  'cnc-workshop-6.png',
  'display-workshop-6.png'
];

(async () => {
  try {
    for (const png of pngs) {
      const pngPath = path.join(factoryDir, png);
      const jpgName = png.replace('.png', '.jpg');
      const jpgPath = path.join(factoryDir, jpgName);
      
      // 检查源文件是否存在
      if (!fs.existsSync(pngPath)) {
        console.log('Skip:', png, '(not found)');
        continue;
      }
      
      // 转换为 JPG
      await sharp(pngPath)
        .jpeg({ quality: 85, mozjpeg: true })
        .toFile(jpgPath);
      
      const stats = fs.statSync(jpgPath);
      console.log('Converted:', png, '->', jpgName, `(${(stats.size / 1024).toFixed(1)} KB)`);
    }
    console.log('\nDone! All PNG files converted to compressed JPG.');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();
