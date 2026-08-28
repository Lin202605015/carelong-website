import fs from 'fs';
const src = 'D:/OneDrive/桌面/新官网图片/Track Bolt履带板螺栓/track-bolts.docx';
const dst = 'D:/龙虾/QClaw/workspace/carelong-website/track-bolts-src.docx';
fs.copyFileSync(src, dst);
console.log('copied', fs.statSync(dst).size);
