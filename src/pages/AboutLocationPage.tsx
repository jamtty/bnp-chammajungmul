import SubPageLayout from '@/components/SubPageLayout'
import mapImg from '@/assets/images/map.png'

const lnbItems = [
  { label: '목표', to: '/about/goal' },
  { label: '인사말', to: '/about/greeting' },
  { label: '이사회', to: '/about/board' },
  { label: '연혁', to: '/about/history' },
  { label: '오시는 길', to: '/about/location' },
]

export default function AboutLocationPage() {
  return (
    <SubPageLayout
      visualClass="vs1"
      visualTitle="재단소개"
      contentsClass="nav sub01_5"
      lnbItems={lnbItems}
    >
      <div className="titWrap">
        <h2>오시는 길</h2>
        <p className="description">참마중물재단의 오시는 길 입니다.</p>
      </div>
      <div className="inner">
        <div className="mapWrap">
          <div className="map">
            <img src={mapImg} alt="지도 이미지" />
          </div>
          <div className="info">
            <i />
            <p>
              <strong>Adress</strong>
              <span>서울특별시 종로구 경희궁길 20  2층</span>
            </p>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
