export interface Categoria {
  id: number;
  nombre: string;
  activo: boolean;
}

export interface Noticia {
  id: number;
  titulo: string;
  slug: string;
  contenido: string;
  resumen?: string;
  imagenUrl?: string;
  categoria?: Categoria;
  categoriaId?: number;
  publicado: boolean;
  destacada: boolean;
  fechaPublicacion: string;
  createdAt: string;
  updatedAt: string;
}

export interface Documento {
  id: number;
  titulo: string;
  slug: string;
  descripcion?: string;
  archivoUrl: string;
  categoria?: Categoria;
  categoriaId?: number;
  publicado: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Convocatoria {
  id: number;
  titulo: string;
  slug: string;
  descripcion?: string;
  fechaInicio: string;
  fechaFin: string;
  activa: boolean;
  enlace?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  rol: 'admin' | 'editor' | 'usuario';
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}