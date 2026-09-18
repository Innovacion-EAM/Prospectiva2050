'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/el-proyecto', label: 'El proyecto' },
  { href: '/ejes', label: 'Ejes y misiones' },
  { href: '/avances', label: 'Avances' },
  { href: '/participa', label: 'Participa' },
  { href: '/repositorio', label: 'Repositorio' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="container header-inner">
        <Link
          className="brand"
          href="/"
          aria-label="Horizonte Quindío Prospectiva 2050 — Inicio"
        >
          <img
            src="/logo.svg"
            alt="Logo de Horizonte Quindío Prospectiva 2050"
            width={44}
            height={44}
          />
          <span>
            <span className="brand-name">Horizonte Quindío</span>
            <span className="brand-sub">Prospectiva 2050</span>
          </span>
        </Link>
        <nav className="nav" aria-label="Navegación principal">
          <ul className="nav-list">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  className={`nav-link${isActive(l.href) ? ' active' : ''}`}
                  href={l.href}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="btn btn--accent btn--sm nav-cta" href="/participa">
                Participa
              </Link>
            </li>
          </ul>
        </nav>
        <button
          className={`nav-toggle${open ? ' open' : ''}`}
          aria-label="Abrir menú de navegación"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`mobile-nav${open ? ' open' : ''}`}>
          <ul className="nav-list">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  className={`nav-link${isActive(l.href) ? ' active' : ''}`}
                  href={l.href}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="nav-cta">
              <Link
                className="btn btn--accent btn--sm"
                href="/participa"
                onClick={() => setOpen(false)}
              >
                Participa
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}