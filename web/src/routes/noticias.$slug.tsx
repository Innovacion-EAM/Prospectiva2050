import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site-shell";
import { fetchNoticia, fetchNoticias, toNewsItem, type NewsItem } from "@/lib/api";

export const Route = createFileRoute("/noticias/$slug")({
  loader: async ({ params }) => {
    try {
      const [item, list] = await Promise.all([
        fetchNoticia({ data: params.slug }),
        fetchNoticias({ data: { perPage: 20 } }),
      ]);
      const current: NewsItem = toNewsItem(item);
      const others = list.data.map(toNewsItem).filter((n) => n.slug !== current.slug);
      return { item: current, others };
    } catch {
      throw notFound();
    }
  },
  component: NewsArticle,
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.item.title ?? "Noticia"} — Horizonte Quindío` }],
  }),
});

function NewsArticle() {
  const { item, others } = Route.useLoaderData();

  return (
    <>
      <PageHero kicker={item.category} title={item.title} intro={item.excerpt} />
      <article className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="text-sm text-muted">{item.date}</p>
        <img src={item.image} alt="" className="mt-6 h-80 w-full rounded-2xl object-cover" />
        {item.body.map((p) => (
          <p key={p.slice(0, 40)} className="mt-5 max-w-3xl text-base leading-relaxed text-body">
            {p}
          </p>
        ))}
        {others.length > 0 ? (
          <div className="mt-12">
            <p className="font-display text-sm font-bold text-ink">Más noticias</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {others.slice(0, 6).map((n) => (
                <li key={n.slug}>
                  <Link
                    to="/noticias/$slug"
                    params={{ slug: n.slug }}
                    className="block rounded-xl border border-stone p-4 no-underline hover:border-lime"
                  >
                    <span className="font-display text-sm font-semibold text-ink">{n.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>
    </>
  );
}