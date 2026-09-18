import Link from 'next/link';
import MailtoForm from '@/components/MailtoForm';

const INFO = [
  {
    ico: '🏛️',
    titulo: 'Entidades responsables',
    texto:
      'Proyecto Horizonte Quindío Prospectiva 2050 — convenio entre la Universidad del Quindío (en representación de 11 entidades del departamento) y la CEPAL.',
  },
  {
    ico: '🧑‍💼',
    titulo: 'Dirección del proyecto',
    texto: 'Juan Esteban Gil Chavarría — director de Horizonte Quindío Prospectiva 2050.',
  },
  {
    ico: '📍',
    titulo: 'Sede',
    texto: 'Universidad del Quindío — Armenia, Quindío, Colombia. Auditorio Euclides Jaramillo Arango.',
  },
  {
    ico: '🌐',
    titulo: 'Sitio oficial',
    texto: 'www.horizontequindio2050.com — portal público del proceso prospectivo del departamento.',
  },
];

export default function Contacto() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Miga de pan">
            <Link href="/">Inicio</Link>
            <span />
            <span>Contacto</span>
          </nav>
          <h1>Contacto</h1>
          <p>
            Comunícate con el proyecto, conoce las entidades responsables y
            consulta nuestra política de tratamiento de datos.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="t-canal">
        <div className="container">
          <div className="grid-2">
            <div className="reveal">
              <p className="section-label">Información institucional</p>
              <h2 className="section-title" id="t-canal">
                Canal de comunicación del proyecto
              </h2>
              {INFO.map((i) => (
                <div className="info-item" key={i.titulo}>
                  <div className="ico">{i.ico}</div>
                  <div>
                    <h4>{i.titulo}</h4>
                    <p>{i.texto}</p>
                  </div>
                </div>
              ))}
              <p style={{ marginTop: '20px' }} className="chip">
                Redes sociales oficiales del proyecto — próximamente
              </p>
            </div>
            <div className="reveal">
              <h3 style={{ marginBottom: '6px' }}>Escríbenos</h3>
              <p style={{ color: 'var(--gris-500)', fontSize: '0.9rem', marginBottom: '18px' }}>
                Déjanos tu mensaje y nos pondremos en contacto contigo.
              </p>
              <MailtoForm tipo="contacto" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tint" id="politica" aria-labelledby="t-politica">
        <div className="container">
          <div
            className="card reveal"
            style={{ maxWidth: '820px', margin: '0 auto' }}
          >
            <p className="section-label">Transparencia</p>
            <h2 className="section-title" id="t-politica" style={{ fontSize: '1.6rem' }}>
              Política de tratamiento de datos
            </h2>
            <p style={{ color: 'var(--gris-700)' }}>
              Horizonte Quindío Prospectiva 2050, a través del proyecto y sus
              entidades aliadas, trata los datos personales de la ciudadanía con
              las siguientes finalidades:
            </p>
            <ul style={{ marginTop: '14px' }}>
              <li>
                Gestionar la participación ciudadana, el envío de propuestas y
                las comunicaciones del proyecto.
              </li>
              <li>
                Incorporar aportes y visiones al diagnóstico y a la construcción
                colectiva de la visión Quindío 2050.
              </li>
              <li>
                Mantener informada a la ciudadanía sobre avances, convocatorias
                y resultados.
              </li>
            </ul>
            <p style={{ marginTop: '14px', color: 'var(--gris-700)' }}>
              Los datos suministrados no serán comercializados, ni cedidos a
              terceros con fines distintos a los aquí señalados. Los titulares
              pueden ejercer sus derechos de consulta, actualización,
              rectificación y supresión comunicándose a través del{' '}
              <a href="#contenido">formulario de contacto</a> de este sitio.
            </p>
            <p style={{ marginTop: '14px', color: 'var(--gris-500)', fontSize: '0.88rem' }}>
              Versión 1.0 — agosto de 2026. Esta política puede ser actualizada
              por el proyecto en cualquier momento.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}