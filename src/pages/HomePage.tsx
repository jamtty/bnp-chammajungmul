// src/pages/HomePage.tsx - 메인 페이지
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchNewsList, type NewsItem } from '@/api/news'
import { fetchNoticeList, type NoticeItem } from '@/api/notice'
import { fetchReportList, type ReportItem } from '@/api/report'
import Swiper from 'swiper'

import '@/assets/css/fullpage.min.css'
import '@/assets/css/swiper.min.css'

import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

import maincon1 from '@/assets/images/maincon_1.png'
import maincon2 from '@/assets/images/maincon_2.png'
import maincon3 from '@/assets/images/maincon_3.png'
import maincon4 from '@/assets/images/maincon_4.png'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const $: any

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>?/g, '')         // 1차: 완전한 태그 + 닫는 > 없는 불완전 태그 제거
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/<[^>]*>?/g, '')         // 2차: 엔티티 디코딩 후 남은 태그/조각 제거
    .trim()
const truncate = (str: string, max = 23) => str.length > max ? str.slice(0, max) + '…' : str

export default function HomePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'tab-1' | 'tab-2' | 'tab-3'>('tab-1')
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [noticeItems, setNoticeItems] = useState<NoticeItem[]>([])
  const [reportItems, setReportItems] = useState<ReportItem[]>([])
  const swiperRef = useRef<Swiper | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    Promise.all([
      fetchNewsList({ page: 1, size: 6 }).then(res => setNewsItems(res.items)).catch(() => {}),
      fetchNoticeList({ page: 1, size: 3 }).then(res => setNoticeItems(res.items)).catch(() => {}),
      fetchReportList({ page: 1, size: 3 }).then(res => setReportItems(res.items)).catch(() => {}),
    ]).finally(() => setLoaded(true))
  }, [])

  useEffect(() => {
    if (!loaded) return

    const isMobile = window.innerWidth <= 767

    if (!isMobile) {
      document.body.classList.add('scroll-none')
      $('#fullpage').fullpage({
        anchors: ['anchor1', 'anchor2', 'anchor3', 'anchor4', 'anchor5', 'anchor6'],
        menu: '#menu_circle',
        verticalCentered: false,
        css3: false,
        keyboardScrolling: true,
        responsiveWidth: 1023,
      })
    }

    if (newsItems.length > 0) {
      swiperRef.current = new Swiper('.newsSwiper', {
        slidesPerView: 1,
        spaceBetween: 18,
        loop: true,
        watchOverflow: false,
        breakpoints: {
          1600: { slidesPerView: 4 },
        },
      })
    }

    return () => {
      document.body.classList.remove('scroll-none')
      if (!isMobile && typeof $.fn.fullpage !== 'undefined') {
        $.fn.fullpage.destroy('all')
      }
      swiperRef.current?.destroy()
    }
  }, [loaded]) // eslint-disable-line react-hooks/exhaustive-deps



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
              <Link to="/about/goal"><span>목표</span><img src={maincon1} alt="목표" /></Link>
              <Link to="/about/greeting"><span>인사말</span><img src={maincon2} alt="인사말" /></Link>
              <Link to="/about/board"><span>이사회</span><img src={maincon3} alt="이사회" /></Link>
              <Link to="/about/history"><span>연혁</span><img src={maincon4} alt="연혁" /></Link>
            </div>
          </div>

          {/* 사업안내/멘토링 */}
          <div className="section Business">
            <div className="dep1">
              <div className="txtWrap">
                <p className="ico" />
                <p className="txt">취약계층<br />청년, 대학생 지원</p>
                <div className="hidden">
                  <p>학업과 진로 준비에<br /> 더욱 충실할 수 있는 실질적 지원</p>
                  <Link to="/business/youth" aria-label="바로가기" />
                </div>
              </div>
            </div>
            <div className="dep2">
              <div className="txtWrap">
                <p className="ico" />
                <p className="txt">청년, 대학생 학업<br />및 취업 지원</p>
                <div className="hidden">
                  <p>사회 진출 시 필요한 인턴 등<br />다양한 경험을 위한 연계 지원</p>
                  <Link to="/business/student" aria-label="바로가기" />
                </div>
              </div>
            </div>
            <div className="dep3">
              <div className="txtWrap">
                <p className="ico" />
                <p className="txt">멘토링</p>
                <div className="hidden">
                  <p>학업과 진로 등<br /> 사회 진출 준비에<br /> 필요한 경험 정보를 나누는 관계 형성</p>
                  <Link to="/mentoring" aria-label="바로가기" />
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
            </div>
            <div className="swiper newsSwiper">
                {loaded && (newsItems.length === 0 ? (
                  <p className="home_empty">등록된 소식이 없습니다.</p>
                ) : (
                  <div className="swiper-wrapper">
                    {newsItems.map(item => (
                      <div key={item.id} className="swiper-slide" onClick={() => navigate(`/news/${item.id}`)}>
                        <div className="thumb">
                          {item.thumb_url ? (
                            <img src={item.thumb_url} alt={item.title} />
                          ) : (
                            <div className="thumb noImg">NO IMAGE</div>
                          )}
                        </div>
                        <div className="txtWrap">
                          <p className="subject">{item.title}</p>
                          <p className="datetime">{item.created_at.slice(0, 10)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
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
                    onClick={() => {
                      setActiveTab(tab)
                    }}
                  >
                    {['전체', '공지사항', '사업보고'][i]}
                  </li>
                ))}
              </ul>
            </div>

            <div id="tab-1" className={`tabcontents${activeTab === 'tab-1' ? ' active' : ''}`}>
              <Link to="/notice" className="more" aria-label="전체 바로가기" />
              {noticeItems.length === 0 && reportItems.length === 0 ? (
                <p className="home_empty">등록된 게시글이 없습니다.</p>
              ) : (
              <ul className="col2">
                {[...noticeItems.slice(0, 1), ...reportItems.slice(0, 1)].map((item, i) => (
                  <li key={i}>
                    <p className="datetime">{item.created_at.slice(0, 10)}</p>
                    <p className="subject">{truncate(item.title)}</p>
                    {item.content && <p className="memo">{truncate(stripHtml(item.content), 55)}</p>}
                    <Link
                      to={i === 0 ? `/notice/${item.id}` : `/report/${item.id}`}
                      className="viewMore"
                      aria-label="더보기"
                    >View more</Link>
                  </li>
                ))}
              </ul>
              )}
            </div>

            <div id="tab-2" className={`tabcontents${activeTab === 'tab-2' ? ' active' : ''}`}>
              <Link to="/notice" className="more" aria-label="공지사항 바로가기" />
              {noticeItems.length === 0 ? (
                <p className="home_empty">등록된 공지사항이 없습니다.</p>
              ) : (
              <ul className="col2">
                {noticeItems.slice(0, 3).map(item => (
                  <li key={item.id} className="bg1">
                    <p className="datetime">{item.created_at.slice(0, 10)}</p>
                    <p className="subject">{truncate(item.title)}</p>
                    {item.content && <p className="memo">{truncate(stripHtml(item.content), 55)}</p>}
                    <Link to={`/notice/${item.id}`} className="viewMore" aria-label="더보기">View more</Link>
                  </li>
                ))}
              </ul>
              )}
            </div>

            <div id="tab-3" className={`tabcontents${activeTab === 'tab-3' ? ' active' : ''}`}>
              <Link to="/report" className="more" aria-label="사업보고 바로가기" />
              {reportItems.length === 0 ? (
                <p className="home_empty">등록된 사업보고가 없습니다.</p>
              ) : (
              <ul className="col2">
                {reportItems.slice(0, 3).map(item => (
                  <li key={item.id} className="bg2">
                    <p className="datetime">{item.created_at.slice(0, 10)}</p>
                    <p className="subject">{truncate(item.title)}</p>
                    {item.content && <p className="memo">{truncate(stripHtml(item.content), 55)}</p>}
                    <Link to={`/report/${item.id}`} className="viewMore" aria-label="더보기">View more</Link>
                  </li>
                ))}
              </ul>
              )}
            </div>
          </div>

          <SiteFooter />
        </div>
      </div>
    </>
  )
}