import SubPageLayout from '@/components/SubPageLayout'
import img1 from '@/assets/images/sub02_1_img1.png'
import img2 from '@/assets/images/sub02_1_img2.png'
import img3 from '@/assets/images/sub02_1_img3.png'
import img4 from '@/assets/images/sub02_1_img4.png'

const lnbItems = [
  { label: '취약계층 청년 지원', to: '/business/youth' },
  { label: '대학생 학업 및 취업 지원', to: '/business/student' },
]

const items = [
  { img: img1, alt: '청년을 위한 학업 장려금 및 창업 지원금 지원 사업', text: <>청년을 위한 <span>학업 장려금 및<br />창업 지원금 지원 사업</span></> },
  { img: img2, alt: '청년을 위한 멘토-멘티 활동 지원 사업', text: <>청년을 위한 <span>멘토-멘티 활동<br />지원 사업</span></> },
  { img: img3, alt: '청년을 위한 생활 안정 지원 사업금 지원 사업', text: <>청년을 위한 <span>생활 안정 지원<br />사업금 지원 사업</span></> },
  { img: img4, alt: '청년을 위한 학술조사 연구 사업', text: <>청년을 위한<br /><span>학술조사 연구 사업</span></> },
]

export default function BusinessYouthPage() {
  return (
    <SubPageLayout
      visualClass="vs2"
      visualTitle="사업안내"
      contentsClass="nav sub02_1"
      lnbItems={lnbItems}
    >
      <div className="titWrap">
        <h2>취약계층 청년 지원</h2>
        <p className="description">참마중물재단의 취약계층<span className="device_mo" />청년 지원 안내 입니다.</p>
      </div>
      <div className="inner">
        <div className="conWrap">
          <div className="con">
            <ul>
              {items.map((item, i) => (
                <li key={i}>
                  <div className="img">
                    <img src={item.img} alt={item.alt} />
                  </div>
                  <div className="txt">
                    <strong>0{i + 1}.</strong>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
