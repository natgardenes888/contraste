import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Feather, Rss } from "lucide-react";
import { PageFrame, SiteHeader } from "@/components/site-shell";
import { getWritings } from "@/lib/substack";

export const metadata: Metadata = {
  title: "Escritos",
  description: "Ensayos, reflexiones y creaciones de nat dentro de CONTRASTE.",
  alternates: { canonical: "/escritos" },
  openGraph: {
    title: "El cuaderno de nat | CONTRASTE",
    description: "Ideas que necesitan más espacio: ensayos, reflexiones y creaciones.",
    url: "/escritos"
  }
};

export const revalidate = 3600;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date));
}

export default async function WritingsPage() {
  const writings = await getWritings();
  const [featured, ...rest] = writings;

  return (
    <>
      <SiteHeader />
      <PageFrame>
        <section className="relative overflow-hidden border-b border-ink/10 pb-12 dark:border-white/10">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_18rem]">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase text-coral">
                <Feather className="h-4 w-4" />
                El cuaderno de nat
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.05] text-ink dark:text-white sm:text-7xl">
                Ideas que necesitan más espacio.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-graphite dark:text-white/70">
                Escribo sobre mi vida, sobre la de los demás, sobre gente que me invento y,
                a veces, me pongo en plan intelectual. Un poco de todo.
              </p>
            </div>
            <div className="border-l-4 border-coral bg-white/70 p-6 dark:bg-white/[0.05]">
              <p className="text-xs font-bold uppercase text-graphite dark:text-white/55">Dos formas de mirar</p>
              <p className="mt-3 text-sm leading-6 text-ink dark:text-white">
                CONTRASTE ordena la evidencia. Este cuaderno conserva la duda, la experiencia y la voz propia.
              </p>
            </div>
          </div>
        </section>

        {featured ? (
          <section className="py-12">
            <p className="text-sm font-semibold uppercase text-cobalt dark:text-blue-300">Último escrito</p>
            <a
              href={`/escritos/${featured.slug}`}
              className="group mt-5 grid overflow-hidden border border-ink/10 bg-white/70 transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.05] lg:grid-cols-[1.15fr_0.85fr]"
            >
              <div className="p-7 sm:p-10">
                <p className="text-sm text-graphite dark:text-white/55">
                  {formatDate(featured.publishedAt)} · {featured.author}
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-ink group-hover:text-cobalt dark:text-white sm:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-graphite dark:text-white/70">
                  {featured.description}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 font-semibold text-coral">
                  Leer dentro de CONTRASTE <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
              {featured.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="h-full min-h-64 w-full object-cover" src={featured.image} alt="" />
              )}
            </a>
          </section>
        ) : (
          <section className="my-12 border border-ink/10 bg-white/70 p-8 dark:border-white/10 dark:bg-white/[0.05]">
            <BookOpen className="h-8 w-8 text-coral" />
            <h2 className="mt-4 text-2xl font-semibold text-ink dark:text-white">El cuaderno está conectándose</h2>
            <p className="mt-3 text-graphite dark:text-white/70">Los escritos aparecerán aquí automáticamente.</p>
          </section>
        )}

        {rest.length > 0 && (
          <section className="pb-12">
            <h2 className="text-2xl font-semibold text-ink dark:text-white">Archivo</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {rest.map((writing) => (
                <a key={writing.slug} href={`/escritos/${writing.slug}`} className="group border-t-4 border-cobalt bg-white/65 p-6 transition hover:bg-white dark:bg-white/[0.04] dark:hover:bg-white/[0.08]">
                  <p className="text-xs text-graphite dark:text-white/55">{formatDate(writing.publishedAt)}</p>
                  <h3 className="mt-3 text-xl font-semibold text-ink group-hover:text-cobalt dark:text-white">{writing.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-graphite dark:text-white/65">{writing.description}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        <section className="flex flex-col gap-5 border-y border-ink/10 py-8 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-ink dark:text-white">¿Quieres recibir el próximo escrito?</p>
            <p className="mt-1 text-sm text-graphite dark:text-white/60">La lectura ocurre aquí; la suscripción sigue gestionada de forma segura por Substack.</p>
          </div>
          <Link href="https://gardenat2am.substack.com/subscribe" target="_blank" className="inline-flex h-11 items-center justify-center gap-2 bg-coral px-5 text-sm font-semibold text-white transition hover:bg-ink">
            <Rss className="h-4 w-4" /> Suscribirme
          </Link>
        </section>
      </PageFrame>
    </>
  );
}
