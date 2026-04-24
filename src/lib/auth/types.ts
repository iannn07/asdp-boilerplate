export type Session = {
  userId: string
  email: string
  name: string
  roles: string[]
  expiresAt: number
}

export interface AuthAdapter {
  validateSession(token: string): Promise<Session | null>
  getToken(request: Request): string | null
}
