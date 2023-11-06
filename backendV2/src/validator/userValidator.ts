import { z } from 'zod';

export const UserRegister = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const UserLogin = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const UpdateUser = z.object({
  email: z.string().email().optional(),
  password: z.string().optional(),
});
