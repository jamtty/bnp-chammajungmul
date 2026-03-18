// src/pages/HomePage.tsx - 메인 페이지
import { useEffect, useRef, useState } from 'react'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'

import '@/assets/css/fullpage.min.css'
import '@/assets/css/swiper.min.css'

import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

import maincon1 from '@/assets/images/maincon_1.png'
import maincon2 from '@/assets/images/maincon_2.png'
import maincon3 from '@/assets/images/maincon_3.png'
import maincon4 from '@/assets/images/maincon_4.png'
import thum1 from '@/assets/images/thum_1.png'
import thum2 from '@/assets/images/thum_2.png'
import thum3 from '@/assets/images/thum_3.png'
import thum4 from '@/assets/images/thum_4.png'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const $: any

function handleAlert(e: React.MouseEvent) {
  e.preventDefault()
  alert('오픈 준비 중입니다.')
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'tab-1' | 'tab-2' | 'tab-3'>('tab-1')
  const swiperRef = useRef<Swiper | null>(null)

  useEffect(() => {
    document.body.classList.add('scroll-none')

    $('#fullpage').fullpage({
      anchors: ['anchor1', 'anchor2', 'anchor3', 'anchor4', 'anchor5', 'anchor6'],
      menu: '#menu_circle',
      verticalCentered: false,
      css3: false,
      keyboardScrolling: true,
      responsiveWidth: 1023,
    })

    swiperRef.current = new Swiper('.newsSwiper', {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 18,
      loop: true,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: '.swiper-button-prev',
        prevEl: '.swiper-button-next',
      },
      breakpoints: {
        1600: { slidesPerView: 4 },
      },
    })

    return () => {
      document.body.classList.remove('scroll-none')
      if (typeof $.fn.fullpage !== 'undefined') {
        $.fn.fullpage.destroy('all')
      }
      swiperRef.current?.destroy()
    }
  }, [])

  const newsSlides = [
    { img: thum1, subject: '재단 홈페이지 오픈', date: '2024-10-14' },
    { img: thum2, subject: '2023년 멘토, 멘티전체 만남의 날', date: '2024-10-14' },
    { img: thum3, subject: '2022년 멘토, 멘티 전체 만남의 날', date: '2024-10-14' },
    { img: thum4, subject: '준비 중입니다.', date: '2024-10-14', nodata: true },
    { img: thum1, subject: '2022년 멘토, 멘티 전체 만남의 날', date: '2024-10-14' },
    { img: thum2, subject: '준비 중입니다.', date: '2024-10-14', nodata: true },
  ]

  return (
    <>
      <ul className="skip_nav">
        <li><a href="#container">본문 바로가기</a></li>
        <li><a href="#menu">주메뉴 바로가기</a></li>
      </ul>

      <SiteHeader />

      <div id="fullpage">
        <ul id="menu_circle">
          {['anchor1', 'anchor2', 'anchor3', 'anchor4', 'anchor5'].map(anchor => (
            <li key={anchor} data-menuanchor={anchor}>
              <a href={`#${anchor}`}><span /></a>
            </li>
          ))}
          <li data-menuanchor="anchor6" style={{ opacity: 0 }}>
            <a href="#anchor6" />
          </li>
        </ul>

        <div id="container" className="container">
          {/* 비주얼 */}
          <div className="section Visual">
            <div className="txt">
              <h1>
                <span className="txtEng">The power to change <span className="device_mo" />the world</span>
                <span className="txtKor"><strong>세상</strong>을 바꾸는 <strong>힘</strong></span>
              </h1>
            </div>
          </div>

          {/* 재단소개 */}
          <div className="section Introduction">
            <div className="txt">
              <h1>
                <span className="txtEng">Introduction</span>
                <span className="txtKor"><strong>참마중물재단</strong> 소개</span>
              </h1>
            </div>
            <div className="con1">
              <a href="#!" onClick={handleAlert}><span>목표</span><img src={maincon1} alt="목표" /></a>
              <a href="#!" onClick={handleAlert}><span>인사말</span><img src={maincon2} alt="인사말" /></a>
              <a href="#!" onClick={handleAlert}><span>이사회</span><img src={maincon3} alt="이사회" /></a>
              <a href="#!" onClick={handleAlert}><span>연혁</span><img src={maincon4} alt="연혁" /></a>
            </div>
          </div>

          {/* 사업안내/멘토링 */}
          <div className="section Business">
            <div className="dep1" onClick={handleAlert}>
              <div className="txtWrap">
                <p className="ico" />
                <p className="txt">취약계층<br />청년, 대학생 지원</p>
                <div className="hidden">
                  <p>학업과 진로 준비에<br /> 더욱 충실할 수 있는 실질적 지원</p>
                  <a href="#!" onClick={handleAlert} aria-label="바로가기" />
                </div>
              </div>
            </div>
            <div className="dep2" onClick={handleAlert}>
              <div className="txtWrap">
                <p className="ico" />
                <p className="txt">청년, 대학생 학업<br />및 취업 지원</p>
                <div className="hidden">
                  <p>사회 진출 시 필요한 인턴 등<br />다양한 경험을 위한 연계 지원</p>
                  <a href="#!" onClick={handleAlert} aria-label="바로가기" />
                </div>
              </div>
            </div>
            <div className="dep3" onClick={handleAlert}>
              <div className="txtWrap">
                <p className="ico" />
                <p className="txt">멘토링</p>
                <div className="hidden">
                  <p>학업과 진로 등<br /> 사회 진출 준비에<br /> 필요한 경험 정보를 나누는 관계 형성</p>
                  <a href="#!" onClick={handleAlert} aria-label="바로가기" />
                </div>
              </div>
            </div>
          </div>

          {/* 재단소식 (Swiper) */}
          <div className="section News">
            <div className="txt">
              <h1>
                <span className="txtEng">News of the foundation</span>
                <span className="txtKor"><strong>재단</strong> 소식</span>
              </h1>
              <button type="button" className="swiper-button-prev" />
              <button type="button" className="swiper-button-next" />
            </div>
            <div className="swiper newsSwiper">
              <div className="swiper-wrapper">
                {newsSlides.map((item, i) => (
                  <div key={i} className="swiper-slide" onClick={handleAlert}>
                    <div className="thumb"><img src={item.img} alt={item.subject} /></div>
                    <div className="txtWrap">
                      <p className={`subject${item.nodata ? ' nodata' : ''}`}>{item.subject}</p>
                      <p className="datetime">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 참마중물 소식 (탭) */}
          <div className="section NewsBoard">
            <div className="txt">
              <h1>
                <span className="txtEng">News</span>
                <span className="txtKor"><strong>참마중물</strong> 소식</span>
              </h1>
              <ul className="tabs">
                {(['tab-1', 'tab-2', 'tab-3'] as const).map((tab, i) => (
                  <li
                    key={tab}
                    className={activeTab === tab ? 'active' : ''}
                    onClick={() => setActiveTab(tab)}
                  >
                    {['전체', '공지사항', '사업보고'][i]}
                  </li>
                ))}
              </ul>
            </div>

            <div id="tab-1" className={`tabcontents${activeTab === 'tab-1' ? ' active' : ''}`}>
              <a href="#!" className="more" aria-label="전체 바로가기" onClick={handleAlert} />
              <ul className="col2">
                <li>
                  <p className="datetime">2024-10-14</p>
                  <p className="subject">2025년도 학업장려금 및 창업지원금 안내</p>
                  <p className="memo">1. 2025년도 학업장려금 및 창업지원금 안내 : 아래와 같이 모집 및 선발 예정입니다. (구체적인 일정은...<br /></p>
                  <a href="#!" className="viewMore" aria-label="더보기" onClick={handleAlert}>View more</a>
                </li>
                <li>
                  <p className="datetime">2024-10-14</p>
                  <p className="subject">2024년 상반기 결산 보고</p>
                  <p className="memo">2024년 상반기 결산 보고 자료 입니다.</p>
                  <a href="#!" className="viewMore" aria-label="더보기" onClick={handleAlert}>View more</a>
                </li>
              </ul>
            </div>

            <div id="tab-2" className={`tabcontents${activeTab === 'tab-2' ? ' active' : ''}`}>
              <a href="#!" className="more" aria-label="공지사항 바로가기" onClick={handleAlert} />
              <ul className="col1">
                <li className="bg1">
                  <p className="datetime">2024-10-14</p>
                  <p className="subject">2025년도 학업장려금 및 창업지원금 안내</p>
                  <p className="memo">1. 2025년도 학업장려금 및 창업지원금 안내 : 아래와 같이 모집 및 선발 예정입니다<br />(구체적인 일정은 2024년 12월에 재단 홈페이지 공고 예정)<br /></p>
                  <a href="#!" className="viewMore" aria-label="더보기" onClick={handleAlert}>View more</a>
                </li>
              </ul>
            </div>

            <div id="tab-3" className={`tabcontents${activeTab === 'tab-3' ? ' active' : ''}`}>
              <a href="#!" className="more" aria-label="사업보고 바로가기" onClick={handleAlert} />
              <ul className="col1">
                <li className="bg2">
                  <p className="datetime">2024-10-14</p>
                  <p className="subject">2024년 상반기 결산 보고</p>
                  <p className="memo">2024년 상반기 결산 보고 자료 입니다.</p>
                  <a href="#!" className="viewMore" aria-label="더보기" onClick={handleAlert}>View more</a>
                </li>
              </ul>
            </div>
          </div>

          <SiteFooter />
        </div>
      </div>
    </>
  )
}