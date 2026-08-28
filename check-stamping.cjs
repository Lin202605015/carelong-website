const https = require('https');
https.get('https://carelong.com.cn/factory', res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    // Find stamping panel
    const idx = body.indexOf('data-panel="stamping"');
    if (idx < 0) {
      console.log('STAMPING PANEL NOT FOUND');
      return;
    }
    console.log('STAMPING PANEL HTML (2000 chars):');
    console.log(body.substring(idx, idx + 2500));
    console.log('\n--- Look for content-visibility ---');
    const cv = body.match(/content-visibility[^;}"]*/g);
    console.log('content-visibility found:', cv);
  });
}).on('error', e => console.log('ERR', e.message));
