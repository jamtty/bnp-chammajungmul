// src/pages/BoardWritePage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBoard } from '@/api/board'

export default function BoardWritePage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: () => createBoard({ mb_id: 'guest', mb_name: '비회원', bo_subject: subject, bo_content: content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
      navigate('/')
    },
    onError: (err: unknown) => {
      const axiosErr = err as { response?: { status: number; data: unknown }; message?: string }
      setError(axiosErr?.response
        ? `서버 오류 ${axiosErr.response.status}: ${JSON.stringify(axiosErr.response.data)}`
        : `네트워크 오류: ${axiosErr.message}`)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim() || !content.trim()) { setError('제목과 내용을 모두 입력해주세요.'); return }
    setError(null)
    mutation.mutate()
  }

  return (
    <div className="bg-white border border-gray-200 rounded p-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-gray-500 hover:text-gray-800"
      >
        ← 목록으로
      </button>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">글쓰기</h2>

      {error && (
        <p className="mb-4 text-sm text-red-500">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            rows={10}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-5 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {mutation.isPending ? '등록 중...' : '등록'}
          </button>
        </div>
      </form>
    </div>
  )
}
