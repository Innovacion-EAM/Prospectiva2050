const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('hq_token');
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...((options.headers as Record<string, string>) || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Error de red');
  }
  return res.json();
}

export const api = {
  login: (email: string, password: string) => request<{ accessToken: string; user: any }>('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  getPerfil: () => request<any>('/api/auth/perfil'),
  getNoticias: (params?: string) => request<{ data: any[]; meta: any }>(`/api/noticias${params ? `?${params}` : ''}`),
  health: () => request<{ status: string }>('/api/health'),
};