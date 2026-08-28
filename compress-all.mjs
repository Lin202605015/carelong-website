import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Auto-detect all images over 500KB
const imagesToCompress = [];
function walkDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fp = path.join(dir, item);
    const stat = fs.statSync(fp);
    if (stat.isDirectory()) {
      walkDir(fp);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(item) && stat.size > 500 * 1024) {
      imagesToCompress.push(fp);
    }
  }
}
walkDir(path.join(__dirname, 'public', 'images'));
console.log(`Found ${imagesToCompress.length} images over 500KB\n`);

async function compressImage(imgPath) {
  const tempPath = imgPath + '.tmp';
  const stat = fs.statSync(imgPath);
  const sizeMB = (stat.size / 1024 / 1024).toFixed(2);
  
  try {
    let pipeline = sharp(imgPath);
    const metadata = await pipeline.metadata();
    
    // Resize if too large
    if (metadata.width > 1920) {
      pipeline = pipeline.resize(1920, null, { fit: 'inside' });
    }
    
    // Compress
    const ext = path.extname(imgPath).toLowerCase();
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
      fs.unlinkSync(imgPath);
      fs.renameSync(tempPath, imgPath);
      console.log(`✅ ${path.relative(__dirname, imgPath)} (${sizeMB}MB → ${newSizeMB}MB, -${ratio}%)`);
      return { success: true, oldSize: stat.size, newSize: buffer.length };
    } else {
      console.log(`⏭ ${path.relative(__dirname, imgPath)} (${sizeMB}MB - compression not effective)`);
      return { success: false };
    }
  } catch (err) {
    console.log(`❌ ${path.relative(__dirname, imgPath)} - ${err.message}`);
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    return { success: false };
  }
}

console.log('Starting image compression...\n');
const results = [];
for (const img of imagesToCompress) {
  const result = await compressImage(img);
  results.push(result);
}

const successCount = results.filter(r => r.success).length;
const totalSaved = results.filter(r => r.success).reduce((sum, r) => sum + (r.oldSize - r.newSize), 0);
console.log(`\nDone! Compressed ${successCount} images, saved ${(totalSaved / 1024 / 1024).toFixed(2)}MB`);
