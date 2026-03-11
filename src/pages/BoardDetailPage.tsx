import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getBoard, deleteBoard } from '@/api/board'
import { getComments, createComment, deleteComment } from '@/api/comment'

export default function BoardDetailPage() {
  const { no } = useParams<{ no: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [commentText, setCommentText] = useState('')

  const { data: board, isLoading, isError } = useQuery({
    queryKey: ['board', no],
    queryFn: () => getBoard(no!).then(res => res.data),
  })

  const { data: comments = [] } = useQuery({
    queryKey: ['comments', no],
    queryFn: () => getComments(no!).then(res => Array.isArray(res.data) ? res.data : []),
  })

  const deleteBoardMutation = useMutation({
    mutationFn: () => deleteBoard(no!),
    onSuccess: () => navigate('/'),
    onError: () => alert('삭제 중 오류가 발생했습니다.'),
  })

  const addCommentMutation = useMutation({
    mutationFn: () => createComment({
      board_no: Number(no),
      mb_id: 'guest',
      mb_name: '비회원',
      content: commentText.trim(),
    }),
    onSuccess: () => {
      setCommentText('')
      queryClient.invalidateQueries({ queryKey: ['comments', no] })
    },
    onError: () => alert('댓글 등록 중 오류가 발생했습니다.'),
  })

  const deleteCommentMutation = useMutation({
    mutationFn: (commentNo: number) => deleteComment(commentNo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments', no] }),
    onError: () => alert('댓글 삭제 중 오류가 발생했습니다.'),
  })

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim()) { alert('댓글을 입력해주세요.'); return }
    addCommentMutation.mutate()
  }

  const handleCommentDelete = (commentNo: number) => {
    if (!confirm('댓글을 삭제하시겠습니까?')) return
    deleteCommentMutation.mutate(commentNo)
  }

  const handleDelete = () => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    deleteBoardMutation.mutate()
  }

  if (isLoading) return <p className="p-8 text-gray-400">불러오는 중...</p>
  if (isError || !board) return <p className="p-8 text-red-500">데이터를 불러올 수 없습니다.</p>

  return (
    <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded p-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          ← 목록으로
        </button>
        <div className="flex gap-2">
          <Link
            to={`/board/${no}/edit`}
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
          >
            수정
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            disabled={deleteBoardMutation.isPending}
          >
            삭제
          </button>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{board.bo_subject}</h2>
      <div className="flex gap-4 text-sm text-gray-500 mb-6 border-b pb-4">
        <span>작성자: {board.mb_name}</span>
        <span>아이디: {board.mb_id}</span>
        <span>{board.bo_time}</span>
      </div>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{board.bo_content}</p>

      {/* 댓글 목록 */}
      <div className="mt-10">
        <h3 className="text-base font-semibold text-gray-800 mb-4">댓글 {comments.length}개</h3>
        <ul className="divide-y divide-gray-100 border-t border-gray-200">
          {comments.map(c => (
            <li key={c.no} className="py-4 flex justify-between items-start gap-4">
              <div>
                <div className="flex gap-2 text-xs text-gray-500 mb-1">
                  <span className="font-medium text-gray-700">{c.mb_name}</span>
                  <span>{c.reg_time}</span>
                </div>
                <p className="text-sm text-gray-800 whitespace-pre-wrap">{c.content}</p>
              </div>
              <button
                onClick={() => handleCommentDelete(c.no)}
                className="shrink-0 text-xs text-red-400 hover:text-red-600"
              >
                삭제
              </button>
            </li>
          ))}
          {comments.length === 0 && (
            <li className="py-6 text-center text-sm text-gray-400">등록된 댓글이 없습니다.</li>
          )}
        </ul>

        {/* 댓글 입력 */}
        <form onSubmit={handleCommentSubmit} className="mt-4 flex gap-2">
          <textarea
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="댓글을 입력하세요"
            rows={2}
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
          <button
            type="submit"
            disabled={addCommentMutation.isPending}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 self-end"
          >
            {addCommentMutation.isPending ? '등록 중...' : '등록'}
          </button>
        </form>
      </div>
    </div>
  )
}
