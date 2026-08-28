import * as fs from 'fs';
const path = 'D:/龙虾/QClaw/workspace/carelong-website/src/pages/contact.astro';
let c = fs.readFileSync(path, 'utf8');

// Emoji mapping: garbled text → correct emoji
const replacements = [
  // Contact icons
  ['馃彚', '🏢'],   // Office Address - building
  ['馃懁', '👤'],   // Contact Person
  ['馃摓', '📞'],   // Phone
  ['馃摖', '📠'],   // Fax
  ['鉁夛笍', '✉️'],  // Email (鉁夛笍 is garbled ✉️)
  ['馃挰', '💬'],   // Skype / chat
  ['馃晲', '🕐'],   // Working Hours - clock
  // Map
  ['馃搷', '📍'],   // Map pin location
  // Social links
  ['馃敆', '💼'],   // LinkedIn
];

for (const [from, to] of replacements) {
  if (c.includes(from)) {
    console.log(`Replacing "${from}" → "${to}"`);
    c = c.replaceAll(from, to);
  } else {
    console.log(`NOT FOUND: "${from}"`);
  }
}

fs.writeFileSync(path, c, 'utf8');
console.log('Done!');
