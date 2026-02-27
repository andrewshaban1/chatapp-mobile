import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { error: 'Email is required' })
    .pipe(z.email({ error: 'Please enter a valid email' })),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, { error: 'Email is required' })
    .pipe(z.email({ error: 'Please enter a valid email' })),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers and underscores allowed'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/(?=.*[A-Z])/, 'Must contain at least one uppercase letter')
    .regex(/(?=.*\d)/, 'Must contain at least one number'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
