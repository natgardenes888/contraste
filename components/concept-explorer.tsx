"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getConceptDefinition } from "@/data/concept-definitions";

export function ConceptExplorer({ concepts }: { concepts: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {concepts.map((concept) => {
          const isSelected = selected === concept;
          return (
            <button
              key={concept}
              type="button"
              aria-expanded={isSelected}
              aria-controls="concept-definition"
              onClick={() => setSelected(isSelected ? null : concept)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                isSelected
                  ? "border-cobalt bg-cobalt text-white"
                  : "border-ink/10 bg-white text-graphite hover:border-cobalt/40 hover:text-cobalt dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70"
              }`}
            >
              {concept}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isSelected ? "rotate-180" : ""}`} />
            </button>
          );
        })}
      </div>

      {selected ? (
        <div id="concept-definition" role="region" aria-live="polite" className="mt-4 rounded-lg border-l-4 border-cobalt bg-cobalt/5 p-5 dark:bg-cobalt/10">
          <h3 className="font-semibold text-ink dark:text-white">{selected}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-graphite dark:text-white/70">
            {getConceptDefinition(selected)}
          </p>
        </div>
      ) : null}
    </div>
  );
}
