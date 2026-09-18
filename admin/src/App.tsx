import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import NoticiasPage from './pages/NoticiasPage'
import DocumentosPage from './pages/DocumentosPage'
import ConvocatoriasPage from './pages/ConvocatoriasPage'
import UsuariosPage from './pages/UsuariosPage'
import FormulariosPage from './pages/FormulariosPage'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem('hq_token')
  const location = useLocation()
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<DashboardPage />} />
          <Route path="noticias" element={<NoticiasPage />} />
          <Route path="documentos" element={<DocumentosPage />} />
          <Route path="convocatorias" element={<ConvocatoriasPage />} />
          <Route path="usuarios" element={<UsuariosPage />} />
          <Route path="formularios" element={<FormulariosPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}