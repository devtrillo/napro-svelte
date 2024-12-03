import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32, encodeHexLowerCase } from '@oslojs/encoding';
import type { RequestEvent } from '@sveltejs/kit';
import dayjs from 'dayjs';
import { eq } from 'drizzle-orm';

import { db } from '../db';
import { type Session, sessionTable, type User, userTable } from '../db/schema';

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const [row] = await db
    .select()
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId));

  if (!row) return { session: null, user: null };
  const { session, user } = row;
  if (dayjs().isAfter(dayjs(session.expiresAt))) {
    db.delete(sessionTable).where(eq(sessionTable.id, session.id));
    return { session: null, user: null };
  }

  if (dayjs().isAfter(dayjs(session.expiresAt).subtract(15, 'days'))) {
    session.expiresAt = dayjs().add(15, 'days').toISOString();
    await db
      .update(sessionTable)
      .set({ expiresAt: session.expiresAt })
      .where(eq(sessionTable.id, sessionId));
  }
  return {
    session,
    user,
  };
}

export async function invalidateSession(sessionId: string) {
  return await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export async function invalidateUserSessions(userId: number) {
  return await db.delete(sessionTable).where(eq(sessionTable.userId, userId));
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: string): void {
  event.cookies.set('session', token, {
    expires: dayjs(expiresAt).toDate(),
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: import.meta.env.PROD,
  });
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
  event.cookies.set('session', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
    sameSite: 'lax',
    secure: import.meta.env.PROD,
  });
}

export function generateSessionToken(): string {
  const tokenBytes = new Uint8Array(20);
  crypto.getRandomValues(tokenBytes);
  const token = encodeBase32(tokenBytes).toLowerCase();
  return token;
}

export async function createSession(token: string, userId: number): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const [session] = await db
    .insert(sessionTable)
    .values({
      expiresAt: dayjs().add(30, 'days').toISOString(),
      id: sessionId,
      userId,
    })
    .returning();

  return session;
}

type SessionValidationResult = { session: Session; user: User } | { session: null; user: null };
