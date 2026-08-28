import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function compressImage(imgPath) {
  const fullPath = path.join(__dirname, imgPath);
  const tempPath = fullPath + '.tmp';
  
  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP: ${imgPath} (not found)`);
    return false;
  }
  
  const stat = fs.statSync(fullPath);
  const sizeMB = (stat.size / 1024 / 1024).toFixed(2);
  
  if (stat.size < 100 * 1024) {
    console.log(`SKIP: ${imgPath} (${sizeMB}MB - already small)`);
    return false;
  }
  
  try {
    let pipeline = sharp(fullPath);
    const metadata = await pipeline.metadata();
    
    // Resize if too large
    if (metadata.width > 1920) {
      pipeline = pipeline.resize(1920, null, { fit: 'inside' });
    }
    
    // Compress
    const ext = path.extname(fullPath).toLowerCase();
    if (ext === '.png') {
      pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
    } else {
      pipeline = pipeline.jpeg({ quality: 75, mozjpeg: true });
    }
    
    const buffer = await pipeline.toBuffer();
    const newSizeMB = (buffer.length / 1024 / 1024).toFixed(2);
    const ratio = ((1 - buffer.length / stat.size) * 100).toFixed(1);
    
    if (buffer.length < stat.size) {
      // Write to temp file first
      fs.writeFileSync(tempPath, buffer);
      // Delete original and rename temp
      fs.unlinkSync(fullPath);
      fs.renameSync(tempPath, fullPath);
      console.log(`✅ ${imgPath} (${sizeMB}MB → ${newSizeMB}MB, -${ratio}%)`);
      return true;
    } else {
      console.log(`⏭ ${imgPath} (${sizeMB}MB - compression not effective)`);
      return false;
    }
  } catch (err) {
    console.log(`❌ ${imgPath} - ${err.message}`);
    // Clean up temp file if exists
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    return false;
  }
}

const images = [
  'public\\images\\capabilities\\capability-2.jpg',
  'public\\images\\news\\hot-forging-trends.jpg',
  'public\\images\\factory\\factory-workshop-6.jpg',
  'public\\images\\factory\\factory-interior-1.jpg',
  'public\\images\\about\\factory\\3.jpg',
];

console.log('Starting image compression (temp file method)...\n');
let successCount = 0;
let totalSaved = 0;

for (const img of images) {
  const result = await compressImage(img);
  if (result) {
    successCount++;
    const fullPath = path.join(__dirname, img);
    const oldSize = fs.statSync(fullPath).size; // This is the new size
    // We don't have the old size anymore, but that's okay
  }
}

console.log(`\nDone! Compressed ${successCount} images.`);
