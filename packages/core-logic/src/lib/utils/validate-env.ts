import { z } from "zod";

/**
 * Environment Variables Schema
 */
const envSchema = z.object({
  // -------------------------------------------------------------------------
  // Shared
  // -------------------------------------------------------------------------
  NODE_ENV: z.enum(["development", "test", "staging", "production"]).default("development"),

  // -------------------------------------------------------------------------
  // Client-exposed
  // -------------------------------------------------------------------------
  EXPO_PUBLIC_SUPABASE_URL: z
    .string()
    .url("Supabase URL must be a valid URL")
    .default("https://qufzqokcbjgkolwgalpz.supabase.co"),
  EXPO_PUBLIC_SUPABASE_KEY: z
    .string()
    .min(1, "Supabase Key is required")
    .default("sb_publishable_8LGKCXDHR2Dl0JMBtc0Isw_T-zkzo8K"),

  // -------------------------------------------------------------------------
  // Server-only
  // -------------------------------------------------------------------------
  SKIP_ENV_VALIDATION: z.string().optional().default("false"),
});

const _parseEnv = () => {
  // Each variable must be accessed individually so Expo/Metro can inline
  // EXPO_PUBLIC_* values at build time in the client bundle.
  const values = {
    NODE_ENV: process.env.NODE_ENV,
    EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
    EXPO_PUBLIC_SUPABASE_KEY: process.env.EXPO_PUBLIC_SUPABASE_KEY,

    // eslint-disable-next-line turbo/no-undeclared-env-vars
    SKIP_ENV_VALIDATION: process.env.SKIP_ENV_VALIDATION,
  };

  // eslint-disable-next-line turbo/no-undeclared-env-vars
  if (process.env.SKIP_ENV_VALIDATION === "true" || process.env.NODE_ENV === "test") {
    return values as z.infer<typeof envSchema>;
  }

  const parsed = envSchema.safeParse(values);
  if (!parsed.success) {
    console.error("Invalid environment variables:\n", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables. Check the logs above.");
  }

  return parsed.data;
};

export const env = _parseEnv();
