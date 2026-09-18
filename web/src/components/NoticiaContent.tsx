import type { Noticia } from '@/lib/types';

export default function NoticiaContent({
  contenido,
}: {
  contenido: Noticia['contenido'];
}) {
  return (
    <div className="article-body">
      {contenido.map((bloque, i) => {
        if (typeof bloque === 'string') return <p key={i}>{bloque}</p>;
        if ('h' in bloque && bloque.h) return <h2 key={i}>{bloque.h}</h2>;
        if ('ul' in bloque && bloque.ul) {
          return (
            <ul key={i}>
              {bloque.ul.map((li, j) => (
                <li key={j}>{li}</li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
}