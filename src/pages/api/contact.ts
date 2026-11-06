import type { APIRoute } from 'astro';

// Diagnostic build: GET_OK health check + POST reports egress reachability.
export const GET: APIRoute = async () => {
  return new Response('GET_OK', { status: 200, headers: { 'Content-Type': 'text/plain' } });
};

export const POST: APIRoute = async ({ request }) => {
  const res: Record<string, string> = { step: 'start' };
  try {
    const text = await request.text();
    res.bodyLen = String(text.length);

    // 1) General egress test
    const t0 = Date.now();
    try {
      const r1 = await fetch('https://example.com', { method: 'GET' });
      res.egress_example = `${r1.status} in ${Date.now() - t0}ms`;
    } catch (e) {
      res.egress_example = 'ERR ' + (e instanceof Error ? e.message : String(e));
    }

    // 2) Web3Forms reachability test
    const t1 = Date.now();
    try {
      const r2 = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'access_key=592a39ae-63a6-41a0-8070-fdd7e4fbd559&name=diag&email=a@b.com&message=diag&consent=on',
      });
      res.web3 = `${r2.status} in ${Date.now() - t1}ms`;
    } catch (e) {
      res.web3 = 'ERR ' + (e instanceof Error ? e.message : String(e));
    }
  } catch (e) {
    res.fatal = 'ERR ' + (e instanceof Error ? e.message : String(e));
  }
  return new Response(JSON.stringify(res), { status: 200, headers: { 'Content-Type': 'application/json' } });
};
