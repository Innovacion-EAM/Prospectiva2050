import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import appCss from "../styles.css?url";

const APP_NAME = "Horizonte Quindío";
const APP_DESCRIPTION =
  "Horizonte Quindío Prospectiva 2050 proyecta el futuro de la región uniendo el talento local.";

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: APP_DESCRIPTION },
      { name: "theme-color", content: "#0B3336" },
      { property: "og:title", content: APP_NAME },
      { property: "og:description", content: APP_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og.jpg" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-display text-xs font-semibold tracking-[0.2em] text-lime-hot uppercase">
        404
      </p>
      <h1 className="mt-3 font-display text-display font-extrabold text-ink">
        No encontramos esta página
      </h1>
      <p className="mt-3 text-muted">
        El enlace puede haber cambiado. Vuelve al inicio o recorre el mapa del sitio.
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

function RootDocument() {
  return (
    <html lang="es" suppressHydrationWarning className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <SiteShell>
          <Outlet />
        </SiteShell>
        <Scripts />
      </body>
    </html>
  );
}
