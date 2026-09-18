import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site-shell";
import { fetchNoticias, toNewsItem, type NewsItem } from "@/lib/api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/noticias/")({
  loader: async () => {
    try {
      const res = await fetchNoticias({ data: { perPage: 20 } });
      return { news: res.data.map(toNewsItem) };
    } catch {
      return { news: [] as NewsItem[] };
    }
  },
  component: NoticiasPage,
  head: () => ({ meta: [{ title: "Noticias — Horizonte Quindío" }] }),
});

function NoticiasPage() {
  const { news } = Route.useLoaderData();

  return (
    <>
      <PageHero
        kicker="Novedades"
        title="Noticias y convocatorias"
        intro="Comunicados, talleres y llamados a participar en el ejercicio de prospectiva."
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {news.length === 0 ? (
          <p className="text-center text-muted">
            Aún no publicamos noticias. Vuelve pronto.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {news.map((n) => (
              <Link
                key={n.slug}
                to="/noticias/$slug"
                params={{ slug: n.slug }}
                className="group overflow-hidden rounded-2xl border border-stone no-underline shadow-sm"
              >
                <div className="relative h-56">
                  <img src={n.image} alt="" className="h-full w-full object-cover" />
                  <div
                    className={cn(
                      "absolute inset-0",
                      n.overlay === "convoca"
                        ? "bg-convoca/45"
                        : "bg-gradient-to-t from-ink/50 to-transparent",
                    )}
                  />
                </div>
                <div className="p-5">
                  <p className="font-display text-[0.65rem] font-semibold tracking-widest text-muted uppercase">
                    {n.category} · {n.date}
                  </p>
                  <h2 className="mt-2 font-display text-lg font-bold text-ink group-hover:text-ink-mid">
                    {n.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted">{n.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}