import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/noticias', label: 'Noticias', end: false },
  { to: '/documentos', label: 'Documentos', end: false },
  { to: '/convocatorias', label: 'Convocatorias', end: false },
  { to: '/usuarios', label: 'Usuarios', end: false },
  { to: '/formularios', label: 'Formularios', end: false },
]

function getUserName(): string {
  try {
    const user = JSON.parse(localStorage.getItem('hq_user') || '{}')
    return user?.nombre || user?.email || 'Usuario'
  } catch {
    return 'Usuario'
  }
}

export default function Layout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('hq_token')
    localStorage.removeItem('hq_user')
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-badge">H</div>
          <div className="brand-text">
            <strong>Horizonte Quindío</strong>
            <span>Prospectiva 2050</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="main">
        <header className="topbar">
          <div className="topbar-title">Panel de administración</div>
          <div className="topbar-user">
            <span className="user-avatar">{getUserName().charAt(0).toUpperCase()}</span>
            <span className="user-name">{getUserName()}</span>
            <button className="btn btn-outline" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}