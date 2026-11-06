import type { APIRoute } from 'astro';

// This route is dynamic (never prerendered) so it can forward to Web3Forms at request time.
export const prerender = false;

const WEB3FORMS_KEY = '592a39ae-63a6-41a0-8070-fdd7e4fbd559';
const BUSINESS_FIELDS = [
  'name', 'email', 'company', 'country', 'phone',
  'estimated_quantity', 'product', 'message', 'consent',
];

export const POST: APIRoute = async ({ request }) => {
  // 1. Parse the submitted form (native browser POST: application/x-www-form-urlencoded)
  let fields: Record<string, string> = {};
  try {
    const form = await request.formData();
    for (const [k, v] of form.entries()) fields[k] = String(v);
  } catch {
    return new Response('Bad request', { status: 400 });
  }

  // 2. Re-assemble the payload for Web3Forms (server-side call, reliable from Vercel US node)
  const body = new URLSearchParams();
  body.set('access_key', WEB3FORMS_KEY);
  body.set('subject', fields['subject'] || 'New inquiry from Carelong website');
  body.set('from_name', 'Carelong Website');
  body.set('botcheck', fields['botcheck'] || '');
  for (const k of BUSINESS_FIELDS) {
    if (fields[k] !== undefined) body.set(k, fields[k]);
  }

  // 3. Forward to Web3Forms (best-effort; even if it fails we still thank the user)
  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Origin': 'https://carelong.com.cn',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
          '(KHTML, like Gecko) Chrome/120.0 Safari/537.36',
      },
      body: body.toString(),
    });
  } catch {
    // ignore delivery failure; user already gets the thank-you page
  }

  // 4. Redirect to the correct-language thank-you page (decide by referer)
  const ref = request.headers.get('referer') || '';
  const thanks = ref.includes('/es/') ? '/es/thank-you' : '/thank-you';
  return new Response(null, {
    status: 302,
    headers: { Location: thanks },
  });
};

export const GET: APIRoute = async () => {
  return new Response('Method Not Allowed', { status: 405 });
};
