const fs = require('fs');
const c = fs.readFileSync('D:/龙虾/QClaw/workspace/carelong-website/src/pages/faq.astro', 'utf8');
const qs = [...c.matchAll(/faq-q">([\s\S]*?)<\/span>/g)].map(m => m[1].trim());
const as = [...c.matchAll(/faq-answer">\s*<p>([\s\S]*?)<\/p>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
const faq = qs.slice(0, as.length).map((q, i) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: as[i] } }));
fs.writeFileSync('D:/龙虾/QClaw/workspace/carelong-website/faq-schema.json', JSON.stringify(faq, null, 2));
console.log(`Extracted ${faq.length} Q&A pairs`);