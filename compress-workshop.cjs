const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const factoryDir = path.join(__dirname, 'public', 'images', 'factory');
const maxWidth = 1920;
const quality = 85;

const files = [
  'bolts-workshop-1.jpg',
  'bolts-workshop-2.jpg',
  'bolts-workshop-4.jpg',
  'bolts-workshop-5.jpg',
  'bolts-workshop-6.jpg',
  'cnc-workshop-2.jpg',
  'cnc-workshop-3.jpg',
  'cnc-workshop-5.jpg',
  'display-workshop-1.jpg',
  'display-workshop-2.jpg',
  'display-workshop-3.jpg',
  'display-workshop-4.jpg',
  'display-workshop-5.jpg',
];

(async () => {
  console.log(`Compressing to max width ${maxWidth}px, quality ${quality}...\n`);
  for (const file of files) {
    const filePath = path.join(factoryDir, file);
    if (!fs.existsSync(filePath)) {
      console.log(`SKIP: ${file} (not found)`);
      continue;
    }
    const beforeKB = Math.round(fs.statSync(filePath).size / 1024);
    try {
      await sharp(filePath)
        .resize(maxWidth, null, { withoutEnlargement: true })
        .jpeg({ quality, mozjpeg: true })
        .toFile(filePath + '.tmp');
      // Replace original
      fs.unlinkSync(filePath);
      fs.renameSync(filePath + '.tmp', filePath);
      const afterKB = Math.round(fs.statSync(filePath).size / 1024);
      const pct = Math.round((1 - afterKB / beforeKB) * 100);
      console.log(`✓ ${file.padEnd(30)} ${beforeKB} KB → ${afterKB} KB (saved ${pct}%)`);
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
    }
  }
  console.log('\nDone!');
})();
