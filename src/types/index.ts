// 공통 타입 정의
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}

export interface User {
  id: number
  email: string
  name: string
  role: 'ADMIN' | 'USER'
  createdAt: string
}
