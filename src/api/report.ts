import apiClient from './axios'

export interface ReportListParams {
  page?: number
  size?: number
  type?: number   // 0: 제목, 1: 내용, 2: 제목+내용
  keyword?: string
}

export interface ReportItem {
  id: number
  title: string
  author_name: string
  created_at: string
  view_count: number
  content: string | null
  file_count: number
}

export interface ReportDetail {
  id: number
  title: string
  author_id: string
  author_name: string
  content: string
  view_count: number
  created_at: string
  updated_at: string | null
}

export interface ReportFile {
  id: number
  ori_name: string
  save_name: string
  file_url: string
  file_size: number
  file_ext: string
}

export interface ReportListResponse {
  items: ReportItem[]
  totalCount: number
  totalPages: number
  page: number
  size: number
}

export interface ReportDetailResponse {
  item: ReportDetail
  files: ReportFile[]
  prev: { id: number; title: string } | null
  next: { id: number; title: string } | null
}

/**
 * 사업보고 목록 조회
 */
export const fetchReportList = async (params: ReportListParams = {}): Promise<ReportListResponse> => {
  const { data } = await apiClient.get('/api/report', { params })
  if (!data.success) throw new Error(data.message || '목록을 불러오지 못했습니다.')
  return data.data
}

/**
 * 사업보고 상세 조회
 * @param preview true일 때 조회수 증가 안 함 (관리자 수정 페이지 용)
 */
export const fetchReportDetail = async (id: number, preview = false): Promise<ReportDetailResponse> => {
  const { data } = await apiClient.get(`/api/report/${id}`, { params: preview ? { preview: '1' } : {} })
  if (!data.success) throw new Error(data.message || '데이터를 불러오지 못했습니다.')
  return data.data
}

/**
 * 사업보고 등록
 */
export const createReport = async (title: string, content: string, files?: File[]): Promise<{ id: number }> => {
  const form = new FormData()
  form.append('title', title)
  form.append('content', content)
  files?.forEach(f => form.append('files[]', f))
  const { data } = await apiClient.post('/api/report', form, { headers: { 'Content-Type': undefined } })
  if (!data.success) throw new Error(data.message || '저장에 실패했습니다.')
  return data.data
}

/**
 * 사업보고 수정
 */
export const updateReport = async (id: number, title: string, content: string, files?: File[]): Promise<void> => {
  const form = new FormData()
  form.append('title', title)
  form.append('content', content)
  files?.forEach(f => form.append('files[]', f))
  const { data } = await apiClient.post(`/api/report/${id}`, form, { headers: { 'Content-Type': undefined } })
  if (!data.success) throw new Error(data.message || '수정에 실패했습니다.')
}

/**
 * 첨부파일 삭제
 */
export const deleteReportFile = async (fileId: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/report/file/${fileId}/delete`)
  if (!data.success) throw new Error(data.message)
}

/**
 * 사업보고 삭제
 */
export const deleteReport = async (id: number): Promise<void> => {
  const { data } = await apiClient.post(`/api/report/${id}/delete`)
  if (!data.success) throw new Error(data.message)
}
