import type { APIRoute } from 'astro';

export const prerender = false;

const FORMSUBMIT_URL = 'https://formsubmit.co/jason@carelong.com.cn';
const RELAY_TIMEOUT_MS = 4500;

// Relay contact submissions to FormSubmit.co server-side. The browser POSTs
// here (same-origin) so no third-party domain is exposed to the client and no
// CORS/CSP changes are needed. If FormSubmit is slow/down, we abort fast and
// return 502 so the page can show a mailto fallback instead of hanging.
export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };
  try {
    const fd = await request.formData();
    const params = new URLSearchParams();
    for (const [k, v] of fd.entries()) {
      params.append(k, typeof v === 'string' ? v : v.toString());
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), RELAY_TIMEOUT_MS);
    let upstream: Response;
    try {
      upstream = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: params.toString(),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }
    if (upstream.ok) {
      return new Response(JSON.stringify({ success: true }), { status: 200, headers });
    }
    return new Response(JSON.stringify({ success: false, reason: 'upstream_error' }), { status: 502, headers });
  } catch {
    return new Response(JSON.stringify({ success: false, reason: 'relay_failed' }), { status: 502, headers });
  }
};
