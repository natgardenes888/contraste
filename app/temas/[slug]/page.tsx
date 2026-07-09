import { notFound } from "next/navigation";
import { CalendarDays, ExternalLink, Tag } from "lucide-react";
import { ArgumentAccordion } from "@/components/argument-accordion";
import { ConceptExplorer } from "@/components/concept-explorer";
import { BackLink } from "@/components/back-link";
import { PageFrame, SiteHeader } from "@/components/site-shell";
import { getTopic, topics } from "@/data/topics";
import { signalsForTopic } from "@/data/feed-dictionary";

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const topic = getTopic(params.slug);
  if (!topic) return { title: "Tema" };

  return {
    title: topic.title,
    description: topic.summary,
    alternates: { canonical: `/temas/${topic.slug}` },
    openGraph: {
      title: `${topic.title} | CONTRASTE`,
      description: topic.summary,
      type: "article",
      url: `/temas/${topic.slug}`,
      tags: [topic.category, ...topic.relatedConcepts]
    },
    twitter: {
      card: "summary_large_image",
      title: `${topic.title} | CONTRASTE`,
      description: topic.summary
    }
  };
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = getTopic(params.slug);

  if (!topic) {
    notFound();
  }

  const feedSignals = signalsForTopic(topic.slug);

  return (
    <>
      <SiteHeader />
      <PageFrame>
        <BackLink href="/temas" label="Volver a todos los temas" />

        <section className="aurora-panel grid gap-5 border-y border-ink/10 py-6 dark:border-white/10 sm:gap-8 sm:py-8 lg:grid-cols-[0.74fr_0.26fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cobalt/10 px-3 py-1 text-xs font-semibold text-cobalt dark:bg-blue-300/10 dark:text-blue-200">
                <Tag className="h-3.5 w-3.5" />
                {topic.category}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-graphite dark:bg-white/10 dark:text-white/70">
                <CalendarDays className="h-3.5 w-3.5" />
                Actualizado {topic.updatedAt}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink dark:text-white sm:mt-5 sm:text-6xl">{topic.title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-graphite dark:text-white/70 sm:mt-6 sm:text-lg sm:leading-8">{topic.summary}</p>
          </div>
          <aside className="relative z-10 rounded-lg border border-ink/10 bg-white/80 p-4 shadow-soft dark:border-white/10 dark:bg-black/20 sm:p-5">
            <p className="text-sm font-semibold text-ink dark:text-white">Estado de la ficha</p>
            <p className="mt-3 text-sm leading-6 text-graphite dark:text-white/65">{topic.status}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {topic.relatedConcepts.slice(0, 5).map((concept) => (
                <span key={concept} className="rounded-full bg-gradient-to-r from-cobalt/10 to-coral/10 px-3 py-1 text-xs font-semibold text-cobalt dark:text-blue-200">
                  {concept}
                </span>
              ))}
            </div>
          </aside>
        </section>

        <TwoColumn>
          <Section title="Definición neutral">
            <p className="text-base leading-8 text-graphite dark:text-white/70">{topic.description}</p>
          </Section>
          <Section title="Resumen del debate">
            <p className="text-base leading-8 text-graphite dark:text-white/70">{topic.summary}</p>
          </Section>
        </TwoColumn>

        <Section title="¿Por que este tema esta de moda?">
          <p className="text-base leading-8 text-graphite dark:text-white/70">{topic.whyTrending}</p>
        </Section>

        {feedSignals.length ? (
          <Section title="Como aparece en redes">
            <div className="grid gap-3 md:grid-cols-2">
              {feedSignals.map((signal) => (
                <div key={signal.phrase} className="rounded-lg border border-ink/10 bg-white/75 p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
                  <p className="text-sm font-semibold text-coral dark:text-orange-200">{signal.phrase}</p>
                  <p className="mt-3 text-sm leading-6 text-graphite dark:text-white/70">{signal.tone}</p>
                  <p className="mt-4 rounded-md bg-cobalt/5 p-3 text-sm font-medium leading-6 text-cobalt dark:bg-blue-300/10 dark:text-blue-100">
                    {signal.criticalQuestion}
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-md bg-coral/8 p-3 dark:bg-coral/10">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-coral dark:text-orange-200">Trampa</p>
                      <p className="mt-2 text-sm leading-6 text-graphite dark:text-white/70">{signal.trap}</p>
                    </div>
                    <div className="rounded-md bg-sage/10 p-3 dark:bg-sage/15">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage dark:text-emerald-200">Movimiento critico</p>
                      <p className="mt-2 text-sm leading-6 text-graphite dark:text-white/70">{signal.criticalMove}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        ) : null}

        <TwoColumn>
          <Section title="Argumentos a favor">
            <div className="space-y-4">
              {topic.support.map((argument) => (
                <ArgumentAccordion key={argument.title} argument={argument} />
              ))}
            </div>
          </Section>
          <Section title="Argumentos en contra">
            <div className="space-y-4">
              {topic.opposition.map((argument) => (
                <ArgumentAccordion key={argument.title} argument={argument} />
              ))}
            </div>
          </Section>
        </TwoColumn>

        <TwoColumn>
          <Checklist title="Lo que sabemos" items={topic.known} />
          <Checklist title="Lo que todavia no sabemos" items={topic.unknown} />
        </TwoColumn>

        <TwoColumn>
          <Checklist title="Sesgos cognitivos relacionados" items={topic.biases} />
          <Section title="Recursos para leer más">
            <div className="space-y-3">
              {(topic.resources ?? []).slice(0, 6).map((resource) => (
                <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer" className="flex items-start justify-between gap-4 rounded-lg border border-ink/10 bg-white/70 p-4 transition hover:border-cobalt/30 dark:border-white/10 dark:bg-white/[0.04]">
                  <span>
                    <strong className="block text-sm text-ink dark:text-white">{resource.title}</strong>
                    <span className="mt-1 block text-xs text-graphite dark:text-white/55">
                      {resource.source} · {resource.year} · Nivel {resource.level?.toLowerCase()}
                    </span>
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-cobalt" />
                </a>
              ))}
            </div>
          </Section>
        </TwoColumn>

        <Section title="Conceptos relacionados">
          <ConceptExplorer concepts={topic.relatedConcepts} />
        </Section>
      </PageFrame>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-5 sm:py-8">
      <h2 className="mb-4 text-xl font-semibold tracking-tight text-ink dark:text-white sm:mb-5 sm:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function TwoColumn({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-8 lg:grid-cols-2">{children}</div>;
}

function Checklist({ title, items }: { title: string; items: string[] }) {
  return (
    <Section title={title}>
      <div className="rounded-lg border border-ink/10 bg-white/70 p-5 dark:border-white/10 dark:bg-white/[0.04]">
        <ul className="space-y-3 text-sm leading-7 text-graphite dark:text-white/70">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
