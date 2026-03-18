import { Link } from 'react-router-dom'
import SubPageLayout from '@/components/SubPageLayout'

const lnbItems = [
  { label: '소식', to: '/news' },
  { label: '사업보고', to: '/report' },
]

export default function ReportDetailPage() {
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
          <div className="tblWrap">
            <div className="viewTitle">
              <h3>2024년 상반기 결산 보고</h3>
              <div className="datetime">
                <ul>
                  <li>관리자</li>
                  <li>2024.10.14</li>
                </ul>
              </div>
            </div>
            <div className="viewcon">
              <p>2024년 상반기 결산 보고 자료 입니다.</p>
            </div>
            <div className="viewFile">
              <ul>
                <li><a href="#!" className="download">첨부파일 001_jpg</a></li>
                <li><a href="#!" className="download">첨부파일 002_jpg</a></li>
              </ul>
            </div>
            <div className="btnWrap">
              <Link to="/report">목록가기</Link>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
