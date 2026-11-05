import type { APIRoute } from 'astro';

export const prerender = false;

// Relay contact form submissions to FormSubmit.co server-side.
// The browser POSTs here (same-origin), so no third-party domain is exposed
// to the client and no CORS/CSP changes are needed. If FormSubmit is down,
// we return 502 and the page shows a mailto fallback instead of a dead page.
export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };
  try {
    const fd = await request.formData();
    const params = new URLSearchParams();
    for (const [k, v] of fd.entries()) {
      params.append(k, typeof v === 'string' ? v : v.toString());
    }
    const res = await fetch('https://formsubmit.co/jason@carelong.com.cn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: params.toString(),
    });
    if (res.ok) {
      return new Response(JSON.stringify({ success: true }), { status: 200, headers });
    }
    return new Response(JSON.stringify({ success: false }), { status: 502, headers });
  } catch {
    return new Response(JSON.stringify({ success: false }), { status: 502, headers });
  }
};
