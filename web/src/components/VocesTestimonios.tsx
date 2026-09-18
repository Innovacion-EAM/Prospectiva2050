'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import testimonios from '@/data/testimonios.json';

interface Voz {
  frase: string;
  autor: string;
  rol: string;
  lugar: string;
  tipo: string;
}

const TESTIMONIOS = testimonios as Voz[];

const TIPOS = [
  'Todas',
  ...Array.from(new Set(TESTIMONIOS.map((t) => t.tipo))),
];

const ANCHO_PASO = 400 + 24;

export default function VocesTestimonios() {
  const pistaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [filtro, setFiltro] = useState('Todas');
  const [pausado, setPausado] = useState(false);

  const activas =
    filtro === 'Todas'
      ? TESTIMONIOS
      : TESTIMONIOS.filter((t) => t.tipo === filtro);

  const paso = useCallback(() => {
    const el = pistaRef.current;
    if (!el || !el.children.length) return;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: ANCHO_PASO, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (pistaRef.current) pistaRef.current.scrollTo({ left: 0 });
  }, [activas]);

  useEffect(() => {
    if (pausado) return;
    timerRef.current = setInterval(paso, 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paso, pausado]);

  return (
    <div className="voces">
      <div className="filters" role="group" aria-label="Filtrar testimonios">
        {TIPOS.map((t) => (
          <button
            key={t}
            className={`filter-btn${filtro === t ? ' active' : ''}`}
            data-voz={t}
            onClick={() => setFiltro(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="voces-vista">
        <div
          className="voces-pista"
          ref={pistaRef}
          onMouseEnter={() => setPausado(true)}
          onMouseLeave={() => setPausado(false)}
        >
          {activas.map((t, i) => (
            <figure className="voz-card" data-tipo={t.tipo} key={i}>
              <blockquote>“{t.frase}”</blockquote>
              <figcaption>
                <strong>{t.autor}</strong>
                <span>{t.rol}</span>
                <span className="chip chip--cat">{t.lugar}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="voces-nav">
          <button
            aria-label="Testimonio anterior"
            onClick={() =>
              pistaRef.current?.scrollBy({ left: -ANCHO_PASO, behavior: 'smooth' })
            }
          >
            ←
          </button>
          <button aria-label="Siguiente testimonio" onClick={paso}>
            →
          </button>
        </div>
      </div>
    </div>
  );
}