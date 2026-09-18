import Link from 'next/link';

const DIMENSIONES = [
  {
    id: 'dim-politico',
    num: '01',
    titulo: 'Dimensión Político-institucional',
    cls: '',
    intro:
      'Este eje analiza la gobernanza territorial, la institucionalidad pública y privada, la planeación, la participación ciudadana, la seguridad pública y la capacidad de coordinación entre organizaciones.',
    retos: [
      'Fortalecer la articulación institucional entre niveles de gobierno y actores del territorio.',
      'Mejorar la capacidad de planeación pública y seguimiento a largo plazo.',
      'Promover una gobernanza más abierta, coordinada y participativa.',
      'Integrar la vigilancia tecnológica y el análisis de tendencias en la toma de decisiones.',
    ],
    lineas: [
      'Gobernanza territorial y ejercicio político.',
      'Institucionalidad pública y gremial.',
      'Planeación y gestión territorial.',
      'Participación ciudadana y control social.',
      'Seguridad pública y gobernabilidad.',
    ],
  },
  {
    id: 'dim-economico',
    num: '02',
    titulo: 'Dimensión Económico-productiva',
    cls: 'dimension--azul',
    intro:
      'Este eje examina la estructura económica del Quindío, con énfasis en caficultura, turismo, agroindustria, nuevas economías, emprendimiento, innovación, transición productiva y transformación digital.',
    retos: [
      'Diversificar y fortalecer la base productiva del departamento.',
      'Potenciar cadenas de valor con mayor innovación y competitividad.',
      'Anticipar los efectos de la automatización, la inteligencia artificial y la transición energética.',
      'Consolidar apuestas productivas estratégicas con visión de largo plazo.',
    ],
    lineas: [
      'Caficultura y agroindustria.',
      'Turismo y economía creativa.',
      'Bioeconomía y economía del cuidado.',
      'Inteligencia artificial y transformación digital productiva.',
      'Emprendimiento, innovación y economía circular.',
    ],
  },
  {
    id: 'dim-ambiental',
    num: '03',
    titulo: 'Dimensión Físico-ambiental',
    cls: 'dimension--tl',
    intro:
      'Este eje aborda el sistema físico-biótico del departamento, el cambio climático, los recursos hídricos, la biodiversidad, la gestión del riesgo, el ordenamiento territorial, la movilidad, la infraestructura y la sostenibilidad ambiental.',
    retos: [
      'Proteger y regenerar los ecosistemas estratégicos del territorio.',
      'Reducir vulnerabilidades frente al cambio climático y el riesgo.',
      'Articular el desarrollo urbano, la infraestructura y el ordenamiento territorial.',
      'Integrar herramientas SIG y análisis espacial para mejorar la lectura territorial.',
    ],
    lineas: [
      'Cambio climático y adaptación territorial.',
      'Biodiversidad y sostenibilidad ecosistémica.',
      'Recursos hídricos y gestión ambiental.',
      'Ordenamiento territorial y desarrollo urbano.',
      'Infraestructura, vivienda, servicios públicos y gestión del riesgo.',
    ],
  },
  {
    id: 'dim-social',
    num: '04',
    titulo: 'Dimensión Socio-cultural',
    cls: 'dimension--soc',
    intro:
      'Este eje analiza la estructura social del Quindío, la calidad de vida, la educación, la salud, la equidad, las identidades territoriales, la juventud, la diversidad y la cohesión social.',
    retos: [
      'Mejorar el bienestar, la inclusión y la calidad de vida.',
      'Reconocer la diversidad social, cultural y generacional del territorio.',
      'Fortalecer la participación de comunidades y grupos poblacionales diversos.',
      'Incorporar las voces del territorio en la construcción de futuro.',
    ],
    lineas: [
      'Salud y calidad de vida.',
      'Educación y comunidad educativa.',
      'Demografía e inclusión social.',
      'Género, diversidad e identidades.',
      'Juventud, cultura, historia, artes, deporte y convivencia.',
    ],
  },
];

const MISIONES = [
  { ico: '🔍', titulo: 'Misión de diagnóstico', texto: 'Comprender el presente del Quindío con rigor técnico y territorial.' },
  { ico: '🌟', titulo: 'Misión de visión', texto: 'Construir una aspiración compartida de futuro al 2050.' },
  { ico: '🔮', titulo: 'Misión de escenarios', texto: 'Explorar futuros posibles y sus implicaciones.' },
  { ico: '🧭', titulo: 'Misión estratégica', texto: 'Convertir la visión en prioridades, acciones y hoja de ruta.' },
  { ico: '🏗️', titulo: 'Misión de institucionalización', texto: 'Dejar capacidad instalada para que el proceso continúe en el tiempo.' },
];

const TRANSVERSALES = [
  { ico: '🗣️', titulo: 'Participación amplia', texto: 'Garantizar participación amplia, representativa y continua.' },
  { ico: '🔄', titulo: 'Lenguaje claro', texto: 'Traducir el lenguaje técnico a mensajes claros para la ciudadanía.' },
  { ico: '🗄️', titulo: 'Memoria y trazabilidad', texto: 'Mantener memoria, trazabilidad y acceso ordenado a la información.' },
  { ico: '🤝', titulo: 'Continuidad institucional', texto: 'Asegurar continuidad institucional más allá del convenio.' },
  { ico: '💻', titulo: 'Web como herramienta viva', texto: 'Hacer del sitio web una herramienta viva de comunicación, consulta y divulgación.' },
];

export default function Ejes() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Miga de pan">
            <Link href="/">Inicio</Link>
            <span />
            <span>Ejes y misiones</span>
          </nav>
          <h1>Ejes, misiones y retos</h1>
          <p>
            El análisis del Quindío se ordena en cuatro dimensiones temáticas.
            Cada una describe retos, líneas de trabajo y hallazgos que alimentan
            la construcción de la visión de futuro del departamento.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="t-dimensiones">
        <div className="container">
          <div className="section-head">
            <p className="section-label">Dimensiones de análisis</p>
            <h2 className="section-title" id="t-dimensiones">
              Cuatro miradas sobre el territorio
            </h2>
            <p className="section-intro">
              El estudio prospectivo del Quindío se desarrolla bajo un enfoque
              multidimensional que integra la dimensión político-institucional,
              la económico-productiva, la físico-ambiental y la socio-cultural,
              articulando conocimientos técnicos, institucionales y ciudadanos.
            </p>
          </div>

          {DIMENSIONES.map((d) => (
            <article
              className={`dimension reveal ${d.cls}`}
              id={d.id}
              key={d.id}
            >
              <div className="dimension-head">
                <div className="dimension-num">{d.num}</div>
                <h3>{d.titulo}</h3>
              </div>
              <p style={{ color: 'var(--gris-700)' }}>{d.intro}</p>
              <div className="dimension-grid">
                <div className="box box--retos">
                  <h4>
                    <span className="ico">⚡</span> Retos principales
                  </h4>
                  <ul>
                    {d.retos.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div className="box box--lineas">
                  <h4>
                    <span className="ico">🧭</span> Líneas de trabajo
                  </h4>
                  <ul>
                    {d.lineas.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="t-misiones">
        <div className="container">
          <div className="section-head">
            <p className="section-label">Misiones del proceso</p>
            <h2 className="section-title" id="t-misiones">
              Cinco misiones para recorrer la ruta al 2050
            </h2>
          </div>
          <div className="grid-3">
            {MISIONES.map((m) => (
              <div className="card card--verde reveal" key={m.titulo}>
                <div className="card-icon card-icon--verde">{m.ico}</div>
                <h3>{m.titulo}</h3>
                <p>{m.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="t-transversales">
        <div className="container">
          <div className="section-head">
            <p className="section-label">Retos transversales</p>
            <h2 className="section-title" id="t-transversales">
              Desafíos que atraviesan todo el proceso
            </h2>
          </div>
          <div className="grid-2">
            {TRANSVERSALES.map((t) => (
              <div className="card card--lima reveal" key={t.titulo}>
                <div className="card-icon card-icon--lima">{t.ico}</div>
                <h3>{t.titulo}</h3>
                <p>{t.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-panel reveal">
            <p className="section-label section-label--dark">Participa</p>
            <h2 style={{ color: '#fff' }}>
              Contar tu visión del territorio suma al diagnóstico
            </h2>
            <p>
              Los talleres municipales, las mesas temáticas y la encuesta
              ciudadana recogen las voces de cada dimensión y cada subregión del
              Quindío.
            </p>
            <div className="btn-row">
              <Link className="btn btn--accent" href="/participa">
                Conoce cómo participar
              </Link>
              <Link className="btn btn--ghost" href="/avances">
                Ver lo que se ha construido
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}