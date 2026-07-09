import { BookOpen, ExternalLink, Search } from "lucide-react";
import type { Resource } from "@/data/topics";

export function ScientificResourceActions({ resource }: { resource: Resource }) {
  const query = `${resource.title} ${resource.authors}`;
  return (
    <div className="mt-4 flex flex-wrap gap-2" aria-label={`Opciones para consultar ${resource.title}`}>
      <ResourceLink href={resource.url} label="Leer original" icon={<ExternalLink className="h-3.5 w-3.5" />} />
      <ResourceLink href={`https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`} label="Google Scholar" icon={<BookOpen className="h-3.5 w-3.5" />} />
      <ResourceLink href={`https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(resource.title)}`} label="PubMed" icon={<Search className="h-3.5 w-3.5" />} />
      <ResourceLink href={`https://www.semanticscholar.org/search?q=${encodeURIComponent(query)}`} label="Semantic Scholar" icon={<Search className="h-3.5 w-3.5" />} />
    </div>
  );
}

function ResourceLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-ink/10 bg-white px-3 text-xs font-semibold text-cobalt transition hover:border-cobalt/30 hover:bg-cobalt/5 dark:border-white/10 dark:bg-white/[0.04] dark:text-blue-300">
      {icon}
      {label}
      <span className="sr-only">(abre en una pestaña nueva)</span>
    </a>
  );
}
