import { z } from 'zod';

export const shortenUrlBodySchema = z.object({
  body: z.object({
    longUrl: z.string().url("Invalid URL format"),
  }),
});