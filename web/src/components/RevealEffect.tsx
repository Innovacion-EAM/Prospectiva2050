'use client';

import { useEffect } from 'react';

export default function RevealEffect() {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const observar = () => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));
    };
    observar();

    const mo =
      typeof MutationObserver !== 'undefined'
        ? new MutationObserver(observar)
        : null;
    if (mo) mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      if (mo) mo.disconnect();
    };
  }, []);

  return null;
}