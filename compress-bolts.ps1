$srcDir = "D:\OneDrive\桌面\工厂图\Bolts and Nuts Workshop"
$outDir = "D:\龙虾\QClaw\workspace\carelong-website\public\images\factory"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

$nodeScript = @"
const sharp = require('D:/龙虾/QClaw/workspace/carelong-website/node_modules/sharp');
const path = require('path');
const fs = require('fs');
const srcDir = 'D:/OneDrive/桌面/工厂图/Bolts and Nuts Workshop';
const outDir = 'D:/龙虾/QClaw/workspace/carelong-website/public/images/factory';
const files = ['1.jpg','2.jpg','3.png','4.jpg','5.jpg','6.jpg'];
Promise.all(files.map((f,i) => {
  const inPath = path.join(srcDir, f);
  const ext = f.endsWith('.png') ? '.png' : '.jpg';
  const outPath = path.join(outDir, 'bolts-workshop-' + (i+1) + ext);
  const s = sharp(inPath).resize(1200, null, {withoutEnlargement:true});
  return (ext === '.png' ? s.png({quality:85}) : s.jpeg({quality:85}))
    .toFile(outPath)
    .then(() => console.log('OK: bolts-workshop-' + (i+1) + ext))
    .catch(e => console.error('ERR ' + f + ': ' + e.message));
})).then(() => console.log('ALL DONE'));
"@

$tmp = [System.IO.Path]::GetTempFileName() -replace '\.tmp$', '.js'
[System.IO.File]::WriteAllText($tmp, $nodeScript, [System.Text.UTF8Encoding]::new($false))
node $tmp
Remove-Item $tmp