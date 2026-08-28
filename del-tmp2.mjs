import fs from 'fs';
for (const f of ['find-refs.mjs', 'convert-webp.mjs', 'update-refs.mjs', 'verify-webp.mjs', 'verify-live2.mjs']) {
  try { fs.unlinkSync(f); console.log('removed', f); } catch (e) { console.log('skip', f); }
}
