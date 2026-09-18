export interface Noticia {
  id: number;
  slug: string;
  titulo: string;
  fecha: string;
  imagen: string | null;
  resumen: string;
  categoria: string;
  etiquetas: string[];
  contenido: (string | { h: string } | { ul: string[] })[];
  publicado: boolean;
  destacado: boolean;
}

export interface Documento {
  id: number;
  titulo: string;
  autor: string;
  fecha: string;
  tipo: string;
  delimitacion: string;
  formato: string;
  link: string | null;
}

export interface Convocatoria {
  id: number;
  titulo: string;
  fecha: string | null;
  descripcion: string | null;
  enlace: string | null;
  activa: boolean;
}