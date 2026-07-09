"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import type { Topic } from "@/data/topics";
import { feedDictionary } from "@/data/feed-dictionary";

export function HomeSearch({ topics }: { topics: Topic[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return topics.slice(0, 2);
    }

    const scored = topics
      .map((topic) => {
        const signals = feedDictionary.filter((signal) => signal.topicSlug === topic.slug);
        const signalText = signals
          .flatMap((signal) => [signal.phrase, signal.tone, signal.criticalQuestion, ...signal.aliases])
          .join(" ");
      const haystack = [
        topic.title,
        topic.category,
        topic.summary,
          topic.whyTrending,
        ...topic.biases,
        ...topic.relatedConcepts,
        ...topic.known,
          ...topic.unknown,
          signalText
      ]
        .join(" ")
        .toLowerCase();

        const title = topic.title.toLowerCase();
        const exactSignal = signals.some((signal) => signal.aliases.some((alias) => alias.toLowerCase() === normalized));
        const aliasMatch = signals.some((signal) => signal.aliases.some((alias) => alias.toLowerCase().includes(normalized) || normalized.includes(alias.toLowerCase())));

        if (exactSignal) return { topic, score: 100 };
        if (title.includes(normalized)) return { topic, score: 80 };
        if (aliasMatch) return { topic, score: 70 };
        if (haystack.includes(normalized)) return { topic, score: 40 };
        return { topic, score: 0 };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score);

    return scored.map(({ topic }) => topic);
  }, [query, topics]);

  const analyzerHref = { pathname: "/analizador" as const, query: { q: query.trim() } };
  const primary = results[0] ?? topics[0];

  return (
    <div id="buscar" className="max-w-2xl scroll-mt-24">
      <div className="mt-8 flex flex-col gap-3 rounded-lg border border-ink/10 bg-white p-2 shadow-soft dark:border-white/10 dark:bg-white/[0.06] sm:flex-row">
        <label className="flex flex-1 items-center gap-3 px-3">
          <Search className="h-5 w-5 text-graphite dark:text-white/50" />
          <input
            aria-label="Buscar una idea"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar una idea..."
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-graphite/60 dark:text-white dark:placeholder:text-white/40"
          />
        </label>
        {query && results.length === 0 ? (
          <Link href={analyzerHref} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-ink px-5 text-sm font-semibold text-white transition hover:bg-cobalt dark:bg-white dark:text-ink">
            Investigar
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link href={`/temas/${primary.slug}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-ink px-5 text-sm font-semibold text-white transition hover:bg-cobalt dark:bg-white dark:text-ink">
            Buscar
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      {query ? (
        <div aria-live="polite" className="mt-3 rounded-lg border border-ink/10 bg-white/90 p-2 shadow-soft dark:border-white/10 dark:bg-[#171714]">
          {results.length ? (
            results.map((topic) => (
              <Link key={topic.slug} href={`/temas/${topic.slug}`} className="block rounded-md px-3 py-3 text-sm hover:bg-ink/5 dark:hover:bg-white/10">
                <span className="font-semibold text-ink dark:text-white">{topic.title}</span>
                <span className="ml-2 text-graphite dark:text-white/60">{topic.category}</span>
                {feedDictionary.some((signal) => signal.topicSlug === topic.slug && signal.aliases.some((alias) => alias.toLowerCase().includes(query.trim().toLowerCase()) || query.trim().toLowerCase().includes(alias.toLowerCase()))) ? (
                  <span className="mt-1 block text-xs font-medium text-coral dark:text-orange-200">Detectado como idea viral del feed</span>
                ) : null}
              </Link>
            ))
          ) : (
            <Link href={analyzerHref} className="flex items-center justify-between rounded-md px-3 py-3 text-sm font-semibold text-cobalt hover:bg-cobalt/5 dark:text-blue-300">
              Investigar esta idea con CONTRASTE
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
}
