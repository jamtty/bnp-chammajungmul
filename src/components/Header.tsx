import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">
          <NavLink to="/" className="hover:text-blue-600">
            나는<span style={{ color: 'blue' }}>개발중 이다.</span>
          </NavLink>
        </h1>
      </nav>
    </header>
  )
}
