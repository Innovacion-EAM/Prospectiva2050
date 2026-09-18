'use client';

import { useMemo, useState } from 'react';
import type { Documento } from '@/lib/types';

const TIPOS = [
  'Estudio sectorial',
  'Informe',
  'Plan de desarrollo',
  'Artículo científico',
  'Presentación',
  'Acta',
  'Memorias',
];

const DELIMITACIONES = ['Departamental', 'Municipal', 'Nacional', 'Internacional'];

function fechaCorta(iso: string): string {
  return iso.slice(0, 10);
}

export default function RepositorioDocs({
  initialDocumentos,
}: {
  initialDocumentos: Documento[];
}) {
  const [tipo, setTipo] = useState('todos');
  const [del, setDel] = useState('todos');
  const [termino, setTermino] = useState('');

  const lista = useMemo(() => {
    let l = initialDocumentos.slice();
    if (tipo !== 'todos') l = l.filter((d) => d.tipo === tipo);
    if (del !== 'todos') l = l.filter((d) => d.delimitacion === del);
    const t = termino.trim().toLowerCase();
    if (t) {
      l = l.filter(
        (d) =>
          d.titulo.toLowerCase().includes(t) || d.autor.toLowerCase().includes(t)
      );
    }
    return l;
  }, [initialDocumentos, tipo, del, termino]);

  return (
    <>
      <div className="portal-toolbar reveal">
        <div className="search-box">
          <input
            type="search"
            placeholder="Buscar por título o autor…"
            aria-label="Buscar en el repositorio"
            value={termino}
            onChange={(e) => setTermino(e.target.value)}
          />
        </div>
        <div className="filters">
          <select
            className="form-field"
            aria-label="Filtrar por tipo de documento"
            style={{ padding: '10px 16px', minWidth: '200px', borderRadius: '999px' }}
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="todos">Tipo: todos</option>
            {TIPOS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select
            className="form-field"
            aria-label="Filtrar por delimitación espacial"
            style={{ padding: '10px 16px', minWidth: '200px', borderRadius: '999px' }}
            value={del}
            onChange={(e) => setDel(e.target.value)}
          >
            <option value="todos">Alcance: todos</option>
            {DELIMITACIONES.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-wrap reveal">
        <table className="table">
          <caption
            style={{ position: 'absolute', left: '-9999px' }}
          >
            Documentos del repositorio de Horizonte Quindío Prospectiva 2050
          </caption>
          <thead>
            <tr>
              <th>No.</th>
              <th>Título del documento</th>
              <th>Autor(es)</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Delimitación</th>
              <th>Formato</th>
              <th>Acceso</th>
            </tr>
          </thead>
          <tbody>
            {lista.length ? (
              lista.map((d, i) => (
                <tr key={d.id}>
                  <td>{i + 1}</td>
                  <td className="doc-titulo">{d.titulo}</td>
                  <td>{d.autor}</td>
                  <td>{fechaCorta(d.fecha)}</td>
                  <td>{d.tipo}</td>
                  <td>{d.delimitacion}</td>
                  <td>{(d.formato || 'PDF').toUpperCase()}</td>
                  <td>
                    {d.link ? (
                      <a
                        className="btn btn--primary btn--sm"
                        href={d.link}
                        target="_blank"
                        rel="noopener"
                      >
                        Descargar
                      </a>
                    ) : (
                      <span className="chip">Próximamente</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>
                  <div className="empty-state">
                    <span className="ico-big">📚</span>
                    <h3>El repositorio se está poblando</h3>
                    <p>
                      Los documentos del proceso prospectivo (informes, estudios,
                      actas y presentaciones) se publicarán aquí de manera
                      continua. Los archivos se alojan en el repositorio del
                      proyecto.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}