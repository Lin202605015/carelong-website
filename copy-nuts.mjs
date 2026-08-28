import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const srcBase = 'D:/OneDrive/桌面/新官网图片/Nuts';
const dstBase = 'D:/龙虾/QClaw/workspace/carelong-website/public/images/products/bolts-and-nuts';

const categories = ['Hex Nuts', 'Flange Nuts', 'Nylon Nuts', 'Wheel Nuts', 'Slotted Nuts'];

// slug mapping
const slugMap = {
  'Hex Nuts': 'hex-nuts',
  'Flange Nuts': 'flange-nuts',
  'Nylon Nuts': 'nylon-nuts',
  'Wheel Nuts': 'wheel-nuts',
  'Slotted Nuts': 'slotted-nuts',
};

async function process() {
  for (const cat of categories) {
    const slug = slugMap[cat];
    const srcDir = path.join(srcBase, cat);
    const dstDir = path.join(dstBase, slug);
    fs.mkdirSync(dstDir, { recursive: true });

    const files = fs.readdirSync(srcDir).filter(f => /\.(png|jpe?g)$/i.test(f)).sort();
    console.log(`\n=== ${cat} → ${slug} (${files.length} files) ===`);

    for (const file of files) {
      const srcPath = path.join(srcDir, file);
      const ext = path.extname(file).toLowerCase();
      // Output as webp: hex-nuts-01.webp, etc.
      const idx = path.basename(file, ext).replace(/^(\d+).*$/, '$1').padStart(2, '0');
      const outPath = path.join(dstDir, `${slug}-${idx}.webp`);

      try {
        const meta = await sharp(srcPath).rotate().resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 80 }).toFile(outPath);
        const srcSize = fs.statSync(srcPath).size;
        console.log(`  ${file} → ${slug}-${idx}.webp  ${(srcSize/1024).toFixed(0)}KB → ${(meta.size/1024).toFixed(0)}KB`);
      } catch (e) {
        console.log(`  ERROR ${file}: ${e.message}`);
      }
    }
  }
  console.log('\n✅ Done!');
}

process().catch(e => console.error('Fatal:', e));
