import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { i18n } from '$lib/i18n';
import {
  deleteSessionTokenCookie,
  setSessionTokenCookie,
  validateSessionToken,
} from '$lib/server/auth/session';
import { RefillingTokenBucket } from '$lib/server/rate-limit';

const handleParaglide: Handle = i18n.handle();

const bucket = new RefillingTokenBucket<string>(100, 1);

const rateLimitHandle: Handle = async ({ event, resolve }) => {
  // Note: Assumes X-Forwarded-For will always be defined.
  const clientIP = event.request.headers.get('X-Forwarded-For');
  if (clientIP === null) {
    return resolve(event);
  }
  let cost: number;
  if (event.request.method === 'GET' || event.request.method === 'OPTIONS') {
    cost = 1;
  } else {
    cost = 3;
  }
  if (!bucket.consume(clientIP, cost)) {
    return new Response('Too many requests', {
      status: 429,
    });
  }
  return resolve(event);
};

const authHandle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('session') ?? null;
  if (!token) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await validateSessionToken(token);
  if (session) setSessionTokenCookie(event, token, session.expiresAt);
  else deleteSessionTokenCookie(event);

  event.locals.session = session;
  event.locals.user = user;
  return resolve(event);
};

export const handle = sequence(rateLimitHandle, authHandle, handleParaglide);
