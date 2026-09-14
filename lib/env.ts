import { z } from "zod";

const envSchema = z.object({
  FINNHUB_API_KEY: z.string().trim().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000")
});

export const env = envSchema.parse({
  FINNHUB_API_KEY: process.env.FINNHUB_API_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL
});
