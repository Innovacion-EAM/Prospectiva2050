import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import type { Noticia } from '../types'

export default function NoticiasPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [meta, setMeta] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    setError('')
    api.getNoticias(`page=${page}&limit=10`)
      .then((res) => {
        setNoticias(res.data || [])
        setMeta(res.meta || null)
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [page])

  const formatDate = (iso?: string) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Noticias</h1>
          <p className="page-subtitle">Gestiona las publicaciones del sitio</p>
        </div>
        <button className="btn btn-primary">Nueva noticia</button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        {loading ? (
          <p className="empty-state">Cargando noticias…</p>
        ) : noticias.length === 0 ? (
          <p className="empty-state">No hay noticias registradas.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Fecha</th>
                <th>Categoría</th>
                <th className="ta-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {noticias.map((n) => (
                <tr key={n.id}>
                  <td>
                    <strong>{n.titulo}</strong>
                    {n.destacada && <span className="badge badge-accent">Destacada</span>}
                  </td>
                  <td>{formatDate(n.fechaPublicacion)}</td>
                  <td>{n.categoria?.nombre || '—'}</td>
                  <td className="ta-right">
                    <button className="btn btn-small btn-outline">Editar</button>
                    <button className="btn btn-small btn-danger">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {meta && (
        <div className="pagination-info">
          Página {page} de {meta.totalPages || 1} · {meta.total || noticias.length} noticias en total
          <div className="pagination-actions">
            <button className="btn btn-small" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              Anterior
            </button>
            <button className="btn btn-small" disabled={page >= (meta.totalPages || 1)} onClick={() => setPage((p) => p + 1)}>
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  )
}