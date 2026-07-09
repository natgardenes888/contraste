"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { TopicCard } from "@/components/topic-card";
import type { Topic } from "@/data/topics";

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function TopicExplorer({ topics, initialCategory = "Todos" }: { topics: Topic[]; initialCategory?: string }) {
  const [query, setQuery] = useState("");
  const categories = useMemo(() => ["Todos", ...Array.from(new Set(topics.map((topic) => topic.category))).sort()], [topics]);
  const [category, setCategory] = useState(categories.includes(initialCategory) ? initialCategory : "Todos");
  const categoryStats = useMemo(() => {
    return categories.reduce<Record<string, number>>((stats, item) => {
      stats[item] = item === "Todos" ? topics.length : topics.filter((topic) => topic.category === item).length;
      return stats;
    }, {});
  }, [categories, topics]);

  const results = useMemo(() => {
    const needle = normalize(query.trim());
    const terms = needle.split(" ").filter((term) => term.length > 2);
    return topics
      .filter((topic) => category === "Todos" || topic.category === category)
      .filter((topic) => {
        if (!needle) return true;
        const haystack = normalize([
          topic.title,
          topic.summary,
          topic.whyTrending,
          topic.category,
          ...topic.relatedConcepts,
          ...topic.biases,
          ...topic.known,
          ...topic.unknown
        ].join(" "));
        return haystack.includes(needle) || terms.every((term) => haystack.includes(term));
      })
      .sort((a, b) => a.title.localeCompare(b.title, "es"));
  }, [category, query, topics]);

  const hasFilters = query.length > 0 || category !== "Todos";
  return (
    <div>
      <div className="sticky top-16 z-30 border-y border-ink/10 bg-paper/90 py-5 backdrop-blur-xl dark:border-white/10 dark:bg-[#11110f]/90">
        <label className="flex h-12 items-center gap-3 border border-ink/10 bg-white px-4 dark:border-white/10 dark:bg-white/[0.06]">
          <Search className="h-5 w-5 shrink-0 text-cobalt" />
          <input
            aria-label="Buscar temas"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por idea, concepto o sesgo..."
            className="h-full w-full bg-transparent text-sm text-ink outline-none placeholder:text-graphite/55 dark:text-white dark:placeholder:text-white/40"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Borrar búsqueda" className="text-graphite hover:text-ink dark:text-white/55 dark:hover:text-white">
              <X className="h-4 w-4" />
            </button>
          )}
        </label>
        <div className="hide-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-4 text-xs font-semibold transition ${
                category === item
                  ? "bg-ink text-white dark:bg-white dark:text-ink"
                  : "border border-ink/10 bg-white/70 text-graphite hover:border-cobalt/40 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/65"
              }`}
            >
              <span>{item}</span>
              <span className={`rounded-full px-2 py-0.5 text-[0.68rem] ${category === item ? "bg-white/15 text-white dark:bg-ink/10 dark:text-ink" : "bg-ink/5 text-graphite/70 dark:bg-white/10 dark:text-white/50"}`}>
                {categoryStats[item]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 py-7 md:flex-row md:items-end md:justify-between">
        <div>
          <p role="status" aria-live="polite" className="text-sm text-graphite dark:text-white/60">
            <strong className="text-ink dark:text-white">{results.length}</strong> {results.length === 1 ? "tema" : "temas"}
            {category !== "Todos" ? ` en ${category}` : ""}
          </p>
          {category !== "Todos" ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-graphite dark:text-white/60">
              Estás viendo una ruta temática. Abre una ficha para ver argumentos, contraargumentos, fuentes y conceptos relacionados.
            </p>
          ) : null}
        </div>
        {hasFilters && (
          <button type="button" onClick={() => { setQuery(""); setCategory("Todos"); }} className="inline-flex items-center gap-2 text-sm font-semibold text-coral">
            <X className="h-4 w-4" /> Limpiar filtros
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="topic-grid grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((topic) => <TopicCard key={topic.slug} {...topic} />)}
        </div>
      ) : (
        <div className="border border-dashed border-ink/15 py-20 text-center dark:border-white/15">
          <p className="text-lg font-semibold text-ink dark:text-white">Todavía no hay una ficha para esa búsqueda.</p>
          <p className="mt-2 text-sm text-graphite dark:text-white/60">Puedes investigarla desde el analizador o probar con un concepto más amplio.</p>
        </div>
      )}
    </div>
  );
}
