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
  content: string | null
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
  if (!data.success) throw new Error(data.message || '목록을 불러오지 못했습니다.')
  return data.data
}

/**
 * 공지사항 상세 조회
 * @param preview true일 때 조회수 증가 안 함 (관리자 수정 페이지 용)
 */
export const fetchNoticeDetail = async (id: number, preview = false): Promise<NoticeDetailResponse> => {
  const { data } = await apiClient.get(`/api/notice/${id}`, { params: preview ? { preview: '1' } : {} })
  if (!data.success) throw new Error(data.message || '데이터를 불러오지 못했습니다.')
  return data.data
}

/**
 * 공지사항 등록
 */
export const createNotice = async (title: string, content: string, files?: File[]): Promise<{ id: number }> => {
  const form = new FormData()
  form.append('title', title)
  form.append('content', content)
  files?.forEach(f => form.append('files[]', f))
  const { data } = await apiClient.post('/api/notice', form, { headers: { 'Content-Type': undefined } })
  if (!data.success) throw new Error(data.message || '저장에 실패했습니다.')
  return data.data
}

/**
 * 공지사항 수정
 */
export const updateNotice = async (id: number, title: string, content: string, files?: File[]): Promise<void> => {
  const form = new FormData()
  form.append('title', title)
  form.append('content', content)
  files?.forEach(f => form.append('files[]', f))
  const { data } = await apiClient.post(`/api/notice/${id}`, form, { headers: { 'Content-Type': undefined } })
  if (!data.success) throw new Error(data.message || '수정에 실패했습니다.')
}

/**
 * 첨부파일 삭제
 */
export const deleteNoticeFile = async (fileId: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/notice/file/${fileId}/delete`)
  if (!data.success) throw new Error(data.message)
}

/**
 * 공지사항 삭제
 */
export const deleteNotice = async (id: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/notice/${id}/delete`)
  if (!data.success) throw new Error(data.message)
}
