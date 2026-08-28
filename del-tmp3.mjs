import fs from 'fs';
const files = [
  'scan-all.mjs', 'scan-missing.mjs', 'scan-href.mjs', 'convert-all.mjs', 'apply-refs.mjs',
  'verify-all.mjs', 'scan-nonastro.mjs', 'scan-products-ts.mjs', 'scan-showcase.mjs',
  'convert-objrefs.mjs', 'verify-final.mjs', 'verify-live3.mjs', 'check-products-html.mjs',
  'scan-all-forms.mjs', 'fix-pegboard.mjs', 'verify-final2.mjs', 'verify-live4.mjs',
  'webp-converted.json',
];
for (const f of files) {
  try { fs.unlinkSync(f); console.log('removed', f); } catch (e) { console.log('skip', f); }
}
