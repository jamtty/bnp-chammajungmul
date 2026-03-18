import SubPageLayout from '@/components/SubPageLayout'

const lnbItems = [
  { label: '목표', to: '/about/goal' },
  { label: '인사말', to: '/about/greeting' },
  { label: '이사회', to: '/about/board' },
  { label: '연혁', to: '/about/history' },
  { label: '오시는 길', to: '/about/location' },
]

export default function AboutBoardPage() {
  return (
    <SubPageLayout
      visualClass="vs1"
      visualTitle="재단소개"
      contentsClass="nav sub01_3"
      lnbItems={lnbItems}
    >
      <div className="titWrap">
        <h2>이사회</h2>
        <p className="description">참마중물재단의 이사회 입니다.</p>
      </div>
      <div className="inner">
        <div className="boardWrap">
          <div className="tblWrap">
            <table className="tbl_contents">
              <caption>이사회 목록</caption>
              <colgroup>
                <col width="280" />
                <col width="520" />
                <col width="520" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">직위</th>
                  <th scope="col">성명</th>
                  <th scope="col">소속</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>이사장</td>
                  <td>장순영</td>
                  <td>(재)참마중물재단</td>
                </tr>
                <tr>
                  <td rowSpan={4}>이사</td>
                  <td>최재혁</td>
                  <td>前 마이다스에셋 CIO</td>
                </tr>
                <tr>
                  <td>박광수</td>
                  <td>現 동의대학교 상경대학 교수</td>
                </tr>
                <tr>
                  <td>허필석</td>
                  <td>現 KB증권 전무</td>
                </tr>
                <tr>
                  <td>김상환</td>
                  <td>現 파로스젠 CSO</td>
                </tr>
                <tr>
                  <td>감사</td>
                  <td>신정희</td>
                  <td>現 마이다스에셋 대표</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
