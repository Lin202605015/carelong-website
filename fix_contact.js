const fs = require('fs');
const path = require('path');

const file = 'D:/龙虾/QClaw/workspace/carelong-website/src/pages/contact.astro';
let content = fs.readFileSync(file, 'utf8');

// 删除 <script> 块（从 <script> 到 </script>）
const scriptRegex = /<script>[\s\S]*?<\/script>/;
content = content.replace(scriptRegex, '');

// 同时删除成功提示 div（因为 FormSubmit 会自动跳转）
content = content.replace(
  /<div class="form-success"[^>]*>[\s\S]*?<\/div>\s*<\/form>/,
  '</form>'
);

fs.writeFileSync(file, content, 'utf8');
console.log('✅ Script block removed successfully!');
console.log('✅ Form will now submit directly to FormSubmit.co');
