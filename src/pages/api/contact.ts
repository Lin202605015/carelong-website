import type { APIRoute } from 'astro';

// Contact form receiver.
// The live form submits via GET (method="GET") so data travels in the URL query string.
// We deliberately do NOT read the POST body — reading request body on this Vercel/Node
// function caused FUNCTION_INVOCATION_FAILED. Query-string data is read instead.

const WEB3FORMS_KEY = '592a39ae-63a6-41a0-8070-fdd7e4fbd559';
const FIELDS = [
  'name', 'email', 'company', 'country', 'phone',
  'estimated_quantity', 'product', 'message', 'consent', 'botcheck', 'subject',
];

function fieldsFromUrl(url: string): Record<string, string> {
  const u = new URL(url);
  const out: Record<string, string> = {};
  for (const k of FIELDS) {
    const v = u.searchParams.get(k);
    if (v !== null) out[k] = v;
  }
  return out;
}

function buildBody(f: Record<string, string>): string {
  const body = new URLSearchParams();
  body.set('access_key', WEB3FORMS_KEY);
  body.set('subject', f['subject'] || 'New inquiry from Carelong website');
  body.set('from_name', 'Carelong Website');
  body.set('botcheck', f['botcheck'] || '');
  for (const k of FIELDS) {
    if (f[k] !== undefined) body.set(k, f[k]);
  }
  return body.toString();
}

async function postToWeb3(bodyStr: string, withOrigin: boolean): Promise<any> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/120.0 Safari/537.36',
    };
    if (withOrigin) headers['Origin'] = 'https://carelong.com.cn';
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers,
      body: bodyStr,
      signal: ctrl.signal,
    });
    const txt = await res.text();
    return { withOrigin, status: res.status, ok: res.ok, snippet: txt.slice(0, 300) };
  } catch (e: any) {
    return { withOrigin, error: (e && e.name ? e.name : 'Err') + ': ' + (e && e.message ? e.message : String(e)) };
  } finally {
    clearTimeout(timer);
  }
}

async function handle(request: Request): Promise<Response> {
  const f = fieldsFromUrl(request.url);

  // Debug mode: report exactly what Web3Forms returns when called FROM Vercel.
  if (f['debug'] === '1') {
    const bodyStr = buildBody(f);
    const a = await postToWeb3(bodyStr, true);
    const b = await postToWeb3(bodyStr, false);
    return new Response(JSON.stringify({ withOrigin: a, withoutOrigin: b }, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const bodyStr = buildBody(f);
    // Forward to Web3Forms from the server. Wait (with an 8s cap) so the email is
    // actually delivered before we redirect the user.
    await postToWeb3(bodyStr, true);

    const ref = request.headers.get('referer') || '';
    const thanks = ref.includes('/es/') ? '/es/thank-you' : '/thank-you';
    return new Response(null, { status: 302, headers: { Location: thanks } });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.stack || e.message : String(e);
    return new Response('ERR: ' + msg, { status: 200, headers: { 'Content-Type': 'text/plain' } });
  }
}

export const GET: APIRoute = async ({ request }) => handle(request);
export const POST: APIRoute = async ({ request }) => handle(request);
