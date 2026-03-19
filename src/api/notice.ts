import apiClient from './axios'

export interface NoticeListParams {
  page?: number
  size?: number
  type?: number   // 0: 제목, 1: 내용, 2: 제목+내용
  keyword?: string
}

export interface NoticeItem {
  id: number
  title: string
  author_name: string
  created_at: string
  view_count: number
  file_count: number
}

export interface NoticeDetail {
  id: number
  title: string
  author_id: string
  author_name: string
  content: string
  view_count: number
  created_at: string
  updated_at: string | null
}

export interface NoticeFile {
  id: number
  ori_name: string
  save_name: string
  file_url: string
  file_size: number
  file_ext: string
}

export interface NoticeListResponse {
  items: NoticeItem[]
  totalCount: number
  totalPages: number
  page: number
  size: number
}

export interface NoticeDetailResponse {
  item: NoticeDetail
  files: NoticeFile[]
  prev: { id: number; title: string } | null
  next: { id: number; title: string } | null
}

/**
 * 공지사항 목록 조회
 */
export const fetchNoticeList = async (params: NoticeListParams = {}): Promise<NoticeListResponse> => {
  const { data } = await apiClient.get('/api/notice', { params })
  if (!data.success) throw new Error(data.message)
  return data.data
}

/**
 * 공지사항 상세 조회
 */
export const fetchNoticeDetail = async (id: number): Promise<NoticeDetailResponse> => {
  const { data } = await apiClient.get(`/api/notice/${id}`)
  if (!data.success) throw new Error(data.message)
  return data.data
}
