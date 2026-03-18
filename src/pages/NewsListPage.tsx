import { Link } from 'react-router-dom'
import SubPageLayout from '@/components/SubPageLayout'
import thum1 from '@/assets/images/thum_1.png'
import thum2 from '@/assets/images/thum_2.png'
import thum3 from '@/assets/images/thum_3.png'
import thum4 from '@/assets/images/thum_4.png'

const lnbItems = [
  { label: '소식', to: '/news' },
  { label: '사업보고', to: '/report' },
]

const newsList = [
  { no: 1, img: thum1, subject: '재단 홈페이지 오픈', date: '2024-10-14' },
  { no: 2, img: thum2, subject: '2023년 멘토, 멘티전체 만남의 날', date: '2024-10-14' },
  { no: 3, img: thum3, subject: '2022년 멘토, 멘티 전체 만남의 날', date: '2024-10-14' },
  { no: 4, img: thum1, subject: '재단 홈페이지 오픈', date: '2024-10-14' },
  { no: 5, img: thum2, subject: '재단 홈페이지 오픈', date: '2024-10-14' },
  { no: 6, img: thum4, subject: '재단 홈페이지 오픈', date: '2024-10-14' },
]

export default function NewsListPage() {
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
          <div className="total" />
          <div className="sch">
            <form onSubmit={e => e.preventDefault()}>
              <fieldset>
                <legend>소식 검색</legend>
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
      </div>
      <div className="conBg">
        <div className="inner">
          <div className="tblWrap">
            <ul className="gallery_list">
              {newsList.map(item => (
                <li key={item.no}>
                  <Link to={`/news/${item.no}`}>
                    <div className="thumb"><img src={item.img} alt={item.subject} /></div>
                    <div className="txtWrap">
                      <p className="subject">{item.subject}</p>
                      <p className="datetime">{item.date}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
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
