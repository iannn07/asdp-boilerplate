import { parse, object, string, pipe, url } from 'valibot'

const EnvSchema = object({
  NEXT_PUBLIC_API_URL: pipe(string(), url()),
})

export const env = parse(EnvSchema, {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
})
