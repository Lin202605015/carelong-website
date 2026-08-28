const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = 'D:\\龙虾\\QClaw\\workspace\\carelong-website\\public';

// Referenced PNGs > 150KB
const pngs = [
  '/images/products/bolts-and-nuts/nuts/hex-nuts-05.png',
  '/images/products/bolts-and-nuts/nuts/hex-nuts-04.png',
  '/images/products/display-rack/wall-mounted-racks-04.png',
  '/images/about/factory/5.png',
  '/images/products/bolts-and-nuts/nuts/flange-nuts-03.png',
  '/images/products/bolts-and-nuts/nuts/bpw-nuts-04.png',
  '/images/products/bolts-and-nuts/nuts/hex-nuts-03.png',
  '/images/products/bolts-and-nuts/nuts/flange-nuts-05.png',
  '/images/products/bolts-and-nuts/nuts/bpw-nuts-02.png',
  '/images/products/bolts-and-nuts/nuts/flange-nuts-04.png',
  '/images/products/plastic-rubber-parts/plastic-rubber-parts-01.png',
  '/images/products/bolts-and-nuts/nuts/nylon-nuts-05.png',
  '/images/products/bolts-and-nuts/nuts/bpw-nuts-03.png',
  '/images/products/bolts-and-nuts/nuts/bpw-nuts-05.png',
  '/images/products/bolts-and-nuts/nuts/nylon-nuts-02.png',
  '/images/products/bolts-and-nuts/nuts/nylon-nuts-01.png',
  '/images/products/bolts-and-nuts/nuts/nylon-nuts-03.png',
  '/images/products/bolts-and-nuts/nuts/bpw-nuts-01.png',
  '/images/products/bolts-and-nuts/nuts/nylon-nuts-04.png',
  '/images/news/production-record.png',
  '/images/products/display-rack/pegboard-slatwall-01.png',
  '/images/products/display-rack/wall-mounted-racks-01.png',
  '/images/products/bolts-and-nuts/track-bolts/track-bolt-01.png',
  '/images/products/bolts-and-nuts/track-bolts/track-bolt-02.png',
  '/images/products/machining-parts/machining-parts-01.png',
  '/images/products/display-rack/wall-mounted-racks-02.png',
  '/images/products/stamping-parts/stamping-parts-01.png',
  '/images/products/display-rack/wall-mounted-racks-03.png',
  '/images/news/cold-heading-vs-machining.png',
];

(async () => {
  for (const p of pngs) {
    const fp = path.join(publicDir, p.replace(/^\//, '').replace(/\//g, path.sep));
    if (!fs.existsSync(fp)) { console.log('MISSING:', p); continue; }
    try {
      const meta = await sharp(fp).metadata();
      const hasAlpha = meta.hasAlpha;
      const sizeKB = Math.round(fs.statSync(fp).size / 1024);
      console.log(
        (hasAlpha ? 'ALPHA ' : 'OPAQUE').padEnd(7),
        (meta.width + 'x' + meta.height).padEnd(14),
        sizeKB.toString().padStart(6) + ' KB',
        p
      );
    } catch (e) {
      console.log('ERROR:', p, e.message);
    }
  }
})();
