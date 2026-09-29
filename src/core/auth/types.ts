import type { Role } from '@/core/permissions/roles'
import type { Permission } from '@/core/permissions/constants'

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  roles: Role[]
  permissions: Permission[]
  avatar?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  user: AuthUser
  accessToken: string
  refreshToken: string
}
