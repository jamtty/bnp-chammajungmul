import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import SubPageLayout from '@/components/SubPageLayout'
import { fetchNewsDetail, type NewsDetailResponse } from '@/api/news'
import { useAuthStore } from '@/store/useAuthStore'

const lnbItems = [
  { label: '소식', to: '/news' },
  { label: '사업보고', to: '/report' },
]

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isAdmin = useAuthStore(s => s.isAuthenticated)
  const [result, setResult] = useState<NewsDetailResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const numId = Number(id)
    if (!numId) {
      navigate('/news', { replace: true })
      return
    }

    const today = new Date().toISOString().slice(0, 10)
    const storageKey = `viewed_news_${numId}_${today}`
    const alreadyViewed = Boolean(localStorage.getItem(storageKey))
    const skipCount = isAdmin || alreadyViewed
    if (!skipCount) localStorage.setItem(storageKey, '1')

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchNewsDetail(numId, skipCount)
      .then(res => { if (!cancelled) setResult(res) })
      .catch(err => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [id])

  return (
    <SubPageLayout
      visualClass="vs4"
      visualTitle="재단소식"
      contentsClass="nav sub04_1"
      lnbItems={lnbItems}
    >
      <div className="titWrap">
        <h2>소식</h2>
        <p className="description">참마중물재단의 소식 입니다.</p>
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
                      dangerouslySetInnerHTML={{ __html: item.content.replace(/<table/gi, '<div class="table-scroll-wrap"><table').replace(/<\/table>/gi, '</table></div>') }}
                    />
                  </div>
                  <div className="viewFile">
                    {files.length > 0 && (
                      <ul>
                        {files.map(file => (
                          <li key={file.id}>
                            <a href={file.file_url} className="download" download={file.ori_name}>
                              {file.ori_name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="btnWrap">
                    <Link to="/news">목록가기</Link>
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
