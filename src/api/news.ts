import apiClient from './axios'

export interface NewsListParams {
  page?: number
  size?: number
  type?: number   // 0: 제목, 1: 내용, 2: 제목+내용
  keyword?: string
}

export interface NewsItem {
  id: number
  title: string
  author_name: string
  created_at: string
  view_count: number
  thumb_url: string | null
  file_count: number
}

export interface NewsDetail {
  id: number
  title: string
  author_id: string
  author_name: string
  content: string
  view_count: number
  created_at: string
  updated_at: string | null
}

export interface NewsFile {
  id: number
  ori_name: string
  save_name: string
  file_url: string
  file_size: number
  file_ext: string
}

export interface NewsListResponse {
  items: NewsItem[]
  totalCount: number
  totalPages: number
  page: number
  size: number
}

export interface NewsDetailResponse {
  item: NewsDetail
  files: NewsFile[]
  prev: { id: number; title: string } | null
  next: { id: number; title: string } | null
}

/**
 * 소식 목록 조회
 */
export const fetchNewsList = async (params: NewsListParams = {}): Promise<NewsListResponse> => {
  const { data } = await apiClient.get('/api/news', { params })
  if (!data.success) throw new Error(data.message)
  return data.data
}

/**
 * 소식 상세 조회
 * @param preview true일 때 조회수 증가 안 함 (관리자 수정 페이지 용)
 */
export const fetchNewsDetail = async (id: number, preview = false): Promise<NewsDetailResponse> => {
  const { data } = await apiClient.get(`/api/news/${id}`, { params: preview ? { preview: '1' } : {} })
  if (!data.success) throw new Error(data.message)
  return data.data
}

/**
 * 소식 등록
 */
export const createNews = async (title: string, content: string, files?: File[]): Promise<{ id: number }> => {
  const form = new FormData()
  form.append('title', title)
  form.append('content', content)
  files?.forEach(f => form.append('files[]', f))
  const { data } = await apiClient.post('/api/news', form, { headers: { 'Content-Type': undefined } })
  if (!data.success) throw new Error(data.message)
  return data.data
}

/**
 * 소식 수정
 */
export const updateNews = async (id: number, title: string, content: string, files?: File[]): Promise<void> => {
  const form = new FormData()
  form.append('title', title)
  form.append('content', content)
  files?.forEach(f => form.append('files[]', f))
  const { data } = await apiClient.post(`/api/news/${id}`, form, { headers: { 'Content-Type': undefined } })
  if (!data.success) throw new Error(data.message)
}

/**
 * 첨부파일 삭제
 */
export const deleteNewsFile = async (fileId: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/news/file/${fileId}/delete`)
  if (!data.success) throw new Error(data.message)
}

/**
 * 소식 삭제
 */
export const deleteNews = async (id: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/news/${id}/delete`)
  if (!data.success) throw new Error(data.message)
}
