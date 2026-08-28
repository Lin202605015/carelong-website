const fs = require('fs');

const file = 'D:/龙虾/QClaw/workspace/carelong-website/src/pages/contact.astro';
let content = fs.readFileSync(file, 'utf8');

// 删除整个 <script> 块
const scriptMatch = content.match(/<script>[\s\S]*?<\/script>/);
if (scriptMatch) {
  content = content.replace(/<script>[\s\S]*?<\/script>/, '');
  console.log('✅ JavaScript block removed!');
}

// 确保表单有正确的 action
if (!content.includes('action="https://formsubmit.co/Jason@carelong.com.cn"')) {
  content = content.replace(
    /<form[^>]*>/,
    '<form class="contact-form" id="contact-form" action="https://formsubmit.co/Jason@carelong.com.cn" method="POST" novalidate>'
  );
  console.log('✅ Form action updated!');
}

// 删除成功提示 div（FormSubmit 会自动跳转）
content = content.replace(
  /<div class="form-success"[^>]*>[\s\S]*?<\/div>\s*<\/form>/,
  '</form>'
);

fs.writeFileSync(file, content, 'utf8');
console.log('');
console.log('🎉 FORM FIXED!');
console.log('');
console.log('Next steps:');
console.log('1. Open http://localhost:4321/contact');
console.log('2. Fill and submit the form');
console.log('3. Check Jason@carelong.com.cn for activation email');
console.log('4. Click the activation link');
console.log('5. Form will work after activation!');
