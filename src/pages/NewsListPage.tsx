import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SubPageLayout from '@/components/SubPageLayout'
import { fetchNewsList, type NewsItem } from '@/api/news'

const PAGE_SIZE = 12

export default function NewsListPage() {
  const location = useLocation()
  const [items, setItems] = useState<NewsItem[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const keywordRef = useRef<HTMLInputElement>(null)
  const typeRef = useRef<HTMLSelectElement>(null)
  const [searchParams, setSearchParams] = useState<{ keyword: string; type: number }>({ keyword: '', type: -1 })

  // 헤더 메뉴 클릭 시 검색 초기화
  useEffect(() => {
    if ((location.state as { resetSearch?: boolean } | null)?.resetSearch) {
      setPage(1)
      setSearchParams({ keyword: '', type: -1 })
      if (keywordRef.current) keywordRef.current.value = ''
      if (typeRef.current) typeRef.current.value = '-1'
    }
  }, [location.key])

  const lnbItems = [
    {
      label: '소식',
      to: '/news',
      onClick: () => {
        setPage(1)
        setSearchParams({ keyword: '', type: -1 })
        if (keywordRef.current) keywordRef.current.value = ''
        if (typeRef.current) typeRef.current.value = '-1'
      },
    },
    { label: '사업보고', to: '/report' },
  ]

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchNewsList({
      page,
      size: PAGE_SIZE,
      keyword: searchParams.keyword || undefined,
      type: searchParams.keyword ? searchParams.type : undefined,
    })
      .then(res => {
        if (cancelled) return
        setItems(res.items)
        setTotalCount(res.totalCount)
        setTotalPages(res.totalPages)
      })
      .catch(err => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [page, searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    setSearchParams({
      keyword: keywordRef.current?.value.trim() ?? '',
      type: typeRef.current ? parseInt(typeRef.current.value) : -1,
    })
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

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
      <div className="boardWrap pb0">
        <div className="search">
          <div className="total">총 <strong>{totalCount}</strong>건</div>
          <div className="sch">
            <form onSubmit={handleSearch}>
              <fieldset>
                <legend>소식 검색</legend>
                <select ref={typeRef} name="type">
                  <option value="-1">전체</option>
                  <option value="0">제목</option>
                  <option value="1">내용</option>
                  <option value="2">제목+내용</option>
                </select>
                <div className="d-flex">
                  <input ref={keywordRef} type="text" name="keyword" placeholder="검색어를 입력하세요." />
                  <button type="submit">검색</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <div className="conBg">
        <div className="inner">
          <div className="tblWrap">
            {loading && <p className="loading">불러오는 중...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && items.length === 0 && (
              <p className="no-data">자료가 없습니다.</p>
            )}
            {!loading && items.length > 0 && (
              <ul className="gallery_list">
                {items.map(item => (
                  <li key={item.id}>
                    <Link to={`/news/${item.id}`}>
                      {item.thumb_url ? (
                        <div className="thumb">
                          <img src={item.thumb_url} alt={item.title} />
                        </div>
                      ) : (
                        <div className="thumb noImg">NO IMAGE</div>
                      )}
                      <div className="txtWrap">
                        <p className="subject">{item.title}</p>
                        <p className="datetime">{item.created_at}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {totalPages > 1 && (
              <div className="pagingWrap">
                <ul>
                  <li>
                    <button className="btn_paging_start" aria-label="처음" onClick={() => setPage(1)} disabled={page === 1} />
                  </li>
                  <li>
                    <button className="btn_paging_prev" aria-label="이전" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} />
                  </li>
                  {pageNumbers.map(n => (
                    <li key={n}>
                      <button className={`btn_paging${page === n ? ' active' : ''}`} onClick={() => setPage(n)}>
                        {n}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button className="btn_paging_next" aria-label="다음" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} />
                  </li>
                  <li>
                    <button className="btn_paging_end" aria-label="마지막" onClick={() => setPage(totalPages)} disabled={page === totalPages} />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
