import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import type { AuthUser } from './types'
import { getToken, clearTokens } from './tokenStorage'
import {
  getStoredUser,
  setStoredUser,
  clearSession,
} from './sessionStorage'

export interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: AuthUser) => void
  logout: () => void
  updateUser: (user: AuthUser) => void
  refreshUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Logout user
  const logout = useCallback(() => {
    setUser(null)
    clearTokens()
    clearSession()
  }, [])

  // Login user
  const login = useCallback((authUser: AuthUser) => {
    setUser(authUser)
    setStoredUser(authUser)
  }, [])

  // Update user
  const updateUser = useCallback((authUser: AuthUser) => {
    setUser(authUser)
    setStoredUser(authUser)
  }, [])

  /*
   * Backend authentication refresh is disabled temporarily.
   *
   * Your Customer module is frontend-only and uses mock data.
   * Therefore we do not call:
   *
   * GET /api/auth/me
   *
   * This prevents the 502 error while developing the Customer pages.
   */
  const refreshUser = useCallback(async () => {
    // Backend refresh disabled during frontend development.
    return
  }, [])

  /*
   * Load the stored user when the application starts.
   *
   * We are NOT calling authService.getMe() here.
   */
  useEffect(() => {
    const token = getToken()
    const storedUser = getStoredUser()

    // If a previous login exists, load the stored user.
    if (token && storedUser) {
      setUser(storedUser)
    }

    // Authentication loading is complete.
    setIsLoading(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}