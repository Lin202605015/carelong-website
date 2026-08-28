import fs from 'fs';
for (const f of ['check-perf.mjs', 'check-perf2.mjs', 'verify-opt.mjs', 'verify-live.mjs']) {
  try { fs.unlinkSync(f); console.log('removed', f); } catch (e) { console.log('skip', f); }
}
