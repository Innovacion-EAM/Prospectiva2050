'use client';

import { useEffect, useState } from 'react';

export default function ShareButtons({ titulo }: { titulo?: string }) {
  const [url, setUrl] = useState('');
  const [tituloPagina, setTituloPagina] = useState(titulo || '');
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setUrl(window.location.href);
    setTituloPagina(titulo || document.title);
  }, [titulo]);

  if (!url) return null;

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(tituloPagina);

  const redes = [
    { n: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}` },
    { n: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { n: 'X', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { n: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  ];

  const copiar = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        window.prompt('Copia manualmente el enlace:', url);
      }
      setCopiado(true);
    } catch {
      window.prompt('Copia manualmente el enlace:', url);
      setCopiado(true);
    }
    setTimeout(() => setCopiado(false), 2500);
  };

  return (
    <div className="share-box">
      <span className="share-titulo">Comparte esta noticia:</span>
      <div className="share-botones">
        {redes.map((r) => (
          <a
            key={r.n}
            className="share-btn"
            href={r.href}
            target="_blank"
            rel="noopener"
            aria-label={`Compartir en ${r.n}`}
          >
            {r.n}
          </a>
        ))}
        <button className="share-btn copia" onClick={copiar}>
          {copiado ? '✅ Enlace copiado' : '🔗 Copiar enlace'}
        </button>
      </div>
    </div>
  );
}