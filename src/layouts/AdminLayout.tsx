import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'

export default function AdminLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Outlet />
    </div>
  )
}
