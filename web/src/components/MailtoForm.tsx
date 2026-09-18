'use client';

import { useState } from 'react';

const EMAIL = 'comunicaciones@horizontequindio2050.com';

const TEMAS = [
  'Dimensión político-institucional',
  'Dimensión económico-productiva',
  'Dimensión físico-ambiental',
  'Dimensión socio-cultural',
  'Participación y metodología',
  'Otro',
];

interface Props {
  tipo: 'contacto' | 'propuesta';
}

export default function MailtoForm({ tipo }: Props) {
  const [mensaje, setMensaje] = useState<string | null>(null);
  const esPropuesta = tipo === 'propuesta';
  const asuntoHidden = esPropuesta
    ? 'Aporte ciudadano — Horizonte Quindío 2050'
    : 'Contacto web — Horizonte Quindío 2050';

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const asunto = String(fd.get('asunto') || asuntoHidden);
    const lineas: string[] = [];
    form
      .querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        'input:not([type="hidden"]), textarea, select'
      )
      .forEach((f) => {
        const etiqueta = f.getAttribute('data-label') || f.name;
        lineas.push(`${etiqueta}: ${f.value}`);
      });
    const cuerpo = lineas.join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      asunto
    )}&body=${encodeURIComponent(cuerpo)}`;
    setMensaje(
      `Tu correo se está preparando… Si no se abre tu programa de correo, escríbenos a ${EMAIL}`
    );
  };

  return (
    <form className="card reveal form" data-mailto={EMAIL} onSubmit={onSubmit}>
      <div className="form-row">
        <div>
          <label className="form-label" htmlFor="f-nombre">
            Nombre
          </label>
          <input
            className="form-field"
            id="f-nombre"
            name="Nombre"
            data-label="Nombre"
            type="text"
            required
          />
        </div>
        {esPropuesta ? (
          <div>
            <label className="form-label" htmlFor="f-org">
              Organización / institución
            </label>
            <input
              className="form-field"
              id="f-org"
              name="Organización"
              data-label="Organización"
              type="text"
            />
          </div>
        ) : (
          <div>
            <label className="form-label" htmlFor="c-correo">
              Correo electrónico
            </label>
            <input
              className="form-field"
              id="c-correo"
              name="Correo"
              data-label="Correo electrónico"
              type="email"
              required
            />
          </div>
        )}
      </div>
      <div className="form-row">
        {!esPropuesta ? null : (
          <div>
            <label className="form-label" htmlFor="f-correo">
              Correo electrónico
            </label>
            <input
              className="form-field"
              id="f-correo"
              name="Correo"
              data-label="Correo electrónico"
              type="email"
              required
            />
          </div>
        )}
        {esPropuesta ? (
          <div>
            <label className="form-label" htmlFor="f-tema">
              Tema del aporte
            </label>
            <select
              className="form-field"
              id="f-tema"
              name="Tema"
              data-label="Tema"
              defaultValue={TEMAS[0]}
            >
              {TEMAS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label className="form-label" htmlFor="c-asunto">
              Asunto
            </label>
            <input
              className="form-field"
              id="c-asunto"
              name="Asunto"
              data-label="Asunto"
              type="text"
              required
            />
          </div>
        )}
      </div>
      <div>
        <label className="form-label" htmlFor="msg">
          {esPropuesta ? 'Tu propuesta o aporte' : 'Mensaje'}
        </label>
        <textarea
          className="form-field"
          id="msg"
          name={esPropuesta ? 'Propuesta' : 'Mensaje'}
          data-label={esPropuesta ? 'Propuesta' : 'Mensaje'}
          placeholder={
            esPropuesta
              ? 'Cuéntanos tu idea, experiencia o inquietud para el Quindío 2050…'
              : undefined
          }
          required
        ></textarea>
      </div>
      <div>
        <input type="hidden" name="asunto" value={asuntoHidden} />
        {mensaje ? <p className="msg ok">{mensaje}</p> : null}
        <button className="btn btn--primary" type="submit">
          {esPropuesta ? 'Enviar propuesta 📩' : 'Enviar mensaje 📩'}
        </button>
      </div>
    </form>
  );
}