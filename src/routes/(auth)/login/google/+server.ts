import { generateCodeVerifier, generateState } from 'arctic';

import { google } from '$lib/server/auth/oauth';

import type { RequestEvent } from './$types';

export function GET(event: RequestEvent): Response {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = google.createAuthorizationURL(state, codeVerifier, ['openid', 'profile', 'email']);

  event.cookies.set('google_oauth_state', state, {
    httpOnly: true,
    maxAge: 60 * 10,
    path: '/',
    sameSite: 'lax',
    secure: import.meta.env.PROD,
  });
  event.cookies.set('google_code_verifier', codeVerifier, {
    httpOnly: true,
    maxAge: 60 * 10,
    path: '/',
    sameSite: 'lax',
    secure: import.meta.env.PROD,
  });

  return new Response(null, {
    headers: {
      Location: url.toString(),
    },
    status: 302,
  });
}
