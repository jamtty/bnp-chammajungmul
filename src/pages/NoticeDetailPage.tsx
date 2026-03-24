import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import SubPageLayout from '@/components/SubPageLayout'
import { fetchNoticeDetail, type NoticeDetailResponse } from '@/api/notice'
import { useAuthStore } from '@/store/useAuthStore'
import { toAbsUrl, resolveContentUrls } from '@/utils/uploadUrl'

export default function NoticeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isAdmin = useAuthStore(s => s.isAuthenticated)
  const [result, setResult] = useState<NoticeDetailResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const numId = Number(id)
    if (!numId) {
      navigate('/notice', { replace: true })
      return
    }

    const today = new Date().toISOString().slice(0, 10)
    const storageKey = `viewed_notice_${numId}_${today}`
    const alreadyViewed = Boolean(localStorage.getItem(storageKey))
    const skipCount = isAdmin || alreadyViewed
    if (!skipCount) localStorage.setItem(storageKey, '1')

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchNoticeDetail(numId, skipCount)
      .then(res => { if (!cancelled) setResult(res) })
      .catch(err => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [id])

  return (
    <SubPageLayout
      visualClass="vs5"
      visualTitle="공지사항"
      contentsClass="sub05_1"
    >
      <div className="titWrap mb80">
        <h2>공지사항</h2>
        <p className="description">참마중물재단의 공지사항 입니다.</p>
      </div>
      <div className="inner">
        <div className="boardWrap">
          <div className="tblWrap">
            {loading && <p className="loading">불러오는 중...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && result && (() => {
              const { item, files } = result
              return (
                <>
                  <div className="viewTitle">
                    <h3>{item.title}</h3>
                    <div className="datetime">
                      <ul>
                        <li>{item.author_name}</li>
                        <li>{item.created_at}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="viewcon">
                    <div
                      className="tiptap-content"
                      dangerouslySetInnerHTML={{ __html: resolveContentUrls(item.content).replace(/<table/gi, '<div class="table-scroll-wrap"><table').replace(/<\/table>/gi, '</table></div>') }}
                    />
                  </div>
                  <div className="viewFile">
                    {files.length > 0 && (
                      <ul>
                        {files.map(file => (
                          <li key={file.id}>
                            <a href={toAbsUrl(file.file_url)} className="download" download={file.ori_name}>
                              {file.ori_name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="btnWrap">
                    <Link to="/notice">목록가기</Link>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
