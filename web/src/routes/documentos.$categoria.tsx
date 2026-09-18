import { createFileRoute, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site-shell";
import { DOC_CATEGORIES } from "@/data/site";
import { fetchDocumentos, formatFecha, type ApiDocumento } from "@/lib/api";

export const Route = createFileRoute("/documentos/$categoria")({
  loader: async ({ params }) => {
    const cat = DOC_CATEGORIES.find((c) => c.slug === params.categoria);
    if (!cat) throw notFound();
    try {
      const res = await fetchDocumentos({ data: { tipo: params.categoria } });
      return { cat, docs: res.data };
    } catch {
      return { cat, docs: [] as ApiDocumento[] };
    }
  },
  component: CategoriaPage,
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.cat.title ?? "Documentos"} — Horizonte Quindío` }],
  }),
});

function CategoriaPage() {
  const { cat, docs } = Route.useLoaderData();

  function openDoc(doc: ApiDocumento) {
    if (!doc.link) {
      toast.info("Documento aún no publicado. Estará disponible en el repositorio.");
      return;
    }
    window.open(doc.link, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <PageHero kicker="Documentos" title={cat.title} intro={cat.description} />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {docs.length === 0 ? (
          <p className="text-muted">Aún no hay piezas publicadas en esta categoría.</p>
        ) : (
          <ul className="grid gap-4">
            {docs.map((doc) => (
              <li
                key={doc.id}
                className="flex flex-col gap-4 rounded-2xl border border-stone bg-paper p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-display font-bold text-ink">{doc.titulo}</p>
                  <p className="mt-1 text-sm text-muted">{doc.autor}</p>
                  <p className="mt-2 text-xs text-muted">
                    {formatFecha(doc.fecha)} · {doc.formato}
                  </p>
                </div>
                <Button variant="lime" onClick={() => openDoc(doc)}>
                  {doc.link ? "Descargar" : "Ver ficha"}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}