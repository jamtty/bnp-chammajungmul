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
      ],
    },
    { path: '/admin/login', element: <AdminLoginPage /> },
    { path: '*', element: <NotFoundPage /> },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
)
