import {z} from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Field required').max(50, 'Password too long'),
});

export type LoginType = z.infer<typeof loginSchema>;
