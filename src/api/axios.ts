import axios from 'axios'
import { useAuthStore } from '@/store/useAuthStore'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터 - 인증 토큰 자동 첨부
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// 응답 인터셉터 - 공통 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url ?? ''
      if (!url.includes('/auth/login')) {
        useAuthStore.getState().clearAuth()
        window.location.href = import.meta.env.BASE_URL + 'admin/login'
      }
    }

    // 서버가 JSON body에 담아 준 message를 그대로 사용
    // (없으면 axios 기본 메시지 'Request failed with status code NNN' 유지)
    const serverMessage = error.response?.data?.message
    if (serverMessage) {
      error.message = serverMessage
    }

    return Promise.reject(error)
  },
)

export default apiClient
