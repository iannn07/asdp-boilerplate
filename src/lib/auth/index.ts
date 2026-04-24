import type { AuthAdapter } from './types'

export type { Session } from './types'
export type { AuthAdapter }

const stubAdapter: AuthAdapter = {
  async validateSession(_token: string) {
    return null
  },
  getToken(_request: Request) {
    return null
  },
}

let _adapter: AuthAdapter = stubAdapter

export function setAuthAdapter(adapter: AuthAdapter) {
  _adapter = adapter
}

export function getAuthAdapter(): AuthAdapter {
  return _adapter
}
