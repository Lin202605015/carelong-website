const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToCompress = [
  'public\\images\\capabilities\\capability-2.jpg',
  'public\\images\\news\\hot-forging-trends.jpg',
  'public\\images\\about\\factory\\5.png',
  'public\\images\\factory\\factory-workshop-6.jpg',
  'public\\images\\factory\\factory-interior-1.jpg',
  'public\\images\\factory\\factory-workshop-5.jpg',
  'public\\images\\about\\factory\\3.jpg',
  'public\\images\\factory\\factory-workshop-1.jpg',
  'public\\images\\factory\\factory-workshop-4.jpg',
  'public\\images\\factory\\factory-workshop-3.jpg',
  'public\\images\\factory\\factory-workshop-2.jpg',
  'public\\images\\news\\cold-heading.jpg',
  'public\\images\\capabilities\\capability-1.jpg',
  'public\\images\\factory\\factory-equipment-1.jpg',
  'public\\images\\news\\hot-forging-press.jpg',
  'public\\images\\factory\\factory-interior-2.jpg',
  'public\\images\\factory\\factory-equipment-2.jpg',
  'public\\images\\factory\\factory-equipment-4.jpg',
  'public\\images\\products\\bolts-and-nuts\\nuts\\hex-nuts-05.png',
  'public\\images\\about\\factory\\2.jpg'
];

async function compressImage(imgPath) {
  const fullPath = path.join(__dirname, imgPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP: ${imgPath} (not found)`);
    return;
  }
  
  const stat = fs.statSync(fullPath);
  const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
  
  if (stat.size < 500 * 1024) {
    console.log(`SKIP: ${imgPath} (${sizeMB}MB - already small)`);
    return;
  }
  
  const ext = path.extname(fullPath).toLowerCase();
  const isPNG = ext === '.png';
  
  try {
    let pipeline = sharp(fullPath);
    
    if (isPNG) {
      pipeline = pipeline.png({ quality: 80, compressionLevel: 8 });
    } else {
      pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
    }
    
    const buffer = await pipeline.toBuffer();
    const newSizeMB = (buffer.length / (1024 * 1024)).toFixed(2);
    
    if (buffer.length < stat.size) {
      fs.writeFileSync(fullPath, buffer);
      console.log(`OK: ${imgPath} (${sizeMB}MB → ${newSizeMB}MB)`);
    } else {
      console.log(`SKIP: ${imgPath} (${sizeMB}MB - compression not effective)`);
    }
  } catch (err) {
    console.log(`ERROR: ${imgPath} - ${err.message}`);
  }
}

(async () => {
  console.log('Starting image compression...');
  for (const img of imagesToCompress) {
    await compressImage(img);
  }
  console.log('Done!');
})();
