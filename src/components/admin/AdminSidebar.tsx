import { Link, useLocation } from 'react-router-dom'

export const sideMenuItems = [
  { label: '대시보드', to: '/admin', icon: 'dashboard' },
  { label: '소식 관리', to: '/admin/news', icon: 'newspaper' },
  { label: '사업보고 관리', to: '/admin/report', icon: 'description' },
  { label: '공지사항 관리', to: '/admin/notice', icon: 'campaign' },
]

export default function AdminSidebar() {
  const location = useLocation()

  return (
    <aside className="adm_sidebar">
      <div className="adm_logo">
        <Link to="/" target="_blank" rel="noopener noreferrer">참마중물재단</Link>
      </div>
      <nav className="adm_nav">
        <ul>
          {sideMenuItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={
                  item.to === '/admin'
                    ? location.pathname === '/admin' ? 'active' : ''
                    : location.pathname.startsWith(item.to) ? 'active' : ''
                }
              >
                <span className="material-icons">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
