import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { fetchNewsList } from '@/api/news'
import { fetchReportList } from '@/api/report'
import { fetchNoticeList } from '@/api/notice'

interface Stats {
  news: number
  report: number
  notice: number
}

const menuItems = [
  {
    label: '소식 관리',
    desc: '재단 소식 목록 확인',
    to: '/news',
    icon: '📰',
    color: 'bg-blue-50 border-blue-200',
    labelColor: 'text-blue-700',
  },
  {
    label: '사업보고 관리',
    desc: '사업보고 목록 확인',
    to: '/report',
    icon: '📋',
    color: 'bg-green-50 border-green-200',
    labelColor: 'text-green-700',
  },
  {
    label: '공지사항 관리',
    desc: '공지사항 목록 확인',
    to: '/notice',
    icon: '📢',
    color: 'bg-yellow-50 border-yellow-200',
    labelColor: 'text-yellow-700',
  },
]

export default function AdminMainPage() {
  const { user, clearAuth } = useAuthStore()
  const [stats, setStats] = useState<Stats>({ news: 0, report: 0, notice: 0 })
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    Promise.allSettled([
      fetchNewsList({ page: 1, size: 1 }),
      fetchReportList({ page: 1, size: 1 }),
      fetchNoticeList({ page: 1, size: 1 }),
    ]).then(([news, report, notice]) => {
      setStats({
        news: news.status === 'fulfilled' ? news.value.totalCount : 0,
        report: report.status === 'fulfilled' ? report.value.totalCount : 0,
        notice: notice.status === 'fulfilled' ? notice.value.totalCount : 0,
      })
      setStatsLoading(false)
    })
  }, [])

  const handleLogout = () => {
    clearAuth()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-800">참마중물재단 관리자</h1>
            <p className="text-xs text-gray-500 mt-0.5">{user?.name} 님 환영합니다</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              사이트로 이동 →
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* 본문 */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* 통계 카드 */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            콘텐츠 현황
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: '소식', count: stats.news, color: 'text-blue-600' },
              { label: '사업보고', count: stats.report, color: 'text-green-600' },
              { label: '공지사항', count: stats.notice, color: 'text-yellow-600' },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                <p className={`text-3xl font-bold ${item.color}`}>
                  {statsLoading ? '...' : item.count.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400 mt-1">건</p>
              </div>
            ))}
          </div>
        </section>

        {/* 바로가기 메뉴 */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            바로가기
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`bg-white rounded-xl border ${item.color} shadow-sm p-6 hover:shadow-md transition-shadow group`}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className={`font-semibold text-sm ${item.labelColor}`}>{item.label}</p>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 안내 */}
        <section className="mt-10 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">관리자 안내</h2>
          <ul className="text-sm text-gray-500 space-y-1.5 list-disc list-inside">
            <li>콘텐츠(소식, 사업보고, 공지사항)는 카페24 관리자 페이지 또는 DB에서 직접 관리합니다.</li>
            <li>사이트 운영 중 문제 발생 시 개발자에게 문의하세요.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
