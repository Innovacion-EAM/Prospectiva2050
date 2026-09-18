import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  FileBarChart,
  FileText,
  Mail,
  MapPin,
  Newspaper,
  Presentation,
  ScrollText,
} from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { DOC_CATEGORIES, SITE, type DocCategory } from "@/data/site";
import { postForm } from "@/lib/api-client";
import type { NewsItem } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const DOC_ICONS: Record<DocCategory["icon"], typeof FileText> = {
  file: FileText,
  chart: FileBarChart,
  scroll: ScrollText,
  news: Newspaper,
  presentation: Presentation,
  book: BookOpen,
};

export function HomeDocuments() {
  return (
    <section className="bg-paper px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-display text-section font-bold text-ink">
          Documentos y publicaciones
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-relaxed text-muted sm:text-sm">
          Acceso público a los documentos del proceso: convenios, informes, memorias, boletines y
          piezas de socialización. Explora cada categoría del repositorio.
        </p>
        <div className="mt-10 overflow-hidden rounded-3xl bg-[#0c272e] text-paper shadow-lg">
          <div className="grid sm:grid-cols-2 lg:grid-cols-6">
            {DOC_CATEGORIES.map((cat, i) => {
              const Icon = DOC_ICONS[cat.icon];
              return (
                <article
                  key={cat.slug}
                  className={cn(
                    "flex flex-col items-start gap-3 px-4 py-6",
                    i !== 0 && "border-t border-paper/10 sm:border-t-0 lg:border-l",
                  )}
                >
                  <span className="grid size-10 place-items-center rounded-full bg-lime text-ink">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="font-display text-xs leading-snug font-bold">{cat.title}</h3>
                  <p className="flex-1 text-[0.72rem] leading-relaxed text-mist">
                    {cat.description}
                  </p>
                  <Link
                    to="/documentos/$categoria"
                    params={{ categoria: cat.slug }}
                    className="rounded-pill bg-lime px-3 py-1 font-display text-[0.68rem] font-semibold text-lime-fg no-underline hover:bg-lime-deep"
                  >
                    Ver más
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeNews({ news }: { news: NewsItem[] }) {
  const items = news.slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-paper px-4 pb-16 sm:px-6">
      <div className="pointer-events-none absolute -left-20 top-4 h-56 w-56 rounded-full border border-stone/60" />
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.6fr_1.8fr]">
        <div>
          <h2 className="font-display text-section font-bold text-ink">Noticias</h2>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted sm:text-sm">
            Comunicados, talleres, convocatorias y avances del ejercicio de prospectiva territorial.
          </p>
          <Link
            to="/noticias"
            className="mt-4 inline-flex rounded-pill bg-lime px-4 py-2 font-display text-sm font-semibold text-lime-fg no-underline hover:bg-lime-deep"
          >
            Ver todas
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {items.map((n) => (
            <Link
              key={n.slug}
              to="/noticias/$slug"
              params={{ slug: n.slug }}
              className="relative h-72 w-56 shrink-0 overflow-hidden rounded-2xl no-underline sm:w-64"
            >
              <img src={n.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              {n.overlay === "convoca" ? (
                <div className="absolute inset-0 bg-convoca/65 p-4 flex flex-col justify-start">
                  <span className="self-start rounded-sm bg-lime px-2 py-0.5 text-[0.65rem] font-bold text-ink uppercase">
                    Convocatoria
                  </span>
                  <p className="mt-4 font-display text-sm leading-tight font-extrabold text-paper">
                    {n.title}
                  </p>
                  <p className="mt-2 text-[0.65rem] font-bold text-lime">{n.date}</p>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
              )}
              <div className="absolute inset-x-3 bottom-3 rounded-xl bg-[#0c272e]/90 p-3 text-paper backdrop-blur-xs">
                <h3 className="font-display text-xs font-bold text-paper">{n.category}</h3>
                <span className="mt-2 inline-flex items-center gap-1 rounded-pill bg-paper/20 px-3 py-1 font-display text-[0.68rem] font-semibold text-paper hover:bg-paper/30">
                  Ver más {">"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeContact() {
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    asunto: "",
    mensaje: "",
  });

  async function send(e: FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      await postForm("contacto", {
        nombre: form.nombre,
        email: form.correo,
        asunto: form.asunto || undefined,
        mensaje: form.mensaje,
      });
      toast.success("Mensaje enviado. Te contactaremos pronto.");
      setForm({ nombre: "", correo: "", asunto: "", mensaje: "" });
    } catch {
      toast.error("No pudimos enviar tu mensaje. Inténtalo de nuevo más tarde.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="bg-fog px-4 py-14 sm:px-6 sm:py-18">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-3xl bg-paper p-6 shadow-sm sm:p-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-section font-bold text-ink">Contactos</h2>
          <p className="mt-3 max-w-md text-xs leading-relaxed text-muted sm:text-sm">
            Escríbenos para más información sobre el ejercicio de prospectiva, los talleres o las
            convocatorias abiertas del departamento.
          </p>
          <ul className="mt-6 flex flex-col gap-3 text-xs text-muted sm:text-sm">
            <li className="flex items-center gap-3">
              <IconBubble>
                <Mail className="size-4 text-lime-hot" />
              </IconBubble>
              <a href={`mailto:${SITE.email}`} className="text-muted no-underline hover:text-ink">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <IconBubble>
                <MapPin className="size-4 text-lime-hot" />
              </IconBubble>
              <span>
                {SITE.address} — {SITE.city}
              </span>
            </li>
          </ul>

          <a
            href={SITE.phoneHref}
            className="mt-6 inline-flex items-center gap-2 rounded-pill bg-[#0c272e] px-5 py-2.5 font-display text-sm font-bold text-paper no-underline shadow-xs hover:bg-ink"
          >
            <span className="grid size-5 place-items-center rounded-full bg-lime text-ink text-xs font-extrabold">
              📱
            </span>
            {SITE.phone}
          </a>
        </div>

        <form onSubmit={send} className="flex flex-col gap-3">
          <p className="font-display text-base font-bold text-ink sm:text-lg">
            Escríbenos para más información
          </p>
          <Field
            label="Nombre"
            value={form.nombre}
            onChange={(v) => setForm({ ...form, nombre: v })}
          />
          <Field
            label="Correo"
            type="email"
            value={form.correo}
            onChange={(v) => setForm({ ...form, correo: v })}
          />
          <Field
            label="Asunto"
            value={form.asunto}
            onChange={(v) => setForm({ ...form, asunto: v })}
          />
          <label className="block">
            <span className="sr-only">Mensaje</span>
            <textarea
              required
              rows={4}
              placeholder="Mensaje"
              value={form.mensaje}
              onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
              className="w-full resize-y rounded-2xl border border-stone bg-paper px-4 py-3 text-xs text-ink outline-none placeholder:text-muted focus:border-lime focus:ring-1 focus:ring-lime"
            />
          </label>
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="ink"
              size="sm"
              className="bg-[#0c272e] px-6 text-paper"
              disabled={sending}
            >
              {sending ? "Enviando…" : "Enviar"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <input
        required
        type={type}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-2xl border border-stone bg-paper px-4 text-xs text-ink outline-none placeholder:text-muted focus:border-lime focus:ring-1 focus:ring-lime"
      />
    </label>
  );
}

function IconBubble({ children }: { children: ReactNode }) {
  return (
    <span className="grid size-7 place-items-center rounded-full border border-stone bg-paper">
      {children}
    </span>
  );
}