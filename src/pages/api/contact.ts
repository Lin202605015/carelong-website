import type { APIRoute } from 'astro';

// Contact form landing endpoint.
//
// The form submits natively via GET (method="GET") so data travels in the URL query
// string. We deliberately NEVER read a POST body here: reading the request body on
// this Vercel/Node function caused FUNCTION_INVOCATION_FAILED.
//
// The actual email delivery is performed by the visitor's browser (see
// ContactPage.astro, using sendBeacon / keepalive fetch). A real browser request
// carries Origin: https://carelong.com.cn and passes Web3Forms' Cloudflare check;
// a server-side fetch from Vercel's datacenter IP is challenged with a 403
// "Just a moment" page and never delivers. So this endpoint does one thing only:
// redirect instantly to the correct thank-you page.

async function handle(request: Request): Promise<Response> {
  try {
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
