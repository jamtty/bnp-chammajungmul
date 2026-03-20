import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'

interface Props {
  pageTitle: string
}

export default function AdminHeader({ pageTitle }: Props) {
  const { user, clearAuth } = useAuthStore()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="adm_header">
      <h2 className="adm_page_title">{pageTitle}</h2>
      <div className="adm_user" ref={dropdownRef}>
        <button className="adm_user_btn" onClick={() => setDropdownOpen((v) => !v)}>
          {user?.name ?? '관리자'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {dropdownOpen && (
          <ul className="adm_dropdown">
            <li><Link to="/admin/mypage" onClick={() => setDropdownOpen(false)}>마이페이지</Link></li>
            <li><button onClick={() => { clearAuth(); setDropdownOpen(false) }}>로그아웃</button></li>
          </ul>
        )}
      </div>
    </header>
  )
}
