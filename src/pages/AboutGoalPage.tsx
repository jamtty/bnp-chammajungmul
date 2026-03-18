import SubPageLayout from '@/components/SubPageLayout'
import subConImg from '@/assets/images/sub01_con_img.png'
import mSubConImg from '@/assets/images/m_sub01_con_img.png'

const lnbItems = [
  { label: '목표', to: '/about/goal' },
  { label: '인사말', to: '/about/greeting' },
  { label: '이사회', to: '/about/board' },
  { label: '연혁', to: '/about/history' },
  { label: '오시는 길', to: '/about/location' },
]

export default function AboutGoalPage() {
  return (
    <SubPageLayout
      visualClass="vs1"
      visualTitle="재단소개"
      contentsClass="nav sub01_1"
      lnbItems={lnbItems}
    >
      <div className="titWrap">
        <h2>목표</h2>
        <p className="description">참마중물재단의 목표입니다.</p>
      </div>
      <div className="conImg device_pc">
        <img src={subConImg} alt="목표 컨텐츠 이미지" />
      </div>
      <div className="conImg device_mo">
        <img src={mSubConImg} alt="목표 컨텐츠 이미지" />
      </div>
    </SubPageLayout>
  )
}
