import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response('GET_OK', { status: 200, headers: { 'Content-Type': 'text/plain' } });
};

// MINIMAL: POST does NOT read the body at all, just redirects.
export const POST: APIRoute = async () => {
  return new Response(null, { status: 302, headers: { Location: '/thank-you' } });
};
