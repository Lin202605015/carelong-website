import type { APIRoute } from 'astro';

// Server endpoint: receives the native form POST, forwards to Web3Forms from the
// Vercel server (reliable network), then redirects to the thank-you page.
// (No `prerender` export — under output:'server' endpoints are dynamic; this also
// avoids the site-wide ISR config which breaks POST body handling.)

const WEB3FORMS_KEY = '592a39ae-63a6-41a0-8070-fdd7e4fbd559';
const FIELDS = [
  'name', 'email', 'company', 'country', 'phone',
  'estimated_quantity', 'product', 'message', 'consent', 'botcheck', 'subject',
];

export const GET: APIRoute = async () => {
  return new Response('GET_OK', { status: 200, headers: { 'Content-Type': 'text/plain' } });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const text = await request.text();
    const inc = new URLSearchParams(text);

    const body = new URLSearchParams();
    body.set('access_key', WEB3FORMS_KEY);
    body.set('subject', inc.get('subject') || 'New inquiry from Carelong website');
    body.set('from_name', 'Carelong Website');
    body.set('botcheck', inc.get('botcheck') || '');
    for (const k of FIELDS) {
      const v = inc.get(k);
      if (v !== null) body.set(k, v);
    }

    // Forward to Web3Forms from the server (best-effort; user still gets thank-you)
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
      // ignore delivery failure
    }

    const ref = request.headers.get('referer') || '';
    const thanks = ref.includes('/es/') ? '/es/thank-you' : '/thank-you';
    return new Response(null, { status: 302, headers: { Location: thanks } });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.stack || e.message : String(e);
    return new Response('ERR: ' + msg, { status: 200, headers: { 'Content-Type': 'text/plain' } });
  }
};
