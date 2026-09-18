const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

export function formatearFecha(iso: string): string {
  const partes = iso.split('-');
  if (partes.length !== 3) return iso;
  const dia = parseInt(partes[2], 10);
  const mes = parseInt(partes[1], 10);
  if (!Number.isFinite(dia) || !Number.isFinite(mes) || mes < 1 || mes > 12) return iso;
  return `${dia} ${MESES[mes - 1]} ${partes[0]}`;
}