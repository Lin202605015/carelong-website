const fs = require('fs');
let c = fs.readFileSync('D:/龙虾/QClaw/workspace/carelong-website/src/pages/contact.astro', 'utf8');

// Replace the broken form tag and hidden fields
const oldForm = /<form\s+class="contact-form"\s+id="contact-form"[\s\S]*?<!-- <input type="hidden" name="_next" value="https:\/\/formsubmit\.co\/thanks"> -->/;
const newForm = `<form
            class="contact-form"
            id="contact-form"
            action="https://formsubmit.co/Jason@carelong.com.cn"
            method="POST"
          >
            <input type="hidden" name="_subject" value="New Inquiry from Carelong Website">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_template" value="table">
            <input type="hidden" name="_next" value="https://carelong.com.cn/thank-you">`;

c = c.replace(oldForm, newForm);

// Add Supabase submission script before </style>
const scriptToAdd = `
<script>
  // 同时将留言保存到 Supabase 数据库
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      const formData = new FormData(form);
      const data = {
        first_name: formData.get('First Name'),
        last_name: formData.get('Last Name'),
        email: formData.get('Email'),
        phone: formData.get('Phone'),
        company: formData.get('Company'),
        country: formData.get('Country'),
        product_interest: formData.get('Product Interest'),
        estimated_quantity: formData.get('Estimated Quantity'),
        message: formData.get('Message'),
      };
      try {
        await fetch('https://wlxpswkeqkxanpxltwyo.supabase.co/rest/v1/inquiries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'sb_publishable_zCu37TR1Sz4vFQ0mkdZQrA_w4u88Lgf',
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.error('Failed to save inquiry to database:', err);
      }
    });
  }
</script>`;

// Insert script before closing </BaseLayout>
c = c.replace('</BaseLayout>', scriptToAdd + '\n</BaseLayout>');

fs.writeFileSync('D:/龙虾/QClaw/workspace/carelong-website/src/pages/contact.astro', c, 'utf8');
console.log('contact.astro updated successfully');
