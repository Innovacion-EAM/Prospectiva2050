import { createFileRoute } from "@tanstack/react-router";
import { HomeHero } from "@/components/home-hero";
import { HomeProject } from "@/components/home-project";
import { HomeContact, HomeDocuments, HomeNews } from "@/components/home-rest";
import { fetchNoticias, toNewsItem, type NewsItem } from "@/lib/api";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      const res = await fetchNoticias({ data: { perPage: 3 } });
      return { news: res.data.map(toNewsItem) };
    } catch {
      return { news: [] as NewsItem[] };
    }
  },
  component: Home,
  head: () => ({
    meta: [{ title: "Horizonte Quindío — Proyectamos el futuro de la región" }],
  }),
});

function Home() {
  const { news } = Route.useLoaderData();
  return (
    <>
      <HomeHero />
      <HomeProject />
      <HomeDocuments />
      <HomeNews news={news} />
      <HomeContact />
    </>
  );
}