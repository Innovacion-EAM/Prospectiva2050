import Link from 'next/link';
import Timeline from '@/components/Timeline';

const OBJETIVOS = [
  { ico: '🎯', titulo: 'Visión compartida', texto: 'Construir una visión compartida del Quindío al año 2050.' },
  { ico: '📡', titulo: 'Tendencias e incertidumbres', texto: 'Identificar tendencias, incertidumbres críticas y factores de cambio del territorio.' },
  { ico: '🔎', titulo: 'Análisis basado en evidencia', texto: 'Analizar el presente y proyectar escenarios de futuro con base en evidencia.' },
  { ico: '🧩', titulo: 'Insumos estratégicos', texto: 'Generar insumos técnicos y estratégicos para la toma de decisiones.' },
  { ico: '🔗', titulo: 'Articulación territorial', texto: 'Fortalecer la articulación entre instituciones, sectores y actores territoriales.' },
  { ico: '🌱', titulo: 'Capacidades instaladas', texto: 'Instalar capacidades prospectivas en el departamento para dar continuidad al proceso.' },
];

const GOBERNANZA = [
  { ico: '🏛️', titulo: 'Comité Directivo', texto: 'Instancia máxima de orientación estratégica, decisión y aprobación de los productos del proyecto.' },
  { ico: '🧑‍🔬', titulo: 'Comité Técnico', texto: 'Instancia de asesoría especializada y seguimiento técnico de las actividades y entregables.' },
  { ico: '🧑‍💻', titulo: 'Equipo Núcleo', texto: 'Unidad técnico-operativa responsable del desarrollo integral del estudio y su implementación.' },
];

const ALIADOS = [
  { ico: 'UQ', nombre: 'Universidad del Quindío' },
  { ico: 'GC', nombre: 'Universidad La Gran Colombia' },
  { ico: 'EAM', nombre: 'Institución Universitaria EAM' },
  { ico: 'SU', nombre: 'SUEJE' },
  { ico: 'CC', nombre: 'Comité de Cafeteros del Quindío' },
  { ico: 'CI', nombre: 'Comité Intergremial del Quindío' },
  { ico: 'PQ', nombre: 'ProQuindío' },
  { ico: 'CC', nombre: 'Cámara de Comercio de Armenia y del Quindío' },
  { ico: 'FA', nombre: 'Facilísimo' },
  { ico: 'CF', nombre: 'Comfenalco Quindío' },
  { ico: 'ED', nombre: 'Empresa de Energía del Quindío (EDEQ)' },
  { ico: 'CR', nombre: 'Corporación Autónoma Regional del Quindío (CRQ)' },
  { ico: 'AA', nombre: 'Alcaldía de Armenia' },
  { ico: 'GQ', nombre: 'Gobernación del Quindío' },
];

const ENFOQUE = [
  { ico: '🗺️', titulo: 'Contexto', texto: 'Analizar el contexto actual del Quindío.' },
  { ico: '📈', titulo: 'Tendencias', texto: 'Identificar tendencias globales, nacionales y locales.' },
  { ico: '⚠️', titulo: 'Señales débiles', texto: 'Reconocer señales débiles e incertidumbres críticas.' },
  { ico: '🔮', titulo: 'Escenarios', texto: 'Construir escenarios de futuro.' },
  { ico: '🌟', titulo: 'Visión', texto: 'Definir una visión de largo plazo.' },
  { ico: '🧭', titulo: 'Hoja de ruta', texto: 'Formular una hoja de ruta estratégica.' },
];

export default function ElProyecto() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Miga de pan">
            <Link href="/">Inicio</Link>
            <span />
            <span>El proyecto</span>
          </nav>
          <h1>El proyecto</h1>
          <p>
            Un estudio y proceso de construcción colectiva para definir una
            visión de largo plazo del Quindío: comprender las transformaciones,
            anticipar escenarios y formular una hoja de ruta para la toma de
            decisiones.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="t-que-es">
        <div className="container">
          <div className="grid-2">
            <div className="reveal">
              <p className="section-label">¿Qué es?</p>
              <h2 className="section-title" id="t-que-es">
                Horizonte Quindío Prospectiva 2050
              </h2>
              <p>
                Es un estudio y proceso de construcción colectiva orientado a
                definir una visión de largo plazo para el departamento del
                Quindío. Su propósito es{' '}
                <strong>
                  anticipar transformaciones, identificar desafíos estratégicos y
                  formular una hoja de ruta
                </strong>{' '}
                que fortalezca la toma de decisiones públicas, institucionales,
                académicas y territoriales.
              </p>
              <p style={{ marginTop: '16px' }}>
                El proyecto se desarrolla en el marco de una alianza
                multiinstitucional y cuenta con una estructura de gobernanza que
                garantiza orientación estratégica, acompañamiento técnico,
                articulación institucional y participación ampliada.
              </p>
            </div>
            <aside className="card card--verde reveal">
              <div className="card-icon card-icon--verde">🤝</div>
              <h3>Un ejercicio construido entre todos</h3>
              <ul>
                <li>
                  <strong>14 organizaciones</strong> integran la alianza
                  interinstitucional.
                </li>
                <li>
                  Convenio de cooperación con la <strong>CEPAL</strong>{' '}
                  (Universidad del Quindío, en representación de 11 entidades).
                </li>
                <li>
                  Acompañamiento metodológico del <strong>ILPES</strong>,
                  referente latinoamericano en prospectiva.
                </li>
                <li>
                  Más de dos décadas después del último ejercicio prospectivo del
                  departamento.
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="t-justificacion">
        <div className="container">
          <div className="grid-2">
            <div className="card card--azul reveal">
              <div className="card-icon card-icon--azul">⚖️</div>
              <h3 className="section-title" id="t-justificacion" style={{ marginBottom: '10px' }}>
                Justificación
              </h3>
              <p style={{ color: 'var(--gris-700)' }}>
                El Quindío necesita una mirada de futuro que permita comprender
                sus transformaciones, sus oportunidades y sus riesgos en un
                contexto cambiante. Horizonte Quindío 2050 responde a esa
                necesidad mediante un ejercicio riguroso, participativo y
                territorialmente representativo, capaz de integrar voces
                institucionales, sectoriales, comunitarias y académicas.
              </p>
            </div>
            <div
              className="reveal"
              style={{ background: 'var(--verde-claro)', borderRadius: 'var(--radio)', padding: '30px' }}
            >
              <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>
                Este proceso es clave para
              </h3>
              <ul>
                <li>Fortalecer la planeación de largo plazo del departamento.</li>
                <li>Promover la articulación entre organizaciones aliadas.</li>
                <li>
                  Generar insumos útiles para políticas, estrategias y decisiones
                  con impacto en el territorio.
                </li>
                <li>Dejar capacidad instalada de prospectiva en el Quindío.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="t-objetivos">
        <div className="container">
          <div className="section-head">
            <p className="section-label">Objetivos</p>
            <h2 className="section-title" id="t-objetivos">
              Hacia dónde apunta el proyecto
            </h2>
          </div>
          <div className="grid-3">
            {OBJETIVOS.map((o) => (
              <div className="card card--verde reveal" key={o.titulo}>
                <div className="card-icon card-icon--verde">{o.ico}</div>
                <h3>{o.titulo}</h3>
                <p>{o.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="t-gobernanza">
        <div className="container">
          <div className="section-head">
            <p className="section-label">Gobernanza</p>
            <h2 className="section-title" id="t-gobernanza">
              Una estructura para garantizar legitimidad y calidad técnica
            </h2>
            <p className="section-intro">
              El proyecto cuenta con una estructura de gobernanza diseñada para
              garantizar legitimidad, coordinación y calidad técnica en cada
              etapa del proceso.
            </p>
          </div>
          <div className="grid-3">
            {GOBERNANZA.map((g) => (
              <div className="card card--azul reveal" key={g.titulo}>
                <div className="card-icon card-icon--azul">{g.ico}</div>
                <h3>{g.titulo}</h3>
                <p>{g.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="t-aliados">
        <div className="container">
          <div className="section-head">
            <p className="section-label">Aliados</p>
            <h2 className="section-title" id="t-aliados">
              14 organizaciones comprometidas con el futuro del Quindío
            </h2>
            <p className="section-intro">
              Esta alianza interinstitucional aporta capacidad técnica,
              legitimidad territorial, experiencia sectorial y respaldo para que
              el proceso tenga continuidad y sentido estratégico.
            </p>
          </div>
          <div className="aliados-grid">
            {ALIADOS.map((a) => (
              <div className="aliado reveal" key={a.nombre}>
                <div className="aliado-ico">{a.ico}</div>
                <span>{a.nombre}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="t-enfoque">
        <div className="container">
          <div className="section-head">
            <p className="section-label">Enfoque metodológico</p>
            <h2 className="section-title" id="t-enfoque">
              Una metodología prospectiva, territorial y participativa
            </h2>
            <p className="section-intro">
              El estudio se desarrolla bajo un enfoque prospectivo territorial,
              participativo y multidimensional. Su metodología permite:
            </p>
          </div>
          <div className="grid-3">
            {ENFOQUE.map((e) => (
              <div className="card card--lima reveal" key={e.titulo}>
                <div className="card-icon card-icon--lima">{e.ico}</div>
                <h3>{e.titulo}</h3>
                <p>{e.texto}</p>
              </div>
            ))}
          </div>
          <p className="text-center" style={{ marginTop: '26px' }}>
            <span className="chip">➜</span>{' '}
            <span style={{ fontWeight: 600 }}>
              Promover la institucionalización de la prospectiva en el territorio
            </span>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="t-fases">
        <div className="container">
          <div className="section-head">
            <p className="section-label">Línea de tiempo</p>
            <h2 className="section-title" id="t-fases">
              El proceso avanza por fases articuladas
            </h2>
          </div>
          <Timeline />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-panel reveal">
            <p className="section-label section-label--dark">
              Resultados y avances
            </p>
            <h2 style={{ color: '#fff' }}>Sigue la evolución del proceso</h2>
            <p>
              Conoce las noticias, hitos, boletines y memorias del trabajo del
              proyecto y de sus actores aliados.
            </p>
            <div className="btn-row">
              <Link className="btn btn--accent" href="/avances">
                Ver avances y noticias
              </Link>
              <Link className="btn btn--ghost" href="/ejes">
                Ver ejes, misiones y retos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}