import type { Convocatoria, Documento, Noticia } from './types';

export interface PaginacionMeta {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface RespuestaPaginada<T> {
  data: T[];
  meta: PaginacionMeta;
}

const API = process.env.PUBLIC_API_URL || 'http://localhost:3000';

const META_VACIA: PaginacionMeta = {
  total: 0,
  page: 1,
  perPage: 20,
  totalPages: 0,
};

async function getPaginado<T>(
  path: string,
  params: Record<string, string | number | undefined> = {}
): Promise<RespuestaPaginada<T>> {
  const fallback: RespuestaPaginada<T> = { data: [], meta: META_VACIA };
  try {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') qs.set(k, String(v));
    });
    const url = `${API}${path}${qs.toString() ? `?${qs.toString()}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) return fallback;
    const json = await res.json();
    if (!json || !Array.isArray(json.data)) return fallback;
    const meta: PaginacionMeta = {
      total: json.meta?.total ?? json.data.length,
      page: json.meta?.page ?? 1,
      perPage: json.meta?.perPage ?? json.data.length,
      totalPages: json.meta?.totalPages ?? (json.data.length ? 1 : 0),
    };
    return { data: json.data as T[], meta };
  } catch {
    return fallback;
  }
}

export async function fetchNoticias(params: {
  categoria?: string;
  q?: string;
  page?: number;
  perPage?: number;
} = {}): Promise<RespuestaPaginada<Noticia>> {
  return getPaginado<Noticia>('/api/noticias', params);
}

export async function fetchNoticiaBySlug(slug: string): Promise<Noticia | null> {
  try {
    const res = await fetch(`${API}/api/noticias/${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    const json = await res.json();
    return (json && typeof json === 'object' ? json : null) as Noticia | null;
  } catch {
    return null;
  }
}

export async function fetchDocumentos(params: {
  tipo?: string;
  delimitacion?: string;
  q?: string;
  page?: number;
  perPage?: number;
} = {}): Promise<RespuestaPaginada<Documento>> {
  return getPaginado<Documento>('/api/documentos', params);
}

export async function fetchConvocatorias(): Promise<Convocatoria[]> {
  try {
    const res = await fetch(`${API}/api/convocatorias`);
    if (!res.ok) return [];
    const json = await res.json();
    if (Array.isArray(json)) return json as Convocatoria[];
    if (json && Array.isArray(json.data)) return json.data as Convocatoria[];
    return [];
  } catch {
    return [];
  }
}