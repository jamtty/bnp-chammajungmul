import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar, { sideMenuItems } from '@/components/admin/AdminSidebar'
import { fetchNewsList } from '@/api/news'
import { fetchReportList } from '@/api/report'
import { fetchNoticeList } from '@/api/notice'
import '@/assets/css/style.css'

interface Stats {
  news: number
  report: number
  notice: number
}

export default function AdminMainPage() {
  const location = useLocation()
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

  const pageTitle = sideMenuItems.find((m) => m.to === location.pathname)?.label ?? '대시보드'

  return (
    <div className="adm_wrap">
      <AdminSidebar />

      {/* 콘텐츠 영역 */}
      <div className="adm_content">
        {/* 상단 헤더 */}
        <AdminHeader pageTitle={pageTitle} />

        {/* 본문 */}
        <main className="adm_main">
          {/* 콘텐츠 현황 */}
          <section className="adm_section">
            <h3 className="adm_section_title">콘텐츠 현황</h3>
            <div className="adm_stats">
              {[
                { label: '소식', count: stats.news },
                { label: '사업보고', count: stats.report },
                { label: '공지사항', count: stats.notice },
              ].map((item) => (
                <div key={item.label} className="adm_stat_card">
                  <p className="adm_stat_label">{item.label}</p>
                  <p className="adm_stat_count">{statsLoading ? '-' : item.count.toLocaleString()}</p>
                  <p className="adm_stat_unit">건</p>
                </div>
              ))}
            </div>
          </section>

          {/* 바로가기 */}
          <section className="adm_section">
            <h3 className="adm_section_title">바로가기</h3>
            <div className="adm_shortcuts">
              <Link to="/news" className="adm_shortcut_card">
                <span className="adm_shortcut_icon">📰</span>
                <span className="adm_shortcut_label">소식 관리</span>
              </Link>
              <Link to="/report" className="adm_shortcut_card">
                <span className="adm_shortcut_icon">📋</span>
                <span className="adm_shortcut_label">사업보고 관리</span>
              </Link>
              <Link to="/notice" className="adm_shortcut_card">
                <span className="adm_shortcut_icon">📢</span>
                <span className="adm_shortcut_label">공지사항 관리</span>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

