'use client';

import { useMemo, useState } from 'react';
import type { Noticia } from '@/lib/types';
import { formatearFecha } from '@/lib/format';
import { placeholderSVG } from '@/lib/placeholder';

export default function PortalNoticias({
  initialNoticias,
}: {
  initialNoticias: Noticia[];
}) {
  const [termino, setTermino] = useState('');
  const [filtroCat, setFiltroCat] = useState('Todas');

  const categorias = [
    'Todas',
    ...Array.from(new Set(initialNoticias.map((n) => n.categoria))),
  ];

  const lista = useMemo(() => {
    let l = initialNoticias.slice();
    if (filtroCat !== 'Todas') l = l.filter((n) => n.categoria === filtroCat);
    const t = termino.trim().toLowerCase();
    if (t) {
      l = l.filter(
        (n) =>
          `${n.titulo} ${n.resumen}`.toLowerCase().includes(t) ||
          n.etiquetas.some((e) => e.toLowerCase().includes(t))
      );
    }
    return l;
  }, [initialNoticias, filtroCat, termino]);

  return (
    <>
      <div className="portal-toolbar reveal">
        <div className="search-box">
          <input
            type="search"
            placeholder="Buscar noticias, temas o etiquetas…"
            aria-label="Buscar en el portal de noticias"
            value={termino}
            onChange={(e) => setTermino(e.target.value)}
          />
        </div>
        <div className="filters" role="group" aria-label="Filtrar por categoría">
          {categorias.map((c) => (
            <button
              key={c}
              className={`filter-btn${filtroCat === c ? ' active' : ''}`}
              data-cat={c}
              onClick={() => setFiltroCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {lista.length}{' '}
        {lista.length === 1 ? 'noticia' : 'noticias'}{' '}
        {lista.length === 1 ? 'encontrada' : 'encontradas'}
      </p>

      {lista.length ? (
        <div className="grid-3" aria-live="polite">
          {lista.map((n) => (
            <article className="news-card reveal" key={n.id}>
              <a
                className="news-card__img"
                href={`/noticia/${n.slug}`}
                aria-label="Leer noticia"
              >
                <span dangerouslySetInnerHTML={{ __html: placeholderSVG(n.categoria) }} />
                <span className="img-note">Foto pendiente</span>
              </a>
              <div className="news-card__body">
                <div className="news-meta">
                  <span className="chip chip--cat">{n.categoria}</span>
                  <span className="news-date">{formatearFecha(n.fecha)}</span>
                </div>
                <h3>
                  <a className="title-link" href={`/noticia/${n.slug}`}>
                    {n.titulo}
                  </a>
                </h3>
                <p>{n.resumen}</p>
                <a
                  className="arrow-link btn btn--outline btn--sm"
                  href={`/noticia/${n.slug}`}
                >
                  Leer más
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="ico-big">🔎</span>
          <h3>Sin resultados</h3>
          <p>
            No encontramos noticias con esos criterios. Intenta con otra palabra
            o categoría.
          </p>
        </div>
      )}

      <p
        className="text-center"
        style={{ marginTop: '40px', color: 'var(--gris-500)', fontSize: '0.9rem' }}
      >
        Las novedades se publican de manera continua por el equipo administrador
        del proyecto.
      </p>
    </>
  );
}