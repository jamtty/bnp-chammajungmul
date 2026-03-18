import SubPageLayout from '@/components/SubPageLayout'
import profileImg from '@/assets/images/sub01_2_profile.png'
import signImg from '@/assets/images/sub01_2_sign.svg'

const lnbItems = [
  { label: '목표', to: '/about/goal' },
  { label: '인사말', to: '/about/greeting' },
  { label: '이사회', to: '/about/board' },
  { label: '연혁', to: '/about/history' },
  { label: '오시는 길', to: '/about/location' },
]

export default function AboutGreetingPage() {
  return (
    <SubPageLayout
      visualClass="vs1"
      visualTitle="재단소개"
      contentsClass="nav sub01_2"
      lnbItems={lnbItems}
    >
      <div className="titWrap">
        <h2>인사말</h2>
        <p className="description">참마중물재단의 인사말 입니다.</p>
      </div>
      <div className="conBg">
        <div className="profile">
          <img src={profileImg} alt="참마중물재단 이사장 장순영 프로필 이미지" />
        </div>
        <div className="txtWrap">
          <p className="title">
            안녕하세요.<br />
            <strong>참마중물재단<span className="device_mo" />이사장 장순영 입니다.</strong>
          </p>
          <p className="txtBasic">
            2020년 가을 우연한 기회에 보육원 보호종료 청년들이 가장 절실하게 느끼는 부분이 외로움을 이겨낼 수 있는
            누군가가 필요하고 또 고민이 될 때 상담이나 대화를 나눌 수 있는 사람이 필요하다는 사연을 알게 되었습니다.<br /><br />

            2021년부터 마이다스에셋의 임직원이 자원하여 참여하여서 멘토, 멘티의 관계로 지속적인 교류와 이를 통한
            서로에게 진심이 통할 수 있는 인간적인 친분을 형성하는 사회공헌 활동을 계획하게 되었습니다.<br /><br />

            지난 3년여 동안 멘토, 멘티로의 인간적인 신뢰 형성과 교류를 위하여 정기적인 만남으로 학업, 진학, 취업 등
            인생 전반에 대한 상담 및 의견을 나누며 신뢰를 쌓고 있습니다.<br />
            더욱 체계 적이고 많은 청년과 대학생들이 혜택을 받을 수 있도록 재단 설립을 추진하게 되었고, 감사하게도
            현대종합금속 정몽석 회장님도 함께 참여해 주셨습니다.<br />
            멘토링을 통하여 인간적인 외로움과 고민 상담 등을 나누며 가족 같은 역할을 하고, 멘토들의 경험과 경력을 기반
            으로 진로 상담과 목표 설정 등을 도와주며, 학업과 진로 준비에 집중할 수 있도록 생활비 지원을 하여서 졸업 후
            사회 곳곳에서 귀하게 쓰임을 받는 인재가 되는 길에 마중물과 같은 역할을 하고자 합니다.<br />
            임직원들과 함께 초심을 잃지 않고 청년들에게 꿈과 희망, 그리고 비전을 나눌 수 있는 참된 "마중물"이 될 수
            있도록 최선을 다하겠습니다.<br /><br />

            감사합니다.
          </p>
          <p className="sign">
            <img src={signImg} alt="참마중물재단 이사장 장순영 싸인 이미지" />
          </p>
        </div>
      </div>
    </SubPageLayout>
  )
}
