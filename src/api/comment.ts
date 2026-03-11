import axios from 'axios'

const BASE = import.meta.env.VITE_API_BASE_URL

export interface Comment {
  no: number
  board_no: number
  mb_id: string
  mb_name: string
  content: string
  reg_time: string
}

export const getComments = (boardNo: number | string) =>
  axios.get<Comment[]>(`${BASE}/comment.php?board_no=${boardNo}`)

export const createComment = (data: Pick<Comment, 'board_no' | 'mb_id' | 'mb_name' | 'content'>) =>
  axios.post(`${BASE}/comment.php`, data)

export const deleteComment = (no: number) =>
  axios.delete(`${BASE}/comment.php?no=${no}`)
