import fs from 'fs';
const p = 'D:/OneDrive/桌面/新官网图片/Track Bolt履带板螺栓';
try {
  const files = fs.readdirSync(p);
  console.log('FILES:');
  console.log(files.join('\n'));
  // also print stats
  for (const f of files) {
    const st = fs.statSync(p + '/' + f);
    console.log(`${f}\t${st.size}\t${st.isDirectory() ? 'DIR' : 'FILE'}`);
  }
} catch (e) {
  console.log('ERR ' + e.message);
}
