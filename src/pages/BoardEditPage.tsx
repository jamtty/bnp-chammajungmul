// src/pages/BoardEditPage.tsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getBoard, updateBoard } from '@/api/board'

export default function BoardEditPage() {
  const { no } = useParams<{ no: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState<string | null>(null)

  const { isLoading } = useQuery({
    queryKey: ['board', no],
    queryFn: () => getBoard(no!).then(res => res.data),
    onSuccess: (data: { bo_subject: string; bo_content: string }) => {
      setSubject(data.bo_subject ?? '')
      setContent(data.bo_content ?? '')
    },
  } as Parameters<typeof useQuery>[0])

  const mutation = useMutation({
    mutationFn: () => updateBoard(no!, { bo_subject: subject, bo_content: content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', no] })
      alert('수정이 완료되었습니다.')
      navigate(`/board/${no}`)
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

  if (isLoading) return <p className="p-8 text-gray-400">불러오는 중...</p>

  return (
    <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded p-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-gray-500 hover:text-gray-800"
      >
        ← 뒤로
      </button>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">글 수정</h2>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
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
            {mutation.isPending ? '저장 중...' : '저장'}
          </button>
        </div>
      </form>
    </div>
  )
}
