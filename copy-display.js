const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const srcDir = 'D:\\OneDrive\\桌面\\工厂图\\Display Rack Workshop';
const tempDir = 'C:\\temp-display';

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const files = fs.readdirSync(srcDir);
console.log('Source files:', files);

files.forEach(f => {
  const src = path.join(srcDir, f);
  const dst = path.join(tempDir, 'display-workshop-' + f);
  const buf = fs.readFileSync(src);
  fs.writeFileSync(dst, buf);
  console.log('Copied:', f);
});

// rename to sequential
const exts = {'.jpg':'jpg','.png':'png','.jpeg':'jpeg'};
const tempFiles = fs.readdirSync(tempDir).filter(f => f.startsWith('display-workshop-'));
tempFiles.forEach((f, i) => {
  const ext = path.extname(f);
  const newName = 'display-workshop-' + (i+1) + ext.toLowerCase();
  fs.renameSync(path.join(tempDir, f), path.join(tempDir, newName));
  console.log('Renamed:', f, '->', newName);
});

console.log('DONE. Files in temp:');
fs.readdirSync(tempDir).forEach(f => console.log(' ', f));
