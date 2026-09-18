import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { SITE } from "@/data/site";
import { postForm } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper pb-14 sm:pb-20">
      {/* Background aerial city image */}
      <img
        src="/images/hero-city.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-50 grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />

      <div className="relative mx-auto grid min-h-[30rem] max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:min-h-[34rem] lg:grid-cols-[0.88fr_1.12fr] lg:py-14">
        {/* Left hero headline */}
        <div className="relative z-10 max-w-xl">
          <h1 className="font-display text-hero leading-[1.12] font-extrabold tracking-tight text-paper">
            {SITE.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <Link
            to="/proyecto"
            className="mt-8 inline-flex items-center gap-1 rounded-pill bg-lime px-6 py-3 font-display text-sm font-semibold text-lime-fg no-underline tap-scale hover:bg-lime-deep shadow-md"
          >
            Explorar más {">"}{">"}
          </Link>
        </div>

        {/* Right column: People image seamlessly fused into background with NO rectangular border/margins */}
        <div className="relative mx-auto hidden w-full max-w-xl sm:block lg:max-w-none">
          {/* Green Ring behind people */}
          <div
            aria-hidden
            className="absolute top-[48%] left-[50%] size-[min(70vw,31rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border-[28px] border-lime/80 pointer-events-none"
          />

          {/* Radial & Elliptical Masked Image Container with screen blending - Edge square box completely dissolved */}
          <div
            className="relative z-10 mx-auto w-full overflow-hidden"
            style={{
              WebkitMaskImage: "radial-gradient(ellipse 68% 68% at 50% 50%, black 20%, transparent 80%)",
              maskImage: "radial-gradient(ellipse 68% 68% at 50% 50%, black 20%, transparent 80%)",
            }}
          >
            <img
              src="/images/hero-people.jpg"
              alt="Talento local del Quindío: jóvenes profesionales del territorio"
              className="w-full h-[25rem] object-cover object-[center_20%]"
              style={{
                mixBlendMode: "screen",
                filter: "brightness(1.15) contrast(1.1)",
              }}
            />
          </div>

          {/* Suggestion box overlapping bottom-right near people */}
          <div className="absolute -bottom-6 right-2 z-30 w-64 lg:w-72">
            <SuggestForm rotated inputId="sugerencia-hero" />
          </div>
        </div>
      </div>

      <div className="relative z-20 px-4 pb-4 sm:hidden">
        <SuggestForm rotated={false} inputId="sugerencia-movil" />
      </div>
    </section>
  );
}

export function SuggestForm({
  rotated,
  inputId = "sugerencia",
}: {
  rotated: boolean;
  inputId?: string;
}) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  async function send(e: FormEvent) {
    e.preventDefault();
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      await postForm("sugerencias", {
        nombre: "Ciudadanía",
        email: undefined,
        sugerencia: text.trim(),
      });
      toast.success("Gracias. Recibimos tu pregunta o recomendación.");
      setText("");
    } catch {
      toast.error("No pudimos recibir tu mensaje. Inténtalo de nuevo más tarde.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={send}
      className={cn(
        "rounded-2xl bg-lime p-3.5 text-lime-fg shadow-[var(--shadow-float)] border border-paper/20 sm:p-4",
        rotated && "origin-bottom-right rotate-3 hover:rotate-0 transition-transform duration-200",
      )}
    >
      <p className="font-display text-xs leading-snug font-extrabold sm:text-sm">
        ¿Tienes alguna pregunta o quieres darnos alguna recomendación?
      </p>
      <label htmlFor={inputId} className="sr-only">
        Escribe tu idea
      </label>
      <input
        id={inputId}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe tu idea"
        className="mt-2.5 h-8.5 w-full rounded-pill bg-paper px-3 text-xs text-ink outline-none placeholder:text-muted focus:ring-2 focus:ring-ink/20"
      />
      <Button type="submit" variant="hot" size="sm" className="mt-2.5 w-full text-xs py-1.5 font-bold" disabled={sending}>
        {sending ? "Enviando…" : "Enviar"}
      </Button>
    </form>
  );
}
