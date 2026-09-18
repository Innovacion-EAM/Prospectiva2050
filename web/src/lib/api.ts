import { createServerFn } from "@tanstack/react-start";

export type ApiNoticia = {
  id: number;
  slug: string;
  titulo: string;
  fecha: string | Date;
  categoria: string;
  imagen: string | null;
  resumen: string;
  contenido: string[] | string;
  etiquetas?: string[];
  publicado?: boolean;
  destacado?: boolean;
};

export type ApiDocumento = {
  id: number;
  titulo: string;
  autor: string;
  fecha: string | Date;
  tipo: string;
  delimitacion: string;
  formato: string;
  link: string | null;
};

export type ApiConvocatoria = {
  id: number;
  titulo: string;
  fecha: string | Date | null;
  descripcion: string | null;
  enlace: string | null;
  activa?: boolean;
};

export type NewsItem = {
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  overlay?: "convoca";
  excerpt: string;
  body: string[];
};

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export function formatFecha(iso: string | Date | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getDate()} ${MESES[d.getMonth()]} ${d.getFullYear()}`;
}

export function noticiaImage(n: {
  imagen: string | null;
  categoria?: string;
  slug?: string;
}): string {
  const img = n.imagen;
  if (img && (img.startsWith("/") || img.startsWith("http"))) return img;
  const cat = (n.categoria ?? "").toLowerCase();
  const slug = (n.slug ?? "").toLowerCase();
  if (cat.includes("convocat") || slug.includes("convocat")) {
    return "/images/news-convocatoria.jpg";
  }
  if (cat.includes("taller") || cat.includes("evento") || cat.includes("participa")) {
    return "/images/news-eventos.jpg";
  }
  if (cat.includes("municip") || cat.includes("ambient") || cat.includes("paisaje")) {
    return "/images/news-paisaje.jpg";
  }
  return "/images/news-ciudad.jpg";
}

export function toNewsItem(n: ApiNoticia): NewsItem {
  const cat = n.categoria ?? "";
  const body = Array.isArray(n.contenido)
    ? n.contenido
    : n.contenido
      ? String(n.contenido).split(/\n+/)
      : [];
  return {
    slug: n.slug,
    title: n.titulo,
    category: cat,
    date: formatFecha(n.fecha),
    image: noticiaImage({ imagen: n.imagen, categoria: cat, slug: n.slug }),
    overlay: cat.toLowerCase().includes("convocat") ? "convoca" : undefined,
    excerpt: n.resumen,
    body,
  };
}

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(`API ${res.url} respondió ${res.status}`);
  }
  return res.json() as Promise<T>;
}

async function get<T>(path: string): Promise<T> {
  const apiUrl =
    (typeof process !== "undefined" ? process.env.PUBLIC_API_URL : undefined) ??
    "http://localhost:3000";
  return parse<T>(
    await fetch(`${apiUrl}${path}`, { headers: { accept: "application/json" } }),
  );
}

export const fetchNoticias = createServerFn({ method: "GET" })
  .validator((d?: { categoria?: string; q?: string; page?: number; perPage?: number }) => d ?? {})
  .handler(async ({ data }) => {
    const p = new URLSearchParams();
    if (data.categoria) p.set("categoria", data.categoria);
    if (data.q) p.set("q", data.q);
    p.set("page", String(data.page ?? 1));
    p.set("perPage", String(data.perPage ?? 20));
    return get<{ data: ApiNoticia[]; meta: { total: number; page: number; perPage: number } }>(
      `/api/noticias?${p.toString()}`,
    );
  });

export const fetchNoticia = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data }) =>
    get<ApiNoticia>(`/api/noticias/${encodeURIComponent(data)}`),
  );

export const fetchDocumentos = createServerFn({ method: "GET" })
  .validator((d?: { tipo?: string; delimitacion?: string }) => d ?? {})
  .handler(async ({ data }) => {
    const p = new URLSearchParams();
    if (data.tipo) p.set("tipo", data.tipo);
    if (data.delimitacion) p.set("delimitacion", data.delimitacion);
    return get<{ data: ApiDocumento[] }>(`/api/documentos?${p.toString()}`);
  });

export const fetchConvocatorias = createServerFn({ method: "GET" }).handler(async () =>
  get<ApiConvocatoria[]>("/api/convocatorias"),
);