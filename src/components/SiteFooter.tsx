import icoFooterLogo1 from '@/assets/images/ico_footer_logo1.svg'
import icoFooterLogo2 from '@/assets/images/ico_footer_logo2.svg'

export default function SiteFooter() {
  return (
    <div className="section footer">
      <div className="copyright">
        <div className="copytxt">
          <div className="simbol" />
          <p>
            03175 서울시 종로구 경희궁길 20 2층
            <span className="device_mo" /> TEL. 02-6330-5810
            <br />
            Copyright © 2024 참마중물재단
            <span className="device_mo" /> All Rights Reserved
          </p>
        </div>
        <ul className="logo">
          <li>
            <a href="#" target="_blank" rel="noreferrer">
              <img src={icoFooterLogo1} alt="국세청 로고" />
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noreferrer">
              <img src={icoFooterLogo2} alt="서울시 로고" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
