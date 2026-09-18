import Link from 'next/link';
import MailtoForm from '@/components/MailtoForm';
import { fetchConvocatorias } from '@/lib/api';
import { formatearFecha } from '@/lib/format';

const MECANISMOS = [
  { ico: '📝', titulo: 'Consulta ampliada', texto: 'Encuesta ciudadana y espacios digitales para conocer las expectativas del territorio.' },
  { ico: '🗺️', titulo: 'Talleres de cartografía social', texto: 'Jornadas municipales para leer el territorio desde sus fortalezas, retos y oportunidades.' },
  { ico: '🎓', titulo: 'Curso de prospectiva territorial', texto: 'Formación en prospectiva impartida por CEPAL–ILPES a actores del departamento.' },
  { ico: '🧑‍🤝‍🧑', titulo: 'Mesas temáticas por dimensión', texto: 'Espacios sectoriales en las cuatro dimensiones: político-institucional, económico-productiva, físico-ambiental y socio-cultural.' },
  { ico: '📬', titulo: 'Envío de propuestas', texto: 'Un canal abierto para que organizaciones y ciudadanía envíen aportes en cualquier momento.' },
  { ico: '🏛️', titulo: 'Encuentros institucionales', texto: 'Diálogos con Asamblea Departamental, alcaldías, sector empresarial y academia.' },
];

export default async function Participa() {
  const convocatorias = await fetchConvocatorias();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Miga de pan">
            <Link href="/">Inicio</Link>
            <span />
            <span>Participa</span>
          </nav>
          <h1>Participa</h1>
          <p>
            La visión del Quindío 2050 se construye con cientos de voces. Abre
            espacios de consulta, talleres participativos, mesas temáticas y
            canales para enviar tus propuestas.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="t-porque">
        <div className="container">
          <div className="grid-2">
            <div className="reveal">
              <p className="section-label">Participación ciudadana</p>
              <h2 className="section-title" id="t-porque">
                Tu voz es parte del diagnóstico
              </h2>
              <p>
                Más de 600 ciudadanos ya han participado en talleres de
                construcción colectiva, cartografía social y mesas temáticas en
                los 12 municipios del departamento. Cada aporte se convierte en
                un insumo del diagnóstico territorial y de la formulación de la
                Visión Quindío 2050.
              </p>
              <p style={{ marginTop: '16px' }}>
                Queremos que la visión sea el resultado de cientos de voces y no
                de unas pocas decisiones, porque el futuro del departamento debe
                construirse entre todos.
              </p>
            </div>
            <div
              className="cta-panel reveal"
              id="encuesta"
              style={{ padding: '34px 30px' }}
            >
              <p className="section-label section-label--dark">Encuesta ciudadana</p>
              <h2 style={{ color: '#fff', fontSize: '1.5rem' }}>
                Encuesta Ciudadana Prospectiva
              </h2>
              <p style={{ fontSize: '0.98rem' }}>
                Una consulta digital abierta a los habitantes de los doce
                municipios para conocer percepciones, prioridades y propuestas
                para el Quindío del futuro.
              </p>
              <p style={{ marginTop: '14px', fontSize: '0.92rem' }}>
                <strong>¿Cómo participar?</strong> Escanea el código QR de las
                piezas oficiales de la campaña o ingresa al enlace habilitado
                por el proyecto.
              </p>
              <p style={{ marginTop: '12px' }}>
                <span className="chip">Enlace oficial — próximamente</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="t-mecanismos">
        <div className="container">
          <div className="section-head">
            <p className="section-label">Mecanismos</p>
            <h2 className="section-title" id="t-mecanismos">
              Espacios abiertos a toda la ciudadanía
            </h2>
            <p className="section-intro">
              El proceso avanza a través de una consulta ampliada con
              acompañamiento metodológico de la CEPAL, a través del ILPES.
            </p>
          </div>
          <div className="grid-3">
            {MECANISMOS.map((m) => (
              <div className="card card--verde reveal" key={m.titulo}>
                <div className="card-icon card-icon--verde">{m.ico}</div>
                <h3>{m.titulo}</h3>
                <p>{m.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="t-enviar">
        <div className="container">
          <div className="grid-2">
            <div className="reveal">
              <p className="section-label">Envío de propuestas</p>
              <h2 className="section-title" id="t-enviar">
                Comparte tu aporte con el proyecto
              </h2>
              <p>
                Envía propuestas, ideas o experiencias que consideres importantes
                para la construcción de la visión de futuro del Quindío. Tu
                mensaje se remitirá al equipo del proyecto para ser tenido en
                cuenta en los espacios de trabajo.
              </p>
              <ul style={{ marginTop: '16px' }}>
                <li>Tu aporte será recibido por el equipo coordinador.</li>
                <li>
                  Los insumos se incorporan a los espacios temáticos
                  correspondientes.
                </li>
                <li>Tus datos se usarán únicamente para la gestión del proyecto.</li>
              </ul>
            </div>
            <MailtoForm tipo="propuesta" />
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="t-convocatorias">
        <div className="container">
          <div className="section-head">
            <p className="section-label">Convocatorias</p>
            <h2 className="section-title" id="t-convocatorias">
              Convocatorias y espacios activos
            </h2>
            <p className="section-intro">
              Aquí se publicarán convocatorias abiertas, llamados a inscripción y
              próximos espacios de participación del proceso.
            </p>
          </div>
          <div className="card reveal" aria-live="polite">
            {convocatorias.length ? (
              <div className="grid-2">
                {convocatorias.map((c) => (
                  <div className="card card--verde" key={c.id}>
                    <div className="news-meta">
                      {c.fecha ? (
                        <span className="chip chip--cat">
                          🗓 {formatearFecha(c.fecha)}
                        </span>
                      ) : null}
                    </div>
                    <h3 style={{ marginTop: '10px' }}>{c.titulo}</h3>
                    {c.descripcion ? (
                      <p style={{ marginTop: '6px' }}>{c.descripcion}</p>
                    ) : null}
                    {c.enlace ? (
                      <p style={{ marginTop: '12px' }}>
                        <a
                          className="btn btn--primary btn--sm"
                          href={c.enlace}
                          target="_blank"
                          rel="noopener"
                        >
                          Inscripción / más información
                        </a>
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="ico-big">📢</span>
                <h3>Próximamente</h3>
                <p>
                  En este momento no hay convocatorias abiertas. Sigue las
                  noticias del proyecto para conocer los próximos talleres y
                  encuentros.
                </p>
                <p style={{ marginTop: '14px' }}>
                  <a className="btn btn--primary btn--sm" href="/avances">
                    Ver noticias del proyecto
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}