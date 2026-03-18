import { Link } from 'react-router-dom'
import SubPageLayout from '@/components/SubPageLayout'
import thumDe from '@/assets/images/thum_2_de.png'

const lnbItems = [
  { label: '소식', to: '/news' },
  { label: '사업보고', to: '/report' },
]

export default function NewsDetailPage() {
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
            <div className="viewTitle">
              <h3>2023년 멘토, 멘티 전체 만남의 날</h3>
              <div className="datetime">
                <ul>
                  <li>관리자</li>
                  <li>2024.10.14</li>
                </ul>
              </div>
            </div>
            <div className="viewcon">
              <div className="center">
                <div className="img"><img src={thumDe} alt="2023년 멘토, 멘티 전체 만남의 날" /></div>
                <p>
                  2023년도 멘토,멘티 전체 만남의 날 : 2023년 8월 21일 두번째로 모두 모여서 그 동안의 안부도 전하고,<br />
                  진로나 학업의 어려움에 대한 내용을 공유하였습니다
                </p>
              </div>
            </div>
            <div className="viewFile">
              <ul>
                <li><a href="#!" className="download">첨부파일 001_jpg</a></li>
                <li><a href="#!" className="download">첨부파일 002_jpg</a></li>
              </ul>
            </div>
            <div className="btnWrap">
              <Link to="/news">목록가기</Link>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
