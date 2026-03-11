import axios from 'axios'

const BASE = import.meta.env.VITE_API_BASE_URL

export interface Board {
  no: number
  mb_id: string
  mb_name: string
  bo_subject: string
  bo_content: string
  bo_time: string
  comment_count?: number
}

export const getBoards = () =>
  axios.get<Board[]>(`${BASE}/board.php`)

export const getBoard = (no: number | string) =>
  axios.get<Board>(`${BASE}/board.php?no=${no}`)

export const createBoard = (data: Pick<Board, 'mb_id' | 'mb_name' | 'bo_subject' | 'bo_content'>) =>
  axios.post(`${BASE}/board.php`, data)

export const updateBoard = (no: number | string, data: Pick<Board, 'bo_subject' | 'bo_content'>) =>
  axios.put(`${BASE}/board.php?no=${no}`, data)

export const deleteBoard = (no: number | string) =>
  axios.delete(`${BASE}/board.php?no=${no}`)
