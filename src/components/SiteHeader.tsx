import { useState } from 'react'
import { Link } from 'react-router-dom'

const navItems = [
  {
    label: '재단소개',
    subs: [
      { label: '목표', to: '/about/goal' },
      { label: '인사말', to: '/about/greeting' },
      { label: '이사회', to: '/about/board' },
      { label: '연혁', to: '/about/history' },
      { label: '오시는 길', to: '/about/location' },
    ],
  },
  {
    label: '사업안내',
    subs: [
      { label: '취약계층 청년 지원', to: '/business/youth' },
      { label: '대학생 학업 및 취업 지원', to: '/business/student' },
    ],
  },
  {
    label: '멘토링',
    subs: [{ label: '멘토링', to: '/mentoring' }],
  },
  {
    label: '재단소식',
    subs: [
      { label: '소식', to: '/news' },
      { label: '사업보고', to: '/report' },
    ],
  },
  {
    label: '공지사항',
    subs: [{ label: '공지사항', to: '/notice' }],
  },
]

export default function SiteHeader() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null)

  const toggleSubmenu = (index: number) => {
    setOpenSubmenu(prev => (prev === index ? null : index))
  }

  return (
    <>
      {/* 헤더 */}
      <div className={`header${isDropdownVisible ? ' active' : ''}`}>
        <div className="inner">
          <Link to="/" className="logo" aria-label="메인으로">
            재단법인 참마중물
          </Link>
          <ul
            id="menu"
            className="gnb"
            onMouseEnter={() => setIsDropdownVisible(true)}
          >
            {navItems.map(item => (
              <li key={item.label}>
                <Link to={item.subs[0].to} state={{ resetSearch: true }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="btn_mobile_menu"
            aria-label="모바일 메뉴"
            onClick={() => setIsMobileOpen(true)}
          />
        </div>
      </div>

      {/* 풀다운 드롭다운 메뉴 */}
      <div
        className="totalmenu"
        style={{ display: isDropdownVisible ? 'block' : 'none' }}
        onMouseLeave={() => setIsDropdownVisible(false)}
      >
        <div className="inner">
          <ul>
            {navItems.map(item => (
              <li key={item.label}>
                {item.subs.map(sub => (
                  <Link key={sub.to} to={sub.to} state={{ resetSearch: true }} onClick={() => setIsDropdownVisible(false)}>
                    {sub.label}
                  </Link>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <div
        className="mobileMenu"
        style={{ display: isMobileOpen ? 'block' : 'none' }}
        aria-label="모바일 메뉴 팝업"
      >
        <h2>재단법인 참마중물</h2>
        <button
          type="button"
          className="btn_mobile_menu_close"
          aria-label="모바일 메뉴 닫기"
          onClick={() => {
            setIsMobileOpen(false)
            setOpenSubmenu(null)
          }}
        />
        <ul>
          {navItems.map((item, index) => (
            <li key={item.label}>
              <button
                type="button"
                className="btn_submenu"
                onClick={() => toggleSubmenu(index)}
              >
                {item.label}
              </button>
              <div
                className="submenu"
                style={{ display: openSubmenu === index ? 'block' : 'none' }}
                aria-label={`${item.label} 서브메뉴`}
              >
                {item.subs.map(sub => (
                  <Link key={sub.to} to={sub.to} state={{ resetSearch: true }} onClick={() => setIsMobileOpen(false)}>
                    {sub.label}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
