import Link from 'next/link';
import Contador2050 from '@/components/Contador2050';
import Stats from '@/components/Stats';
import MapaQuindio from '@/components/MapaQuindio';
import VocesTestimonios from '@/components/VocesTestimonios';
import { fetchNoticias } from '@/lib/api';
import { formatearFecha } from '@/lib/format';
import { placeholderSVG } from '@/lib/placeholder';

export const revalidate = 60;

export default async function Home() {
  const { data } = await fetchNoticias({ perPage: 3 });
  const noticias = data.slice(0, 3);

  return (
    <>
      <section className="hero" aria-label="Presentación del proyecto">
        <img className="hero-q" src="/logo.svg" alt="" aria-hidden="true" />
        <div className="container">
          <p className="hero-tag">Proyecto territorial · Quindío · Colombia</p>
          <h1 className="hero-title">
            Construyendo una <em>visión compartida</em> para el futuro del
            departamento
          </h1>
          <p className="hero-text">
            Horizonte Quindío Prospectiva 2050 es un proceso territorial de
            largo plazo que reúne a instituciones públicas, academia, sector
            productivo y actores sociales para identificar retos, oportunidades,
            apuestas estratégicas y rutas de acción que orienten el desarrollo
            del departamento hacia el año 2050.
          </p>
          <div className="btn-row">
            <Link className="btn btn--accent" href="/el-proyecto">
              Conoce el proyecto
            </Link>
            <Link className="btn btn--ghost" href="/participa">
              Cómo participar
            </Link>
          </div>
          <div className="hero-meta">
            <span className="chip">14 organizaciones aliadas</span>
            <span className="chip">12 municipios</span>
            <span className="chip">4 dimensiones de análisis</span>
            <span className="chip">CEPAL · ILPES</span>
          </div>
        </div>
      </section>

      <Contador2050 />

      <section className="section" aria-labelledby="t-resena">
        <div className="container">
          <div className="grid-2">
            <div className="reveal">
              <p className="section-label">El proyecto</p>
              <h2 className="section-title" id="t-resena">
                Este sitio es la puerta de entrada oficial al proceso prospectivo
              </h2>
              <p>
                Horizonte Quindío Prospectiva 2050 se desarrolla de manera
                participativa y con soporte técnico especializado. El proyecto
                reúne a instituciones públicas, academia, sector productivo y
                actores sociales para identificar retos, oportunidades, apuestas
                estratégicas y rutas de acción que orienten el desarrollo del
                departamento hacia el año 2050.
              </p>
              <p style={{ marginTop: '16px' }}>
                Aquí encontrarás el propósito del proyecto, sus avances, los
                productos técnicos, las noticias, las convocatorias, las memorias
                de trabajo y los espacios de participación ciudadana.
              </p>
              <div className="btn-row" style={{ marginTop: '26px' }}>
                <Link className="arrow-link" href="/el-proyecto">
                  Ir a El proyecto
                </Link>
                <Link className="arrow-link" href="/avances">
                  Ver los avances
                </Link>
              </div>
            </div>
            <aside className="card card--verde reveal" aria-label="¿Qué encontrarás en el sitio?">
              <div className="card-icon card-icon--verde">🧭</div>
              <h3>Una plataforma viva del proceso</h3>
              <p>
                El sitio funciona como centro de información y relación con la
                ciudadanía, repositorio vivo de contenidos, herramienta de
                transparencia y memoria del proceso prospectivo.
              </p>
              <ul style={{ marginTop: '14px' }}>
                <li>Qué es el proyecto y su metodología</li>
                <li>Cómo avanza el proceso por fases</li>
                <li>Noticias, boletines y documentos</li>
                <li>Espacios para participar y aportar</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="t-prospectiva">
        <div className="container">
          <div className="grid-2">
            <div className="reveal">
              <p className="section-label">Acerca de la prospectiva</p>
              <h2 className="section-title" id="t-prospectiva">
                No se trata de adivinar el futuro: se trata de construirlo
              </h2>
              <p>
                La prospectiva territorial es una forma de pensar y construir el
                futuro con base en evidencia, participación y análisis de largo
                plazo. No se trata de adivinar lo que va a ocurrir, sino de
                explorar escenarios posibles, reconocer tendencias, identificar
                incertidumbres críticas y definir decisiones estratégicas para
                orientar el desarrollo del territorio.
              </p>
              <p style={{ marginTop: '16px' }}>
                En Horizonte Quindío Prospectiva 2050, la prospectiva se aplica
                con un <strong>enfoque multiactor, multidimensional y colaborativo</strong>,
                articulando conocimientos técnicos, institucionales y ciudadanos
                para construir una visión de futuro sólida, pertinente y
                compartida.
              </p>
            </div>
            <div className="reveal">
              <div className="card card--azul">
                <div className="card-icon card-icon--azul">🔭</div>
                <h3>La prospectiva permite</h3>
                <ul>
                  <li>Analizar el presente del territorio con rigor técnico.</li>
                  <li>Identificar tendencias globales, nacionales y locales.</li>
                  <li>Explorar futuros posibles y sus implicaciones.</li>
                  <li>Definir estrategias y prioridades de largo plazo.</li>
                  <li>Pasar de una gestión reactiva a una gestión anticipatoria.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--verde" aria-labelledby="t-cifras">
        <div className="container">
          <div className="section-head text-center">
            <p className="section-label section-label--dark">Cifras clave</p>
            <h2 className="section-title" id="t-cifras" style={{ color: '#fff' }}>
              El proceso en números
            </h2>
            <p
              className="section-intro mx-auto"
              style={{ color: 'rgba(255,255,255,0.9)' }}
            >
              Indicadores, hitos y actores que dan cuenta del avance del
              ejercicio prospectivo en el departamento.
            </p>
          </div>
          <Stats />
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="t-mapa">
        <div className="container">
          <div className="section-head">
            <p className="section-label">El territorio</p>
            <h2 className="section-title" id="t-mapa">
              Los 12 municipios ya hacen parte del proceso
            </h2>
            <p className="section-intro">
              Durante la fase de diagnóstico se adelantaron talleres de
              construcción participativa y cartografía social en los municipios
              del departamento. Haz clic en cada punto para ver el detalle.
            </p>
          </div>
          <MapaQuindio />
        </div>
      </section>

      <section className="section" aria-labelledby="t-voces">
        <div className="container">
          <div className="section-head">
            <p className="section-label">Voces del territorio</p>
            <h2 className="section-title" id="t-voces">
              Lo que dice la gente sobre el Quindío 2050
            </h2>
            <p className="section-intro">
              Frases reales recogidas en los talleres y actividades del
              proyecto. Filtra por tipo de actor.
            </p>
          </div>
          <VocesTestimonios />
        </div>
      </section>

      <section className="section" aria-labelledby="t-noticias">
        <div className="container">
          <div className="section-head">
            <div className="cta-band">
              <div>
                <p className="section-label">Últimas noticias</p>
                <h2 className="section-title" id="t-noticias">
                  Mantente al día con el proceso
                </h2>
                <p className="section-intro">
                  Avances, boletines, eventos, talleres, misiones técnicas y
                  resultados del proceso prospectivo.
                </p>
              </div>
              {noticias.length > 0 ? (
                <Link className="btn btn--primary" href="/avances">
                  Ver todo el portal →
                </Link>
              ) : null}
            </div>
          </div>
          {noticias.length ? (
            <div className="grid-3" aria-live="polite">
              {noticias.map((n) => (
                <article className="news-card reveal" key={n.id}>
                  <a
                    className="news-card__img"
                    href={`/noticia/${n.slug}`}
                    aria-label="Leer noticia"
                  >
                    <span dangerouslySetInnerHTML={{ __html: placeholderSVG(n.categoria) }} />
                    <span className="img-note">Foto pendiente</span>
                  </a>
                  <div className="news-card__body">
                    <div className="news-meta">
                      <span className="chip chip--cat">{n.categoria}</span>
                      <span className="news-date">{formatearFecha(n.fecha)}</span>
                    </div>
                    <h3>
                      <a className="title-link" href={`/noticia/${n.slug}`}>
                        {n.titulo}
                      </a>
                    </h3>
                    <p>{n.resumen}</p>
                    <a
                      className="arrow-link btn btn--outline btn--sm"
                      href={`/noticia/${n.slug}`}
                    >
                      Leer más
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
          <p className="text-center" style={{ marginTop: '34px' }}>
            <Link className="btn btn--outline" href="/avances">
              Ver todas las noticias y avances
            </Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="t-cta">
        <div className="container">
          <div className="cta-panel reveal">
            <p className="section-label section-label--dark">Participa</p>
            <h2 id="t-cta">
              El futuro del Quindío se construye entre todas y todos
            </h2>
            <p>
              Conoce el proyecto, participa en los espacios de construcción
              colectiva y acompaña la ruta hacia el Quindío 2050. Tu voz, la de
              tu organización y la de tu territorio son parte del diagnóstico y
              de la visión que construimos juntos.
            </p>
            <div className="btn-row">
              <Link className="btn btn--accent" href="/participa">
                Participa en el proceso
              </Link>
              <Link className="btn btn--ghost" href="/repositorio">
                Explora el repositorio documental
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}