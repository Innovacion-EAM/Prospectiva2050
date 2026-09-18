import type { ErrorComponentProps } from "@tanstack/react-router";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-display text-xs font-semibold tracking-[0.2em] text-lime-hot uppercase">
        Error
      </p>
      <h1 className="mt-3 font-display text-display font-extrabold text-ink">
        Algo salió mal
      </h1>
      <p className="mt-3 text-muted">
        {error instanceof Error ? error.message : String(error ?? "Error desconocido")}
      </p>
      <a
        href="/"
        className="mt-8 inline-flex rounded-pill bg-lime px-5 py-2.5 font-display text-sm font-semibold text-lime-fg no-underline"
      >
        Ir al inicio
      </a>
    </section>
  );
}