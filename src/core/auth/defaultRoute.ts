import type { AuthUser } from './types'

export function getHomeRoute(_user?: AuthUser | null): string {
  return '/admin/dashboard'
}
