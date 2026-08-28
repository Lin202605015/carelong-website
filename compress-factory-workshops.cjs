const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const srcDir = 'D:\\OneDrive\\桌面\\工厂图';
const dstDir = 'D:\\龙虾\\QClaw\\workspace\\carelong-website\\public\\images\\factory';

const files = [
  ['Bolts and Nuts Workshop.png', 'factory-bolts-workshop.jpg'],
  ['CNC Machining Workshop.png', 'factory-cnc-workshop.jpg'],
  ['Display Rack Workshop.png', 'factory-display-workshop.jpg'],
  ['Stamping Workshop.png', 'factory-stamping-workshop.jpg']
];

async function compress() {
  for (const [srcName, dstName] of files) {
    const src = path.join(srcDir, srcName);
    const dst = path.join(dstDir, dstName);
    try {
      const info = await sharp(src)
        .resize(1920, null, { withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(dst);
      console.log(`✓ ${srcName} → ${dstName}: ${info.width}x${info.height}, ${Math.round(info.size/1024)}KB`);
    } catch (err) {
      console.error(`✗ ${srcName}: ${err.message}`);
    }
  }
}

compress();
