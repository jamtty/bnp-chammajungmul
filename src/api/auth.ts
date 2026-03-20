import apiClient from './axios'

interface LoginResponse {
  token: string
  user: {
    id: number
    name: string
    role: string
  }
}

/**
 * 관리자 로그인
 * POST /api/auth/login
 */
export const loginAdmin = async (loginId: string, password: string): Promise<LoginResponse> => {
  const { data } = await apiClient.post('/api/auth/login', { login_id: loginId, password })
  if (!data.success) throw new Error(data.message || '로그인에 실패했습니다.')
  return data.data as LoginResponse
}
