import { NavLink, Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            <NavLink to="/" className="hover:text-blue-600">
              {import.meta.env.VITE_APP_NAME}
            </NavLink>
          </h1>
          <ul className="flex items-center gap-6">
            <li>
              <NavLink
                to="/company"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }
              >
                회사소개
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
