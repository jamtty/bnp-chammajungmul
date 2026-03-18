import SubPageLayout from '@/components/SubPageLayout'
import historyImg from '@/assets/images/sub01_4_img.png'

const lnbItems = [
  { label: '목표', to: '/about/goal' },
  { label: '인사말', to: '/about/greeting' },
  { label: '이사회', to: '/about/board' },
  { label: '연혁', to: '/about/history' },
  { label: '오시는 길', to: '/about/location' },
]

export default function AboutHistoryPage() {
  return (
    <SubPageLayout
      visualClass="vs1"
      visualTitle="재단소개"
      contentsClass="nav sub01_4"
      lnbItems={lnbItems}
    >
      <div className="titWrap">
        <h2>연혁</h2>
        <p className="description">참마중물재단의 연혁입니다.</p>
      </div>
      <div className="inner">
        <div className="conWrap">
          <div className="txtArea">
            <p className="des">foundation</p>
            <p className="tit">history</p>
            <ul className="history">
              <li><strong>2024.07</strong> <span>재단 설립 등기</span></li>
              <li><strong>2024.06</strong> <span>재단 설립 허가<br />(서울시 미래 청년 기획단)</span></li>
            </ul>
          </div>
          <div className="imgArea">
            <img src={historyImg} alt="연혁 이미지" />
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
