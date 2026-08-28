import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesToCompress = [
  'public\\images\\capabilities\\capability-2.jpg',
  'public\\images\\news\\hot-forging-trends.jpg',
  'public\\images\\factory\\factory-workshop-6.jpg',
  'public\\images\\factory\\factory-interior-1.jpg',
  'public\\images\\factory\\factory-workshop-5.jpg',
  'public\\images\\about\\factory\\3.jpg',
  'public\\images\\factory\\factory-workshop-1.jpg',
  'public\\images\\factory\\factory-workshop-4.jpg',
  'public\\images\\factory\\factory-workshop-3.jpg',
  'public\\images\\factory\\factory-workshop-2.jpg',
  'public\\images\\capabilities\\capability-1.jpg',
  'public\\images\\news\\cold-heading.jpg',
  'public\\images\\factory\\factory-equipment-1.jpg',
  'public\\images\\news\\hot-forging-press.jpg',
  'public\\images\\factory\\factory-interior-2.jpg',
  'public\\images\\factory\\factory-equipment-2.jpg',
  'public\\images\\factory\\factory-equipment-4.jpg',
  'public\\images\\about\\factory\\5.png',
  'public\\images\\about\\factory\\2.jpg',
  'public\\images\\factory\\factory-equipment-3.jpg',
  'public\\images\\about\\factory\\4.jpg',
  'public\\images\\products\\plastic-rubber-parts\\plastic-rubber-parts-01.png',
  'public\\images\\products\\bolts-and-nuts\\nuts\\flange-nuts-03.png',
  'public\\images\\products\\bolts-and-nuts\\nuts\\flange-nuts-05.png',
  'public\\images\\products\\bolts-and-nuts\\nuts\\hex-nuts-04.png',
  'public\\images\\news\\hub-bolt-failure.jpg',
  'public\\images\\products\\bolts-and-nuts\\nuts\\bpw-nuts-04.png',
  'public\\images\\products\\bolts-and-nuts\\nuts\\bpw-nuts-02.png',
  'public\\images\\products\\machining-parts\\machining-parts-01.png',
  'public\\images\\products\\bolts-and-nuts\\nuts\\bpw-nuts-05.png',
  'public\\images\\products\\bolts-and-nuts\\nuts\\bpw-nuts-01.png',
  'public\\images\\products\\bolts-and-nuts\\nuts\\hex-nuts-03.png',
  'public\\images\\products\\bolts-and-nuts\\nuts\\nylon-nuts-05.png',
  'public\\images\\products\\bolts-and-nuts\\nuts\\nylon-nuts-02.png',
  'public\\images\\products\\bolts-and-nuts\\nuts\\bpw-nuts-03.png',
  'public\\images\\products\\bolts-and-nuts\\nuts\\nylon-nuts-01.png',
  'public\\images\\products\\bolts-and-nuts\\nuts\\flange-nuts-04.png',
  'public\\images\\products\\bolts-and-nuts\\nuts\\nylon-nuts-03.png',
  'public\\images\\products\\bolts-and-nuts\\nuts\\nylon-nuts-04.png',
  'public\\images\\news\\featured.jpg',
  'public\\images\\products\\machining-parts\\machining-parts-10.JPG',
  'public\\images\\products\\auto-parts\\SNV30483.JPG',
  'public\\images\\products\\auto-parts\\SNV30473.JPG',
  'public\\images\\products\\auto-parts\\SNV30489.JPG',
  'public\\images\\products\\auto-parts\\SNV30480.JPG',
  'public\\images\\products\\plastic-rubber-parts\\微信图片_2020032410273732.jpg',
  'public\\images\\about\\factory\\5.png',
  'public\\images\\products\\plastic-rubber-parts\\微信图片_2020032410273711.jpg',
  'public\\images\\products\\plastic-rubber-parts\\微信图片_2020032410273724.jpg',
  'public\\images\\products\\plastic-rubber-parts\\微信图片_2020032410273742.jpg',
  'public\\images\\products\\bolts-and-nuts\\nuts\\hex-nuts-05.png',
  'public\\images\\products\\plastic-rubber-parts\\微信图片_2020032410273734.jpg',
  'public\\images\\about\\factory\\1.JPG',
  'public\\images\\products\\auto-parts\\auto-parts-1.png',
  'public\\images\\news\\cold-heading-vs-machining.png',
  'public\\images\\capabilities\\capability-3.jpg'
];

async function compressImage(imgPath) {
  const fullPath = path.join(__dirname, imgPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP: ${imgPath} (文件不存在)`);
    return { success: false };
  }
  
  const stat = fs.statSync(fullPath);
  const sizeMB = (stat.size / 1024 / 1024).toFixed(2);
  
  if (stat.size < 100 * 1024) {
    console.log(`SKIP: ${imgPath} (${sizeMB}MB - 已较小)`);
    return { success: false };
  }
  
  const ext = path.extname(fullPath).toLowerCase();
  const isPNG = ext === '.png';
  const isJPG = ext === '.jpg' || ext === '.jpeg' || ext === '.jpeg';
  
  try {
    let pipeline = sharp(fullPath);
    
    if (isPNG) {
      pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
    } else {
      pipeline = pipeline.jpeg({ quality: 75, mozjpeg: true });
    }
    
    const buffer = await pipeline.toBuffer();
    const newSizeMB = (buffer.length / 1024 / 1024).toFixed(2);
    const ratio = ((1 - buffer.length / stat.size) * 100).toFixed(1);
    
    if (buffer.length < stat.size) {
      fs.writeFileSync(fullPath, buffer);
      console.log(`✅ ${imgPath} (${sizeMB}MB → ${newSizeMB}MB, 减少 ${ratio}%)`);
      return { success: true, oldSize: stat.size, newSize: buffer.length };
    } else {
      console.log(`⏭ ${imgPath} (${sizeMB}MB - 压缩无效)`);
      return { success: false };
    }
  } catch (err) {
    console.log(`❌ ${imgPath} - ${err.message}`);
    return { success: false };
  }
}

console.log('开始压缩图片...\n');
const results = [];
for (const img of imagesToCompress) {
  const result = await compressImage(img);
  results.push(result);
}

const successCount = results.filter(r => r.success).length;
const totalSaved = results.filter(r => r.success).reduce((sum, r) => sum + (r.oldSize - r.newSize), 0);
console.log(`\n完成！压缩了 ${successCount} 张图片，节省 ${((totalSaved / 1024 / 1024)).toFixed(2)}MB`);
