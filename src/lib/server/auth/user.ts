import { eq } from 'drizzle-orm';

import { db } from '../db';
import { type User, userTable } from '../db/schema';

export async function createUser(
  googleId: string,
  email: string,
  name: string,
  picture: string,
): Promise<User> {
  const [user] = await db
    .insert(userTable)
    .values({
      email,
      googleId,
      name,
      picture,
    })
    .returning();

  if (!user) throw new Error('User not created');
  return user;
}

export async function getUserFromGoogleId(googleId: string): Promise<User | null> {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.googleId, googleId),
  });

  if (!user) return null;
  return user;
}
