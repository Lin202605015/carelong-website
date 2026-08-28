import fs from 'fs';
const src = 'D:/OneDrive/桌面/新官网图片/Segment Bolts刀角螺栓/Segment Bolt Specifications.docx';
const dst = 'D:/龙虾/QClaw/workspace/carelong-website/segment-bolts-src.docx';
fs.copyFileSync(src, dst);
console.log('copied', fs.statSync(dst).size);
