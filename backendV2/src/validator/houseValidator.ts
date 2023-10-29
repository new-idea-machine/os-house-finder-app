import { z } from 'zod';

export const URLParamZodSchema = z.object({
  url: z.string().url(),
});
