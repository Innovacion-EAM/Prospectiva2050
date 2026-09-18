import Link from 'next/link';
import PortalNoticias from '@/components/PortalNoticias';
import { fetchNoticias } from '@/lib/api';

export const revalidate = 60;

export default async function Avances() {
  const { data } = await fetchNoticias({ perPage: 500 });

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Miga de pan">
            <Link href="/">Inicio</Link>
            <span />
            <span>Avances</span>
          </nav>
          <h1>Avances y noticias</h1>
          <p>
            En esta sección encontrarás las noticias, avances, boletines,
            actividades, resultados y momentos más relevantes del proyecto. Cada
            publicación incluye título, fecha, resumen y texto ampliado para que
            la ciudadanía y los actores del territorio puedan dar seguimiento al
            proceso.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="t-portal">
        <div className="container">
          <PortalNoticias initialNoticias={data} />
        </div>
      </section>
    </>
  );
}