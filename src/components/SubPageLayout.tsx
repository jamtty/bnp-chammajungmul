import { Link, useLocation } from 'react-router-dom'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

interface LnbItem {
  label: string
  to: string
}

interface SubPageLayoutProps {
  visualClass: string       // 'vs1' | 'vs2' | 'vs3' | 'vs4' | 'vs5'
  visualTitle: string       // 비주얼 영역 제목
  contentsClass: string     // 'nav sub01_1' 등
  lnbItems?: LnbItem[]
  children: React.ReactNode
}

export default function SubPageLayout({
  visualClass,
  visualTitle,
  contentsClass,
  lnbItems,
  children,
}: SubPageLayoutProps) {
  const { pathname } = useLocation()

  return (
    <>
      <ul className="skip_nav">
        <li><a href="#container">본문 바로가기</a></li>
        <li><a href="#menu">주메뉴 바로가기</a></li>
      </ul>
      <SiteHeader />
      <div id="container" className="sub_container">
        <div className={`visual ${visualClass}`}>
          <div className="inner">
            <h1>{visualTitle}</h1>
          </div>
        </div>
        {lnbItems && lnbItems.length > 0 && (
          <div className="lnb">
            <ul>
              {lnbItems.map(item => (
                <li key={item.to} className={pathname === item.to ? 'active' : ''}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={`contents ${contentsClass}`}>
          {children}
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
