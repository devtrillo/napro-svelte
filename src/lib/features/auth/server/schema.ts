import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('email-required'),
  password: z.string().min(1, 'password-required'),
});

export type LoginSchema = typeof loginSchema;
