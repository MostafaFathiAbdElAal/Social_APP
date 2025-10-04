import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_BASEURL: z.string().url(), 
  APIBASEURL: z.string().url(),
});

export const env = envSchema.parse(process.env);
