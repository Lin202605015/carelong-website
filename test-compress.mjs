import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testCompress() {
  const imgPath = path.join(__dirname, 'public\\images\\capabilities\\capability-2.jpg');
  console.log('Testing compression on:', imgPath);
  console.log('File exists:', fs.existsSync(imgPath));
  console.log('File size:', (fs.statSync(imgPath).size / 1024 / 1024).toFixed(2), 'MB');
  
  try {
    // First, just try to open with sharp
    const img = sharp(imgPath);
    const metadata = await img.metadata();
    console.log('Image metadata:', metadata.width, 'x', metadata.height);
    
    // Resize if too large (max 1920px width)
    let pipeline = img;
    if (metadata.width > 1920) {
      pipeline = pipeline.resize(1920, null, { fit: 'inside' });
    }
    
    // Compress
    pipeline = pipeline.jpeg({ quality: 75, mozjpeg: true });
    
    const buffer = await pipeline.toBuffer();
    console.log('Compressed size:', (buffer.length / 1024 / 1024).toFixed(2), 'MB');
    
    // Save
    fs.writeFileSync(imgPath, buffer);
    console.log('Saved! New size:', (fs.statSync(imgPath).size / 1024 / 1024).toFixed(2), 'MB');
  } catch (err) {
    console.log('Error:', err.message);
    console.log('Stack:', err.stack);
  }
}

testCompress();
