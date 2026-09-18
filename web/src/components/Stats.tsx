'use client';

import { useEffect, useRef } from 'react';

export interface StatItem {
  count: number;
  label: string;
  sufijo?: string;
}

const DATOS_DEFAULT: StatItem[] = [
  { count: 14, label: 'Organizaciones aliadas' },
  { count: 12, label: 'Municipios del Quindío' },
  { count: 4, label: 'Dimensiones de análisis' },
  { count: 600, label: 'Ciudadanos vinculados', sufijo: '+' },
  { count: 520, label: 'Documentos analizados', sufijo: '+' },
  { count: 359, label: 'Expertos del Panel' },
];

export default function Stats({ items = DATOS_DEFAULT }: { items?: StatItem[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;

    const animar = (el: HTMLElement) => {
      const fin = parseInt(el.dataset.count || '0', 10);
      const sufijo = el.dataset.sufijo || '';
      const dur = 1400;
      const t0 = performance.now();
      const paso = (t: number) => {
        const p = Math.min((t - t0) / dur, 1);
        const easing = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(fin * easing).toLocaleString('es-CO') + sufijo;
        if (p < 1) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            animar(el);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );

    root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <div className="stats" ref={ref}>
      {items.map((it, i) => (
        <div className="stat reveal" key={`${i}-${it.label}`}>
          <div className="stat-number">
            <span data-count={it.count} data-sufijo={it.sufijo || ''}>
              0
            </span>
          </div>
          <div className="stat-label">{it.label}</div>
        </div>
      ))}
    </div>
  );
}