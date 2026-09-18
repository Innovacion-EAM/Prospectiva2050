'use client';

import { useEffect, useState } from 'react';

interface TiempoRestante {
  d: string;
  h: string;
  m: string;
  s: string;
}

const INICIAL: TiempoRestante = { d: '00', h: '00', m: '00', s: '00' };

export default function Contador2050() {
  const [t, setT] = useState<TiempoRestante>(INICIAL);

  useEffect(() => {
    const meta = new Date(2050, 0, 1, 0, 0, 0).getTime();
    const calcular = () => {
      let diff = meta - Date.now();
      if (diff < 0) diff = 0;
      const s = Math.floor(diff / 1000);
      setT({
        d: String(Math.floor(s / 86400)).padStart(2, '0'),
        h: String(Math.floor((s % 86400) / 3600)).padStart(2, '0'),
        m: String(Math.floor((s % 3600) / 60)).padStart(2, '0'),
        s: String(s % 60).padStart(2, '0'),
      });
    };
    calcular();
    const id = setInterval(calcular, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="countdown" aria-labelledby="t-contador">
      <div className="container countdown-inner">
        <div className="countdown-info">
          <h2 id="t-contador">La cuenta regresiva ya empezó ⏳</h2>
          <p>
            Cada día nos acerca al Quindío que soñamos construir entre todas y
            todos.
            <br />
            <small>
              * Conteo desde el lanzamiento del proyecto (24 de marzo de 2026)
              hasta el 1 de enero de 2050.
            </small>
          </p>
        </div>
        <div
          className="cd-grid"
          role="timer"
          aria-label="Cuenta regresiva al 1 de enero de 2050"
        >
          <div className="cd-cell">
            <b>{t.d}</b>
            <span>Días</span>
          </div>
          <div className="cd-cell">
            <b>{t.h}</b>
            <span>Horas</span>
          </div>
          <div className="cd-cell">
            <b>{t.m}</b>
            <span>Min</span>
          </div>
          <div className="cd-cell">
            <b>{t.s}</b>
            <span>Seg</span>
          </div>
        </div>
      </div>
    </section>
  );
}