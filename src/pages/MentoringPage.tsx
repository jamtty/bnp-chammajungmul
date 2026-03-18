import SubPageLayout from '@/components/SubPageLayout'

export default function MentoringPage() {
  return (
    <SubPageLayout
      visualClass="vs3"
      visualTitle="멘토링"
      contentsClass="sub03_1"
    >
      <div className="titWrap">
        <h2>멘토링</h2>
        <p className="description">참마중물재단의 멘토링 입니다.</p>
      </div>
      <div className="conBg">
        <div className="inner">
          <div className="conWrap">
            <ul>
              <li>
                <i />
                <p className="tag">학업, 진로 멘토링</p>
                <p className="des">
                  단순히 경제적인 지원만 하는 것이 아니라 학업,<span className="device_pc" />진로 등 사회 진출 준비에 필요한 경험 정보를<span className="device_pc" />나누는 멘토, 멘티의 관계 형성
                </p>
              </li>
              <li />
              <li>
                <i />
                <p className="tag">인턴 등 사회 진출 지원</p>
                <p className="des">
                  사회 진출 시에 필요한 인턴 등을<span className="device_pc" />다양한 경험을 할 수 있도록 연계 지원
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
