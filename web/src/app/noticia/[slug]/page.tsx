import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchNoticias, fetchNoticiaBySlug } from '@/lib/api';
import { formatearFecha } from '@/lib/format';
import { placeholderSVG } from '@/lib/placeholder';
import NoticiaContent from '@/components/NoticiaContent';
import ShareButtons from '@/components/ShareButtons';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await fetchNoticias({ perPage: 500 });
  return data.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const noticia = await fetchNoticiaBySlug(slug);
  return {
    title: noticia
      ? `${noticia.titulo} · Horizonte Quindío Prospectiva 2050`
      : 'Noticia · Horizonte Quindío Prospectiva 2050',
    description: noticia?.resumen,
  };
}

export default async function Noticia({ params }: Props) {
  const { slug } = await params;
  const n = await fetchNoticiaBySlug(slug);

  if (!n) {
    return (
      <section className="section">
        <div className="container">
          <div className="empty-state">
            <span className="ico-big">🔎</span>
            <h3>Noticia no encontrada</h3>
            <p>La noticia puede haber sido movida o eliminada.</p>
            <p style={{ marginTop: '14px' }}>
              <Link className="btn btn--primary btn--sm" href="/avances">
                Volver al portal de noticias
              </Link>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero page-hero--sm" style={{ paddingBottom: '52px' }}>
        <div className="container">
          <nav className="breadcrumbs" aria-label="Miga de pan">
            <Link href="/">Inicio</Link>
            <span />
            <Link href="/avances">Avances</Link>
            <span />
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>Noticia</span>
          </nav>
          <p className="hero-tag" style={{ marginBottom: '10px' }}>
            Portal de noticias — Horizonte Quindío
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '56px' }}>
        <div className="container">
          <article className="article">
            <span className="chip chip--cat">{n.categoria}</span>
            <h1>{n.titulo}</h1>
            <div className="article__meta">
              <span>🗓 {formatearFecha(n.fecha)}</span>
              <span>·</span>
              <span>Portal de noticias — Horizonte Quindío</span>
            </div>
            <p className="article__lead">{n.resumen}</p>
            <figure className="article__img">
              <div dangerouslySetInnerHTML={{ __html: placeholderSVG(n.categoria) }} />
              <figcaption>
                {n.imagen ? `Imagen: ${n.imagen} · ` : ''}Foto pendiente por
                definición institucional
              </figcaption>
            </figure>
            <NoticiaContent contenido={n.contenido} />
            <div className="article-tags">
              {n.etiquetas.map((t) => (
                <span className="tag" key={t}>
                  #{t}
                </span>
              ))}
            </div>
            <ShareButtons />
            <div style={{ marginTop: '40px' }}>
              <Link className="btn btn--primary" href="/avances">
                ← Volver a avances y noticias
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}