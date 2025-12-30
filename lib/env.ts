/** * @format
 * @description ENV_VALIDATOR: อัปเดตให้รองรับ Admin & Database Keys
 */
import { z } from 'zod'

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_BASE_URL: z.string().url().optional(),
})

const serverEnvSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  SUPABASE_JWT_SECRET: z.string(),
  POSTGRES_URL: z.string(),
  RESEND_API_KEY: z.string(),
  ADMIN_SECRET_ID_TOKEN: z.string(),
  ADMIN_API_KEY: z.string(),
  SUPABASE_BUCKET_NAME: z.string(),
})

const isServer = typeof window === 'undefined'

export const env = {
  ...publicEnvSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  ...(isServer
    ? serverEnvSchema.parse({
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
        SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
        POSTGRES_URL: process.env.POSTGRES_URL,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        ADMIN_SECRET_ID_TOKEN: process.env.ADMIN_SECRET_ID_TOKEN,
        ADMIN_API_KEY: process.env.ADMIN_API_KEY,
        SUPABASE_BUCKET_NAME: process.env.SUPABASE_BUCKET_NAME,
      })
    : ({} as z.infer<typeof serverEnvSchema>)),
}
