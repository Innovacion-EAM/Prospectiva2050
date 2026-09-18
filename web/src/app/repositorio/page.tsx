import Link from 'next/link';
import RepositorioDocs from '@/components/RepositorioDocs';
import { fetchDocumentos } from '@/lib/api';

export const revalidate = 60;

export default async function Repositorio() {
  const { data } = await fetchDocumentos({ perPage: 500 });

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Miga de pan">
            <Link href="/">Inicio</Link>
            <span />
            <span>Repositorio</span>
          </nav>
          <h1>Repositorio documental</h1>
          <p>
            Un repositorio vivo de la memoria del proceso: documentos
            descargables, informes, estudios, presentaciones, actas, bases de
            datos y material de soporte del proyecto.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="t-repositorio">
        <div className="container">
          <div className="section-head">
            <p className="section-label">Documentos</p>
            <h2 className="section-title" id="t-repositorio">
              Consulta y descarga los productos del estudio
            </h2>
            <p className="section-intro">
              Cada documento está registrado con su título, autor, fecha de
              publicación, tipo, delimitación espacial y formato. Los archivos
              se alojan en el repositorio del proyecto y se publican de manera
              continua.
            </p>
          </div>

          <RepositorioDocs initialDocumentos={data} />

          <div className="card reveal" style={{ marginTop: '28px' }}>
            <div className="info-item" style={{ marginBottom: 0 }}>
              <div className="ico">💡</div>
              <div>
                <h4>¿Cómo se incorporan los documentos?</h4>
                <p>
                  El equipo administrador publica los documentos de manera
                  continua desde el panel de administración. Los archivos están
                  alojados en el repositorio del proyecto en Google Drive y cada
                  publicación incluye su botón de acceso y descarga. Si tienes
                  un documento o insumo para aportar,{' '}
                  <Link href="/contacto">escríbenos</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}