import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { PageFrame, SiteHeader } from "@/components/site-shell";
import { getWriting, getWritings } from "@/lib/substack";
import { BackLink } from "@/components/back-link";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getWritings()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const writing = await getWriting(params.slug);
  return {
    title: writing?.title ?? "Escrito",
    description: writing?.description,
    alternates: writing ? { canonical: `/escritos/${writing.slug}` } : undefined,
    openGraph: writing ? {
      title: writing.title,
      description: writing.description,
      type: "article",
      url: `/escritos/${writing.slug}`,
      publishedTime: writing.publishedAt,
      authors: [writing.author],
      images: writing.image ? [{ url: writing.image }] : undefined
    } : undefined
  };
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date));
}

export default async function WritingPage({ params }: { params: { slug: string } }) {
  const writing = await getWriting(params.slug);
  if (!writing) notFound();

  return (
    <>
      <SiteHeader />
      <PageFrame>
        <article>
          <header className="mx-auto max-w-4xl border-b border-ink/10 pb-10 dark:border-white/10">
            <BackLink href="/escritos" label="Volver a escritos" />
            <p className="mt-10 text-sm text-graphite dark:text-white/55">
              {formatDate(writing.publishedAt)} · por {writing.author}
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-ink dark:text-white sm:text-6xl">
              {writing.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-graphite dark:text-white/70">{writing.description}</p>
          </header>

          {writing.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={writing.image} alt="" className="mx-auto my-10 max-h-[34rem] w-full max-w-5xl object-cover" />
          )}

          <div
            className="substack-article mx-auto max-w-3xl"
            dangerouslySetInnerHTML={{ __html: writing.content }}
          />

          <footer className="mx-auto mt-12 flex max-w-3xl flex-col gap-4 border-t border-ink/10 pt-8 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-graphite dark:text-white/60">Publicado originalmente en el cuaderno de nat.</p>
            <a href={`${writing.url}?utm_source=contraste&utm_medium=reader&utm_campaign=articulo`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-coral">
              Ver en Substack <ExternalLink className="h-4 w-4" />
            </a>
          </footer>
        </article>
      </PageFrame>
    </>
  );
}
