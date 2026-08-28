import fs from 'fs';
const files = [
  'D:/龙虾/QClaw/workspace/carelong-website/src/pages/products/bolts-and-nuts/plow-bolts.astro',
  'D:/龙虾/QClaw/workspace/carelong-website/src/pages/products/bolts-and-nuts/track-bolts.astro',
];
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  console.log('=== ' + f);
  lines.forEach((l, i) => {
    if (/Sample Policy|Payment/.test(l)) console.log((i + 1) + ': ' + l.trim());
  });
}
