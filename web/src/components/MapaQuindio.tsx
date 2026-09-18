'use client';

import { useState } from 'react';
import municipios from '@/data/municipios.json';

interface Municipio {
  nombre: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  estado: string;
  personas: number;
  nota: string;
}

const MUNICIPIOS = municipios as Municipio[];

const BORDE = 'M 235 12 L 265 35 L 300 85 L 345 120 L 350 175 L 330 220 L 295 270 L 260 330 L 235 385 L 215 445 L 185 425 L 150 370 L 115 300 L 90 220 L 85 150 L 105 85 L 155 35 Z';
const ADORNO = 'M 330 78 L 322 130 L 302 166';

export default function MapaQuindio() {
  const inicial = MUNICIPIOS.find((m) => m.estado === 'realizado') || MUNICIPIOS[0];
  const [sel, setSel] = useState<Municipio>(inicial);

  return (
    <div className="mapa-wrap">
      <div className="mapa-card reveal">
        <svg
          id="mapa-svg"
          viewBox="0 0 420 470"
          role="group"
          aria-label="Mapa esquemático de los municipios del Quindío"
        >
          <path className="mp-borde" d={BORDE} />
          <path className="mp-adorno" d={ADORNO} />
          {MUNICIPIOS.map((m) => (
            <g
              key={m.nombre}
              className="mp-g"
              role="button"
              tabIndex={0}
              aria-label={`Municipio ${m.nombre}`}
              onClick={() => setSel(m)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSel(m);
                }
              }}
            >
              {m.estado === 'realizado' ? (
                <>
                  <circle className="mp-punto mp-on" cx={m.x} cy={m.y} r={11} />
                  <circle className="mp-halo" cx={m.x} cy={m.y} r={16} />
                </>
              ) : (
                <circle className="mp-punto mp-off" cx={m.x} cy={m.y} r={9} />
              )}
              <text className="mp-label" x={m.x + m.dx} y={m.y + m.dy}>
                {m.nombre}
              </text>
            </g>
          ))}
        </svg>
        <div className="mapa-leyenda">
          <span>
            <i style={{ background: 'var(--verde)' }}></i> Taller realizado
          </span>
          <span>
            <i style={{ background: 'var(--gris-300)' }}></i> En programación
          </span>
        </div>
      </div>
      <aside className="mapa-info reveal" aria-live="polite">
        <div className="mp-titulo">{sel.nombre}</div>
        <p className={`mp-estado ${sel.estado === 'realizado' ? 'ok' : 'pend'}`}>
          {sel.estado === 'realizado'
            ? '✔ Taller realizado'
            : '◌ Espacio en programación'}
        </p>
        {sel.personas ? (
          <p className="mp-personas">
            <strong>{sel.personas}+</strong> personas participaron
          </p>
        ) : null}
        <p className="mp-nota">{sel.nota}</p>
      </aside>
    </div>
  );
}