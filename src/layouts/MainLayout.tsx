import { Outlet } from 'react-router-dom'
import ScrollTopButton from '@/components/ScrollTopButton'

export default function MainLayout() {
  return (
    <>
      <Outlet />
      <ScrollTopButton />
    </>
  )
}
