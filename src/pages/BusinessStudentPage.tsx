import SubPageLayout from '@/components/SubPageLayout'
import img1 from '@/assets/images/sub02_2_img1.png'
import img2 from '@/assets/images/sub02_2_img2.png'
import img3 from '@/assets/images/sub02_2_img3.png'
import img4 from '@/assets/images/sub02_2_img4.png'
import img5 from '@/assets/images/sub02_2_img5.png'

const lnbItems = [
  { label: '취약계층 청년 지원', to: '/business/youth' },
  { label: '대학생 학업 및 취업 지원', to: '/business/student' },
]

const items = [
  { img: img1, alt: '균등한 교육 기회를 마련하여 인재 육성에 기여', text: <><span>균등한 교육 기회</span>를 마련하여<br />인재 육성에 기여</> },
  { img: img2, alt: '친밀한 인간적인 관계를 통하여 학업과 삶에 진정한 멘토가 되는 사회적 연대 강화', text: <>친밀한 인간적인 관계를 통하여<br />학업과 삶에 진정한 멘토가 되는<br /><span>사회적 연대 강화</span></> },
  { img: img3, alt: '매월 생활비 지원으로 생활의 안정과 학업, 진로 준비 지원', text: <><span>매월 생활비 지원</span>으로<br />생활의 안정과 학업,<br />진로 준비 지원</> },
  { img: img4, alt: '장학 혜택을 받은 학생이 사회에 진출하게 되면 새로운 신입생의 멘토가 되어서 받은 혜택을 나누는 선순환 구조 마련', text: <>장학 혜택을 받은 학생이 사회에<br />진출하게 되면 새로운 신입생의<br />멘토가 되어서 받은 혜택을 나누는<br /><span>선순환 구조 마련</span></> },
  { img: img5, alt: '조사, 연구를 통한 대학생들의 꿈과 비전을 지원', text: <>조사, 연구를 통한 대학생들의<br /><span>꿈과 비전을 지원</span></> },
]

export default function BusinessStudentPage() {
  return (
    <SubPageLayout
      visualClass="vs2"
      visualTitle="사업안내"
      contentsClass="nav sub02_1"
      lnbItems={lnbItems}
    >
      <div className="titWrap">
        <h2>대학생 학업 및<span className="device_mo" />취업 지원</h2>
        <p className="description">참마중물재단의 대학생 학업 및<span className="device_mo" />취업 지원 안내 입니다.</p>
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
