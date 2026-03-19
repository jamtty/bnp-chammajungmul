import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SubPageLayout from '@/components/SubPageLayout'
import { fetchNoticeList, type NoticeItem } from '@/api/notice'

const PAGE_SIZE = 10

export default function NoticeListPage() {
  const location = useLocation()
  const [items, setItems] = useState<NoticeItem[]>([])
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

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchNoticeList({
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
      visualClass="vs5"
      visualTitle="공지사항"
      contentsClass="sub05_1"
    >
      <div className="titWrap">
        <h2>공지사항</h2>
        <p className="description">참마중물재단의 공지사항 입니다.</p>
      </div>
      <div className="inner">
        <div className="boardWrap">
          <div className="search">
            <div className="total">전체 <strong>{totalCount}</strong>건</div>
            <div className="sch">
              <form onSubmit={handleSearch}>
                <fieldset>
                  <legend>공지사항 검색</legend>
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
          {loading && <p className="loading">불러오는 중...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && items.length === 0 && (
            <p className="no-data">자료가 없습니다.</p>
          )}
          {!loading && items.length > 0 && (
            <>
              <div className="tblWrap device_pc">
                <table className="tbl_basic">
                  <caption>공지사항 목록</caption>
                  <colgroup>
                    <col width="80" />
                    <col />
                    <col width="150" />
                    <col width="150" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">번호</th>
                      <th scope="col">제목</th>
                      <th scope="col">작성자</th>
                      <th scope="col">작성일자</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={item.id}>
                        <td>{totalCount - (page - 1) * PAGE_SIZE - idx}</td>
                        <td className="subject">
                          <Link to={`/notice/${item.id}`}>{item.title}</Link>
                        </td>
                        <td>{item.author_name}</td>
                        <td>{item.created_at}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="tblWrap device_mo">
                <table className="tbl_basic">
                  <caption>공지사항 목록</caption>
                  <colgroup>
                    <col width="60" />
                    <col />
                  </colgroup>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={item.id}>
                        <td>{totalCount - (page - 1) * PAGE_SIZE - idx}</td>
                        <td className="subject">
                          <Link to={`/notice/${item.id}`}>{item.title}</Link>
                          <span className="date">{item.created_at}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && (
                <div className="pagingWrap">
                  <ul>
                    <li>
                      <button className="btn_paging_start" aria-label="첫음" onClick={() => setPage(1)} disabled={page === 1} />
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
            </>
          )}
        </div>
      </div>
    </SubPageLayout>
  )
}
