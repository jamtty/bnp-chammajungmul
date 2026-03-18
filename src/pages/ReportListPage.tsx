import { Link } from 'react-router-dom'
import SubPageLayout from '@/components/SubPageLayout'

const lnbItems = [
  { label: '소식', to: '/news' },
  { label: '사업보고', to: '/report' },
]

const reportList = Array.from({ length: 10 }, (_, i) => ({
  no: 10 - i,
  subject: '2024년 결산 감사 보고',
  author: '관리자',
  date: '2024.10.14',
}))

export default function ReportListPage() {
  return (
    <SubPageLayout
      visualClass="vs4"
      visualTitle="재단소식"
      contentsClass="nav sub04_2"
      lnbItems={lnbItems}
    >
      <div className="titWrap">
        <h2>사업보고</h2>
        <p className="description">참마중물재단의 사업보고 입니다.</p>
      </div>
      <div className="inner">
        <div className="boardWrap">
          <div className="search">
            <div className="total">전체 {reportList.length}건</div>
            <div className="sch">
              <form onSubmit={e => e.preventDefault()}>
                <fieldset>
                  <legend>사업보고 검색</legend>
                  <select name="type">
                    <option value="">전체</option>
                    <option value="0">제목</option>
                    <option value="1">내용</option>
                    <option value="2">제목+내용</option>
                  </select>
                  <div className="d-flex">
                    <input type="text" name="keyword" placeholder="검색어를 입력하세요." />
                    <button type="submit">검색</button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
          <div className="tblWrap device_pc">
            <table className="tbl_basic">
              <caption>사업보고 목록</caption>
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
                {reportList.map(item => (
                  <tr key={item.no}>
                    <td>{item.no}</td>
                    <td className="subject">
                      <Link to={`/report/${item.no}`}>{item.subject}</Link>
                    </td>
                    <td>{item.author}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagingWrap">
              <ul>
                <li><a href="#!" className="btn_paging_start" aria-label="처음" /></li>
                <li><a href="#!" className="btn_paging_prev" aria-label="이전" /></li>
                <li><a href="#!" className="btn_paging active">1</a></li>
                <li><a href="#!" className="btn_paging_next" aria-label="다음" /></li>
                <li><a href="#!" className="btn_paging_end" aria-label="마지막" /></li>
              </ul>
            </div>
          </div>
          <div className="tblWrap device_mo">
            <table className="tbl_basic">
              <caption>사업보고 목록</caption>
              <colgroup>
                <col width="60" />
                <col />
              </colgroup>
              <tbody>
                {reportList.map(item => (
                  <tr key={item.no}>
                    <td>{item.no}</td>
                    <td className="subject">
                      <Link to={`/report/${item.no}`}>{item.subject}</Link>
                      <span className="date">{item.date}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagingWrap">
              <ul>
                <li><a href="#!" className="btn_paging_start" aria-label="처음" /></li>
                <li><a href="#!" className="btn_paging_prev" aria-label="이전" /></li>
                <li><a href="#!" className="btn_paging active">1</a></li>
                <li><a href="#!" className="btn_paging_next" aria-label="다음" /></li>
                <li><a href="#!" className="btn_paging_end" aria-label="마지막" /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
