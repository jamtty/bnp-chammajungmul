import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import AdminLayout from '@/layouts/AdminLayout'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import AboutGoalPage from '@/pages/AboutGoalPage'
import AboutGreetingPage from '@/pages/AboutGreetingPage'
import AboutBoardPage from '@/pages/AboutBoardPage'
import AboutHistoryPage from '@/pages/AboutHistoryPage'
import AboutLocationPage from '@/pages/AboutLocationPage'
import BusinessYouthPage from '@/pages/BusinessYouthPage'
import BusinessStudentPage from '@/pages/BusinessStudentPage'
import MentoringPage from '@/pages/MentoringPage'
import NewsListPage from '@/pages/NewsListPage'
import NewsDetailPage from '@/pages/NewsDetailPage'
import ReportListPage from '@/pages/ReportListPage'
import ReportDetailPage from '@/pages/ReportDetailPage'
import NoticeListPage from '@/pages/NoticeListPage'
import NoticeDetailPage from '@/pages/NoticeDetailPage'
import AdminLoginPage from '@/pages/admin/AdminLoginPage'
import AdminMainPage from '@/pages/admin/AdminMainPage'
import AdminMyPage from '@/pages/admin/AdminMyPage'
import AdminNewsPage from '@/pages/admin/AdminNewsPage'
import AdminNewsFormPage from '@/pages/admin/AdminNewsFormPage'
import AdminReportPage from '@/pages/admin/AdminReportPage'
import AdminReportFormPage from '@/pages/admin/AdminReportFormPage'
import AdminNoticePage from '@/pages/admin/AdminNoticePage'
import AdminNoticeFormPage from '@/pages/admin/AdminNoticeFormPage'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'about/goal', element: <AboutGoalPage /> },
        { path: 'about/greeting', element: <AboutGreetingPage /> },
        { path: 'about/board', element: <AboutBoardPage /> },
        { path: 'about/history', element: <AboutHistoryPage /> },
        { path: 'about/location', element: <AboutLocationPage /> },
        { path: 'business/youth', element: <BusinessYouthPage /> },
        { path: 'business/student', element: <BusinessStudentPage /> },
        { path: 'mentoring', element: <MentoringPage /> },
        { path: 'news', element: <NewsListPage /> },
        { path: 'news/:id', element: <NewsDetailPage /> },
        { path: 'report', element: <ReportListPage /> },
        { path: 'report/:id', element: <ReportDetailPage /> },
        { path: 'notice', element: <NoticeListPage /> },
        { path: 'notice/:id', element: <NoticeDetailPage /> },
      ],
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminMainPage /> },
        { path: 'mypage', element: <AdminMyPage /> },
        { path: 'news', element: <AdminNewsPage /> },
        { path: 'news/write', element: <AdminNewsFormPage /> },
        { path: 'news/edit/:id', element: <AdminNewsFormPage /> },
        { path: 'report', element: <AdminReportPage /> },
        { path: 'report/write', element: <AdminReportFormPage /> },
        { path: 'report/edit/:id', element: <AdminReportFormPage /> },
        { path: 'notice', element: <AdminNoticePage /> },
        { path: 'notice/write', element: <AdminNoticeFormPage /> },
        { path: 'notice/edit/:id', element: <AdminNoticeFormPage /> },
      ],
    },
    { path: '/admin/login', element: <AdminLoginPage /> },
    { path: '*', element: <NotFoundPage /> },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
)
