import type { Metadata } from "next";
import { LibraryBig } from "lucide-react";
import { PageFrame, SiteHeader } from "@/components/site-shell";
import { TopicExplorer } from "@/components/topic-explorer";
import { topics } from "@/data/topics";

export const metadata: Metadata = {
  title: "Explorar temas | CONTRASTE",
  description: "Biblioteca de ideas actuales contrastadas con argumentos, evidencia, sesgos y fuentes."
};

export default function TopicsPage({ searchParams }: { searchParams: { categoria?: string } }) {
  return (
    <>
      <SiteHeader />
      <PageFrame>
        <header className="pb-10">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase text-cobalt dark:text-blue-300">
            <LibraryBig className="h-4 w-4" />
            Biblioteca de contraste
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.05] text-ink dark:text-white sm:text-7xl">
            Busca una idea. Encuentra el otro lado.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-graphite dark:text-white/70">
            Explora líneas de pensamiento que circulan en redes y examina qué sabemos, qué discutimos y qué sigue abierto.
          </p>
        </header>
        <TopicExplorer topics={topics} initialCategory={searchParams.categoria} />
      </PageFrame>
    </>
  );
}
