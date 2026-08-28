import * as fs from 'fs';
const path = 'D:/龙虾/QClaw/workspace/carelong-website/src/pages/contact.astro';
let content = fs.readFileSync(path, 'utf8');
// Current structure: ...</section>\n<script>...</script>\n</BaseLayout>\n\n<style>...</style>
// Target structure:  ...</section>\n<script>...</script>\n<style>...</style>\n</BaseLayout>
// Step 1: Remove </BaseLayout> from its current position
content = content.replace('</BaseLayout>\n\n<style>', '<style>');
// Step 2: Append </BaseLayout> at the very end
content = content.trimEnd() + '\n\n</BaseLayout>\n';
fs.writeFileSync(path, content, 'utf8');
console.log('done');
