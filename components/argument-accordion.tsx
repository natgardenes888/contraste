"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Argument } from "@/data/topics";
import { ConceptExplorer } from "@/components/concept-explorer";
import { EvidenceBadge, StudyIcon } from "@/components/evidence";
import { ScientificResourceActions } from "@/components/scientific-resource-actions";
import { TweetShareButton } from "@/components/tweet-share-button";

export function ArgumentAccordion({ argument }: { argument: Argument }) {
  const [open, setOpen] = useState(false);
  const panelId = `argument-${argument.id ?? argument.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <article className="rounded-lg border border-ink/10 bg-white/75 dark:border-white/10 dark:bg-white/[0.04]">
      <button
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <EvidenceBadge level={argument.evidence} />
            <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-graphite dark:bg-white/10 dark:text-white/70">
              Consenso {argument.consensus.toLowerCase()}
            </span>
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-ink dark:text-white">{argument.title}</h3>
          {argument.summary ? <p className="mt-2 text-sm leading-6 text-graphite dark:text-white/60">{argument.summary}</p> : null}
        </div>
        <ChevronDown className={`h-5 w-5 shrink-0 text-graphite transition dark:text-white/60 ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div id={panelId} className="border-t border-ink/10 p-5 dark:border-white/10">
          <p className="text-sm leading-7 text-graphite dark:text-white/70">{argument.explanation}</p>
          <div className="mt-4">
            <TweetShareButton
              compact
              text={`${argument.title}. ${argument.summary ?? argument.explanation}`}
            />
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <ListBlock title="Fortalezas" items={argument.strengths} />
            <ListBlock title="Limitaciones" items={argument.limitations} />
            <ListBlock title="Contraargumentos" items={argument.counterarguments} />
            <div>
              <h4 className="text-sm font-semibold text-ink dark:text-white">Conceptos relacionados</h4>
              <div className="mt-2">
                <ConceptExplorer concepts={argument.relatedConcepts} />
              </div>
            </div>
            <ListBlock title="Preguntas para seguir pensando" items={argument.questions ?? []} />
          </div>
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-graphite dark:text-white/60">Recursos cientificos</h4>
            {argument.resources.map((resource) => (
              <div key={`${resource.title}-${resource.year}`} className="rounded-lg border border-ink/10 bg-paper/70 p-4 dark:border-white/10 dark:bg-black/15">
                <div className="flex flex-wrap items-center gap-2">
                  <StudyIcon type={resource.studyType} />
                  <span className="rounded-full bg-ink/5 px-2.5 py-1 text-xs text-graphite dark:bg-white/10 dark:text-white/70">
                    {resource.participants}
                  </span>
                </div>
                <h5 className="mt-3 font-semibold text-ink dark:text-white">{resource.title}</h5>
                <p className="mt-1 text-sm text-graphite dark:text-white/60">
                  {resource.authors} · {resource.year} · {resource.journal}
                </p>
                <p className="mt-3 text-sm leading-6 text-graphite dark:text-white/70">{resource.summary}</p>
                <p className="mt-2 text-xs leading-5 text-graphite/80 dark:text-white/55">
                  Limitaciones: {resource.limitations}
                </p>
                <ScientificResourceActions resource={resource} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-ink dark:text-white">{title}</h4>
      <ul className="mt-2 space-y-2 text-sm leading-6 text-graphite dark:text-white/70">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
