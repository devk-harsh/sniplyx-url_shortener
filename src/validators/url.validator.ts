import { z } from 'zod';

export const shortenUrlSchema = z.object({
  body: z.object({
    longUrl: z.string().url("Invalid URL format"),
  }),
});