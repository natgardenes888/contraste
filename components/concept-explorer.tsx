"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getConceptDefinition } from "@/data/concept-definitions";

export function ConceptExplorer({ concepts }: { concepts: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const definitionId = useId();

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
              aria-controls={definitionId}
              onClick={() => setSelected(isSelected ? null : concept)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${
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
        <div id={definitionId} role="region" aria-live="polite" className="mt-3 rounded-lg border-l-4 border-cobalt bg-cobalt/5 p-4 dark:bg-cobalt/10 sm:mt-4 sm:p-5">
          <h3 className="font-semibold text-ink dark:text-white">{selected}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-graphite dark:text-white/70">
            {getConceptDefinition(selected)}
          </p>
        </div>
      ) : null}
    </div>
  );
}
