import { api } from '@/core/api/client/apiClient'
import { API_ENDPOINTS } from '@/core/api/endpoints'
import type { LoginCredentials, LoginResponse } from './types'
import type { ApiResponse } from '@/core/api/types/api.types'

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    )
    return response.data.data
  },

  async logout(): Promise<void> {
    await api.post(API_ENDPOINTS.AUTH.LOGOUT)
  },

  async getMe(): Promise<LoginResponse['user']> {
    const response = await api.get<ApiResponse<LoginResponse['user']>>(API_ENDPOINTS.AUTH.ME)
    return response.data.data
  },
}
