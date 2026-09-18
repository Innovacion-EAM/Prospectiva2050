'use client';

import { useState } from 'react';
import fases from '@/data/fases.json';

interface Fase {
  num: string;
  titulo: string;
  descripcion: string;
  fechas: string;
  estado: string;
}

const FASES = fases as Fase[];

const ETIQUETAS: Record<string, string> = {
  completada: 'Completada',
  actual: 'Fase actual',
  siguiente: 'Por venir',
};

const MARCADORES: Record<string, string> = {
  completada: '✅',
  actual: '🟢',
  siguiente: '◌',
};

const PUNTO: Record<string, string> = {
  completada: '✓',
  actual: '●',
  siguiente: '○',
};

export default function Timeline() {
  const idxInicial = Math.max(
    FASES.findIndex((f) => f.estado === 'actual'),
    0
  );
  const [sel, setSel] = useState(idxInicial);
  const fase = FASES[sel];

  return (
    <>
      <div
        className="timeline-proceso"
        role="tablist"
        aria-label="Fases del proceso prospectivo"
      >
        {FASES.map((f, i) => (
          <button
            key={f.num}
            className={`tl-nodo ${f.estado}${i === sel ? ' activo' : ''}`}
            data-fase={i}
            aria-pressed={i === sel}
            onClick={() => setSel(i)}
          >
            <span className="tl-nodo-punto">{PUNTO[f.estado] || f.num}</span>
            <span className="tl-nodo-titulo">{f.titulo}</span>
            {f.estado === 'actual' ? (
              <span className="tl-actual-badge">Estamos aquí</span>
            ) : null}
            {f.estado === 'completada' ? (
              <span className="tl-estado-badge">Completada</span>
            ) : null}
          </button>
        ))}
      </div>
      <div className="tl-detalle" aria-live="polite">
        <span className="chip chip--cat">
          {MARCADORES[fase.estado]} {ETIQUETAS[fase.estado]}
        </span>
        <h3>
          Fase {fase.num} · {fase.titulo}
        </h3>
        <p>{fase.descripcion}</p>
        <p className="tl-fechas">🗓 {fase.fechas}</p>
      </div>
      <p className="text-center" style={{ marginTop: '24px', color: 'var(--gris-500)', fontSize: '0.88rem' }}>
        Haz clic en cada fase para ver su detalle. El proyecto se encuentra hoy
        en la <strong>Fase II — Diagnóstico</strong>.
      </p>
    </>
  );
}