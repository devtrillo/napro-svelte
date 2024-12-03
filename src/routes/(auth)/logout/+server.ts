import { redirect } from '@sveltejs/kit';

import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/auth/session';

import type { RequestEvent } from './$types';

export async function GET(event: RequestEvent) {
  const session = event.locals.session;
  if (!session) return redirect(302, '/');

  await invalidateSession(session.id);
  deleteSessionTokenCookie(event);

  return redirect(302, '/');
}
