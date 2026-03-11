import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/pages/HomePage'
import CompanyPage from '@/pages/CompanyPage'
import BoardDetailPage from '@/pages/BoardDetailPage'
import BoardWritePage from '@/pages/BoardWritePage'
import BoardEditPage from '@/pages/BoardEditPage'
import NotFoundPage from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'company', element: <CompanyPage /> },
      { path: 'board/write', element: <BoardWritePage /> },
      { path: 'board/:no/edit', element: <BoardEditPage /> },
      { path: 'board/:no', element: <BoardDetailPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
