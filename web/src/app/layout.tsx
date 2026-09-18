import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RevealEffect from '@/components/RevealEffect';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-texto',
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-titulo',
});

export const metadata: Metadata = {
  title: 'Horizonte Quindío Prospectiva 2050',
  description:
    'Sitio institucional del proyecto Horizonte Quindío Prospectiva 2050: proceso territorial para construir una visión compartida del futuro del Quindío con la participación de instituciones, academia, sector productivo y ciudadanía.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${manrope.variable}`}>
        <a className="skip-link" href="#contenido">
          Ir al contenido principal
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <RevealEffect />
      </body>
    </html>
  );
}