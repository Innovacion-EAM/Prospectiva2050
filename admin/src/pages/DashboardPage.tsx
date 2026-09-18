import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'

interface Perfil {
  id: number
  email?: string
  nombre?: string
  rol?: string
}

export default function DashboardPage() {
  const [health, setHealth] = useState<string>('Verificando…')
  const [healthOk, setHealthOk] = useState<boolean | null>(null)
  const [perfil, setPerfil] = useState<Perfil | null>(null)

  useEffect(() => {
    api.health()
      .then(() => {
        setHealth('API en línea')
        setHealthOk(true)
      })
      .catch(() => {
        setHealth('API no disponible')
        setHealthOk(false)
      })
    api.getPerfil()
      .then(setPerfil)
      .catch(() => {})
  }, [])

  const tokenUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('hq_user') || '{}') as Perfil
    } catch {
      return null
    }
  })()

  const cardUser = perfil || tokenUser

  const stats = [
    { label: 'Noticias publicadas', value: 12 },
    { label: 'Documentos', value: 8 },
    { label: 'Convocatorias activas', value: 3 },
    { label: 'Usuarios', value: 5 },
  ]

  const links = [
    { to: '/noticias', label: 'Gestionar noticias', desc: 'Crear y editar publicaciones' },
    { to: '/documentos', label: 'Gestionar documentos', desc: 'Archivos y publicaciones' },
    { to: '/convocatorias', label: 'Gestionar convocatorias', desc: 'Concursos y procesos' },
    { to: '/usuarios', label: 'Gestionar usuarios', desc: 'Accesos y roles' },
  ]

  return (
    <div className="page">
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Resumen del estado del sistema Horizonte Quindío Prospectiva 2050</p>

      <div className="cards-grid">
        <div className="card">
          <h2 className="card-title">Estado de la API</h2>
          <div className={`health-pill${healthOk ? ' ok' : healthOk === null ? '' : ' bad'}`}>
            <span className="health-dot" />
            {health}
          </div>
        </div>
        <div className="card">
          <h2 className="card-title">Sesión</h2>
          {cardUser ? (
            <ul className="detail-list">
              <li><span>Nombre</span><strong>{cardUser.nombre || '—'}</strong></li>
              <li><span>Correo</span><strong>{cardUser.email || '—'}</strong></li>
              <li><span>Rol</span><strong>{cardUser.rol || '—'}</strong></li>
            </ul>
          ) : (
            <p>Usuario no identificado.</p>
          )}
        </div>
      </div>

      <div className="cards-grid">
        {stats.map((s) => (
          <div className="card card-stat" key={s.label}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="section-title">Accesos rápidos</h2>
      <div className="cards-grid">
        {links.map((l) => (
          <Link to={l.to} className="card card-link" key={l.to}>
            <h3 className="card-title">{l.label}</h3>
            <p className="card-desc">{l.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}