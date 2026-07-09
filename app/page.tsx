import Link from "next/link";
import { ArrowRight, ArrowRightLeft, BookOpen, BrainCircuit, Flame, Search, ShieldCheck, Target, Video } from "lucide-react";
import { categories, topics, trendingTopics } from "@/data/topics";
import { feedDictionary } from "@/data/feed-dictionary";
import { HomeSearch } from "@/components/home-search";
import { PageFrame, SiteHeader } from "@/components/site-shell";
import { TopicCard } from "@/components/topic-card";
import { SurpriseButton } from "@/components/surprise-button";

const demoTrends = [
  ["Masculinidad moderna", "masculinidad-contemporanea"],
  ["Ayuno de dopamina", "ayuno-de-dopamina"],
  ["Trad Wives", "trad-wives"],
  ["Feminismo 4B", "feminismo-4b"],
  ["IA reemplazara empleos", "ia-reemplazara-empleos"],
  ["Red Pill", "red-pill"],
  ["Pornografia", "pornografia-y-relaciones"],
  ["Estoicismo", "estoicismo"]
] as const;

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <PageFrame>
        <section className="flex min-h-[72vh] items-center py-8">
          <div className="float-in max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 text-sm text-graphite shadow-soft dark:border-white/10 dark:bg-white/[0.06] dark:text-white/70">
              <ShieldCheck className="h-4 w-4 text-coral" />
              Lo que tu algoritmo no te enseña
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-ink dark:text-white sm:text-6xl lg:text-7xl">
              ¿Que idea quieres poner a prueba hoy?
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite dark:text-white/70">
              Detecta ideas e ideologias que se vuelven virales en redes y las contrasta con argumentos a favor, argumentos en contra, evidencia, sesgos y recursos. La mision es ayudarte a salir del dogma de tu propio algoritmo.
            </p>
            <HomeSearch topics={topics} />
            <div className="mt-5 grid max-w-2xl gap-3 sm:grid-cols-2">
              <Link href="/analizador" className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-ink px-5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-cobalt dark:bg-white dark:text-ink">
                <Search className="h-4 w-4" />
                Buscar y analizar
              </Link>
              <Link href="/comparar" className="inline-flex h-14 items-center justify-center gap-2 rounded-lg border border-ink/10 bg-white/80 px-5 text-sm font-semibold text-ink shadow-soft transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/[0.06] dark:text-white">
                <ArrowRightLeft className="h-4 w-4" />
                Comparar dos ideas
              </Link>
            </div>
            <div className="mt-4 grid max-w-2xl gap-3 sm:grid-cols-[1.3fr_0.7fr]">
              <Link href="/tiktok" className="inline-flex h-16 items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-coral via-cobalt to-sage px-5 text-base font-semibold text-white shadow-soft transition hover:scale-[1.01]">
                <Video className="h-5 w-5" />
                Analiza este TikTok
              </Link>
              <SurpriseButton slugs={topics.map((topic) => topic.slug)} />
            </div>
          </div>
        </section>

        <section className="grid gap-4 py-8 md:grid-cols-3">
          <article className="rounded-lg border border-ink/10 bg-white/75 p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-coral dark:text-orange-200">1. Detectar</p>
            <h2 className="mt-3 text-xl font-semibold text-ink dark:text-white">Lo que esta de moda</h2>
            <p className="mt-3 text-sm leading-7 text-graphite dark:text-white/70">
              Red Pill, 4B, Trad Wives, ayuno de dopamina, pornografia, IA y otros marcos que aparecen una y otra vez en tu feed.
            </p>
          </article>
          <article className="rounded-lg border border-ink/10 bg-white/75 p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cobalt dark:text-blue-200">2. Contrastar</p>
            <h2 className="mt-3 text-xl font-semibold text-ink dark:text-white">El mejor argumento de cada lado</h2>
            <p className="mt-3 text-sm leading-7 text-graphite dark:text-white/70">
              No caricaturas. Cada ficha separa lo que probablemente es cierto, lo exagerado, lo que falta por saber y el nivel de evidencia.
            </p>
          </article>
          <article className="rounded-lg border border-ink/10 bg-white/75 p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sage dark:text-emerald-200">3. Salir</p>
            <h2 className="mt-3 text-xl font-semibold text-ink dark:text-white">Fuera de la camara de eco</h2>
            <p className="mt-3 text-sm leading-7 text-graphite dark:text-white/70">
              El objetivo no es decirte que pensar, sino darte fuentes, contraargumentos y preguntas mejores para pensar con mas libertad.
            </p>
          </article>
        </section>

        <section id="tendencias" className="py-12">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cobalt dark:text-blue-300">Tendencias</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink dark:text-white">Ideas que ya puedes abrir</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {demoTrends.map(([title, slug]) => (
              <Link key={slug} href={`/temas/${slug}`} className="group flex items-center justify-between rounded-lg border border-ink/10 bg-white/75 p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-coral/40 dark:border-white/10 dark:bg-white/[0.04]">
                <span className="flex items-center gap-2 text-sm font-semibold text-ink dark:text-white">
                  <Flame className="h-4 w-4 text-coral transition group-hover:scale-110" />
                  {title}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-10">
          <div className="mb-6 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral dark:text-orange-200">Diccionario del feed</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink dark:text-white">Frases virales traducidas a preguntas mejores</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {feedDictionary.slice(0, 6).map((signal) => (
              <Link
                key={signal.phrase}
                href={`/temas/${signal.topicSlug}`}
                className="group rounded-lg border border-ink/10 bg-white/75 p-5 shadow-soft transition hover:-translate-y-1 hover:border-cobalt/30 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-ink dark:text-white">{signal.phrase}</h3>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-coral transition group-hover:translate-x-1" />
                </div>
                <p className="mt-3 text-sm leading-6 text-graphite dark:text-white/65">{signal.tone}</p>
                <p className="mt-4 rounded-md bg-cobalt/5 p-3 text-sm font-medium leading-6 text-cobalt dark:bg-blue-300/10 dark:text-blue-100">
                  {signal.criticalQuestion}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-12">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage dark:text-emerald-200">Ponlo a prueba</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink dark:text-white">Mini-retos contra el piloto automatico</h2>
            </div>
            <Link href="/analizador" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-ink px-5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-cobalt dark:bg-white dark:text-ink">
              <BrainCircuit className="h-4 w-4" />
              Probar otra idea
            </Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {feedDictionary.slice(6, 12).map((signal, index) => (
              <Link
                key={signal.phrase}
                href={`/temas/${signal.topicSlug}`}
                className="group flex min-h-72 flex-col justify-between rounded-lg border border-ink/10 bg-white/80 p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-sage/40 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-coral/20 to-cobalt/20 text-sm font-bold text-cobalt dark:text-blue-100">
                      {index + 1}
                    </span>
                    <Target className="h-5 w-5 text-sage transition group-hover:scale-110" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink dark:text-white">{signal.phrase}</h3>
                  <p className="mt-3 text-sm leading-6 text-graphite dark:text-white/65">{signal.tone}</p>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="rounded-md bg-coral/8 p-3 dark:bg-coral/10">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-coral dark:text-orange-200">Trampa</p>
                    <p className="mt-2 text-sm leading-6 text-graphite dark:text-white/70">{signal.trap}</p>
                  </div>
                  <div className="rounded-md bg-sage/10 p-3 dark:bg-sage/15">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage dark:text-emerald-200">Movimiento critico</p>
                    <p className="mt-2 text-sm leading-6 text-graphite dark:text-white/70">{signal.criticalMove}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coral dark:text-orange-200">Biblioteca</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink dark:text-white">Mas temas para contrastar</h2>
            </div>
            <Link href="/temas" className="inline-flex items-center gap-2 text-sm font-semibold text-cobalt dark:text-blue-300">
              Ver los {topics.length} temas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="topic-grid grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {trendingTopics.slice(0, 12).map((topic) => (
              <TopicCard key={topic.slug} {...topic} />
            ))}
          </div>
        </section>

        <section id="categorias" className="py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cobalt dark:text-blue-300">Categorias</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map(({ name, icon: Icon }) => (
              <Link
                key={name}
                href={{ pathname: "/temas", query: { categoria: name } }}
                className="group flex items-center gap-3 rounded-lg border border-ink/10 bg-white/65 p-4 transition hover:-translate-y-0.5 hover:border-cobalt/30 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cobalt/15 to-coral/20">
                  <Icon className="h-5 w-5 text-cobalt transition group-hover:scale-110 dark:text-blue-200" />
                </span>
                <span className="min-w-0 flex-1 text-sm font-medium text-ink dark:text-white">{name}</span>
                <span className="text-xs font-semibold text-graphite/60 dark:text-white/45">
                  {topics.filter((topic) => topic.category === name).length}
                </span>
                <ArrowRight className="h-4 w-4 text-cobalt opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </section>

        <section className="grid items-center gap-8 border-y border-ink/10 py-12 dark:border-white/10 md:grid-cols-[0.7fr_1.3fr]">
          <div className="flex h-48 items-center justify-center bg-coral text-white md:h-64">
            <BookOpen className="h-16 w-16" strokeWidth={1.4} />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase text-coral dark:text-orange-200">La voz detras del proyecto</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-ink dark:text-white">
              La evidencia ordena el debate. La escritura permite habitarlo.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-graphite dark:text-white/70">
              CONTRASTE reune fuentes, argumentos e incertidumbres. En mi cuaderno personal exploro las ideas con otra profundidad: ensayos, escritos y creaciones que no caben en una ficha.
            </p>
            <Link
              href="/escritos"
              className="mt-6 inline-flex h-12 items-center gap-2 bg-ink px-5 text-sm font-semibold text-white transition hover:bg-cobalt dark:bg-white dark:text-ink"
            >
              Leer mis escritos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

      </PageFrame>
    </>
  );
}
