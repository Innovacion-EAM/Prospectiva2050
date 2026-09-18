function idSeguro(texto: string): string {
  const limpio = texto
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
    .slice(0, 12);
  return limpio || 'noticia';
}

export function placeholderSVG(categoria?: string): string {
  const etiqueta = (categoria || 'Noticia').toUpperCase();
  const lid = `ph-grad-${idSeguro(etiqueta)}`;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${etiqueta}" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">` +
    `<defs><linearGradient id="${lid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00703A"/><stop offset="1" stop-color="#005475"/></linearGradient></defs>` +
    `<rect width="100%" height="100%" fill="url(#${lid})"/>` +
    `<circle cx="82%" cy="18%" r="60" fill="none" stroke="rgba(209,254,20,0.35)" stroke-width="2" stroke-dasharray="8 10"/>` +
    `<circle cx="88%" cy="80%" r="34" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-dasharray="6 8"/>` +
    `<circle cx="8%" cy="86%" r="110" fill="rgba(255,255,255,0.05)"/>` +
    `<circle cx="16%" cy="70%" r="7" fill="#D1FE14"/>` +
    `<circle cx="26%" cy="60%" r="5" fill="rgba(255,255,255,0.6)"/>` +
    `<circle cx="34%" cy="68%" r="4" fill="rgba(255,255,255,0.4)"/>` +
    `<text x="50%" y="48%" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-weight="800" font-size="38" fill="#D1FE14">${etiqueta}</text>` +
    `<text x="50%" y="56%" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-weight="700" font-size="14" fill="rgba(255,255,255,0.85)">PROSPECTIVA 2050 — QUINDÍO</text>` +
    `</svg>`
  );
}