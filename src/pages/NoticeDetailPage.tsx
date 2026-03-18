import { Link, useParams } from 'react-router-dom'
import SubPageLayout from '@/components/SubPageLayout'

export default function NoticeDetailPage() {
  useParams<{ no: string }>()

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
          <div className="tblWrap device_pc">
            <div className="viewTitle">
              <h3>[안내] 2025년도 학업장려금 및 창업지원금 안내</h3>
              <div className="datetime">
                <ul>
                  <li>관리자</li>
                  <li>2024.10.14</li>
                </ul>
              </div>
            </div>
            <div className="viewcon">
              <p>
                1. 2025년도 학업장려금 및 창업지원금 안내 : 아래와 같이 모집 및 선발 예정입니다(구체적인 일정은 2024년 12월에 재단 홈페이지 공고 예정)
              </p>
              <br /><br />
              <table className="tbl_info">
                <caption>2025년도 학업장려금 및 창업지원금 안내 표</caption>
                <thead>
                  <tr>
                    <th scope="col">구분</th>
                    <th scope="col">시행시기</th>
                    <th scope="col">구체적 사업내용</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>모집 및 선발</td>
                    <td>2025.01.01 ~ 01.31</td>
                    <td>
                      1. 재단법인 홈페이지를 통하여 학업장려금 및 창업지원금 각각 모집<br />
                      2. 예산에 맞게 심사 및 선발하여 진행(사업별 10명 이내)<br />
                      3. 모집 및 선발 기준 : 국내 대학 재학중인 자, 생활 및 학비 조달이 어려운 자, 창업 리더로서 자질과 역량을 가진 자
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="info">※ 모집 및 선발 사업내용은 상황에 따라 일부 변경될 수 있습니다.</p>
            </div>
            <div className="viewFile">
              <ul>
                <li><a href="#!" className="download">첨부파일 001_jpg</a></li>
                <li><a href="#!" className="download">첨부파일 002_jpg</a></li>
              </ul>
            </div>
            <div className="btnWrap">
              <Link to="/notice">목록가기</Link>
            </div>
          </div>

          <div className="tblWrap device_mo">
            <div className="viewTitle">
              <h3>[안내] 2025년도 학업장려금 및 창업지원금 안내</h3>
              <div className="datetime">
                <ul>
                  <li>관리자</li>
                  <li>2024.10.14</li>
                </ul>
              </div>
            </div>
            <div className="viewcon">
              <p>
                1. 2025년도 학업장려금 및 창업지원금 안내 : 아래와 같이 모집 및 선발 예정입니다(구체적인 일정은 2024년 12월에 재단 홈페이지 공고 예정)
              </p>
              <br /><br />
              <table className="tbl_info">
                <caption>2025년도 학업장려금 및 창업지원금 안내 표 (모바일)</caption>
                <tbody>
                  <tr><th scope="row">구분</th></tr>
                  <tr><td className="text-center">모집 및 선발</td></tr>
                  <tr><th scope="row">시행시기</th></tr>
                  <tr><td className="text-center">2025.01.01 ~ 01.31</td></tr>
                  <tr><th scope="row">구체적 사업내용</th></tr>
                  <tr>
                    <td>
                      1. 재단법인 홈페이지를 통하여 학업장려금 및 창업지원금 각각 모집<br />
                      2. 예산에 맞게 심사 및 선발하여 진행(사업별 10명 이내)<br />
                      3. 모집 및 선발 기준 : 국내 대학 재학중인 자, 생활 및 학비 조달이 어려운 자, 창업 리더로서 자질과 역량을 가진 자
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="info">※ 모집 및 선발 사업내용은 상황에 따라<span className="device_mo" /> 일부 변경될 수 있습니다.</p>
            </div>
            <div className="viewFile">
              <ul>
                <li><a href="#!" className="download">첨부파일 001_jpg</a></li>
                <li><a href="#!" className="download">첨부파일 002_jpg</a></li>
              </ul>
            </div>
            <div className="btnWrap">
              <Link to="/notice">목록가기</Link>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
