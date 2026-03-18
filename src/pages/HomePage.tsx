// src/pages/HomePage.tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getBoards } from '@/api/board'
import type { Board } from '@/api/board'

export default function HomePage() {
  const [page, setPage] = useState(1)
  const [boards, setBoards] = useState<Board[]>([])
  const [hasMore, setHasMore] = useState(true)

  const { isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['boards', page],
    queryFn: () => getBoards(page, 3).then(res => {
      const result = res.data
      setBoards(prev => page === 1 ? result.data : [...prev, ...result.data])
      setHasMore(result.hasMore)
      return result
    }),
  })

  if (isLoading && page === 1) return <p className="p-8 text-gray-400">불러오는 중...</p>
  if (isError) return <p className="p-8 text-red-500">{String(error)}</p>

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end mb-3">
        <Link to="/board/write" className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
          글쓰기
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded">
        <thead className="bg-gray-100 text-sm text-gray-700">
          <tr>
            <th className="px-4 py-3 border-b text-center w-12">No</th>
            <th className="px-4 py-3 border-b text-left">아이디</th>
            <th className="px-4 py-3 border-b text-left">작성자</th>
            <th className="px-4 py-3 border-b text-left">제목</th>
            <th className="px-4 py-3 border-b text-left">내용</th>
            <th className="px-4 py-3 border-b text-center w-40">작성일</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800 divide-y divide-gray-100">
          {boards.map((item: Board) => (
            <tr key={item.no} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-center">{item.no}</td>
              <td className="px-4 py-3">{item.mb_id}</td>
              <td className="px-4 py-3">{item.mb_name}</td>
              <td className="px-4 py-3">
                <Link to={`/board/${item.no}`} className="hover:text-blue-600 hover:underline">
                  {item.bo_subject}
                </Link>
                {!!item.comment_count && (
                  <span className="ml-1 text-xs text-red-500 font-bold">[{item.comment_count}]</span>
                )}
              </td>
              <td className="px-4 py-3 max-w-xs truncate">{item.bo_content}</td>
              <td className="px-4 py-3 text-center text-gray-500">{item.bo_time}</td>
            </tr>
          ))}
          {boards.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {hasMore && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={isFetching}
            className="px-6 py-2 text-sm bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            {isFetching ? '불러오는 중...' : '더보기'}
          </button>
        </div>
      )}
    </div>
  )
}