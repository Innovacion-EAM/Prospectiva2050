export default function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img
              src="/logo.svg"
              alt="Logo Horizonte Quindío Prospectiva 2050"
              width={52}
              height={52}
            />
            <h3>
              Horizonte Quindío
              <br />
              Prospectiva 2050
            </h3>
            <p>
              Construyendo una visión compartida para el futuro del
              departamento. Un proceso territorial participativo con
              acompañamiento metodológico de la CEPAL–ILPES.
            </p>
          </div>
          <nav aria-label="Secciones del sitio">
            <h4>Secciones</h4>
            <a href="/el-proyecto">El proyecto</a>
            <a href="/ejes">Ejes y misiones</a>
            <a href="/avances">Avances y noticias</a>
            <a href="/repositorio">Repositorio documental</a>
          </nav>
          <nav aria-label="Participación">
            <h4>Participa</h4>
            <a href="/participa">Mecanismos de participación</a>
            <a href="/participa#encuesta">Encuesta ciudadana</a>
            <a href="/contacto">Contacto</a>
          </nav>
          <div>
            <h4>El proyecto</h4>
            <p style={{ fontSize: '0.9rem' }}>
              Dirección del estudio:
              <br />
              <strong style={{ color: '#fff' }}>Universidad del Quindío</strong>
              <br />
              Armenia, Quindío — Colombia
            </p>
            <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
              Alianza interinstitucional con el apoyo de{' '}
              <strong style={{ color: '#fff' }}>CEPAL · ILPES</strong>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {anio} Horizonte Quindío Prospectiva 2050. Todos los derechos
            reservados.
          </span>
          <span>
            <a href="/contacto#politica">Política de tratamiento de datos</a>
          </span>
        </div>
      </div>
    </footer>
  );
}