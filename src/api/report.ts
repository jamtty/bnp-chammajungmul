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
  if (!data.success) throw new Error(data.message)
  return data.data
}

/**
 * 사업보고 상세 조회
 */
export const fetchReportDetail = async (id: number): Promise<ReportDetailResponse> => {
  const { data } = await apiClient.get(`/api/report/${id}`)
  if (!data.success) throw new Error(data.message)
  return data.data
}
