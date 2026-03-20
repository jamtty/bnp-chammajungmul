import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { loginAdmin } from '@/api/auth'
import '@/assets/css/style.css'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const { isAuthenticated, setAuth } = useAuthStore()

  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await loginAdmin(id, pw)
      setAuth(
        { id: result.user.id, email: id, name: result.user.name, role: 'ADMIN', createdAt: new Date().toISOString() },
        result.token,
      )
      navigate('/admin', { replace: true })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '로그인에 실패했습니다.'
      alert(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin_login_wrap">
      <div className="admin_login_box">
        <h1 className="admin_login_title">로그인</h1>

        <form onSubmit={handleSubmit}>
          <div className="admin_login_field">
            <label htmlFor="admin_id">아이디</label>
            <div className="input_wrap">
              <input
                id="admin_id"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="아이디를 입력하세요."
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className="admin_login_field">
            <label htmlFor="admin_pw">비밀번호</label>
            <div className="input_wrap">
              <input
                id="admin_pw"
                type={showPw ? 'text' : 'password'}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="비밀번호를 입력하세요."
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="btn_pw_toggle"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
              >
                {showPw ? (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button type="submit" className="btn_admin_login" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  )
}

