// src/pages/HomePage.tsx
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getBoards } from '@/api/board'
import type { Board } from '@/api/board'

export default function HomePage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['boards'],
    queryFn: () => getBoards().then(res => {
      const raw = res.data
      if (Array.isArray(raw)) return raw
      if (typeof raw === 'string') { try { return JSON.parse(raw) } catch { return [] } }
      if (raw && typeof raw === 'object') {
        const found = Object.values(raw).find(v => Array.isArray(v))
        if (found) return found as Board[]
      }
      return []
    }),
  })

  if (isLoading) return <p className="p-8 text-gray-400">불러오는 중...</p>
  if (isError) return <p className="p-8 text-red-500">{String(error)}</p>

  const boards = data ?? []

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
    </div>
  )
}