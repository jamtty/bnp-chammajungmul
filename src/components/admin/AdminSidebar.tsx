import { Link, useLocation } from 'react-router-dom'

export const sideMenuItems = [
  { label: '대시보드', to: '/admin' },
  { label: '소식 관리', to: '/admin/news' },
  { label: '사업보고 관리', to: '/admin/report' },
  { label: '공지사항 관리', to: '/admin/notice' },
]

export default function AdminSidebar() {
  const location = useLocation()

  return (
    <aside className="adm_sidebar">
      <div className="adm_logo">
        <Link to="/">참마중물재단</Link>
      </div>
      <nav className="adm_nav">
        <ul>
          {sideMenuItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={location.pathname === item.to ? 'active' : ''}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
