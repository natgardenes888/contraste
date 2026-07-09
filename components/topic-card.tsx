import Link from "next/link";
import { ArrowUpRight, BookOpen, Tag } from "lucide-react";
import type { Argument, Resource } from "@/data/topics";
import { EvidenceBadge } from "@/components/evidence";

const categoryColors: Record<string, string> = {
  Psicologia: "from-pink-500/20 via-white/75 to-cobalt/10 dark:from-pink-400/20 dark:via-white/[0.04] dark:to-blue-400/10",
  Relaciones: "from-coral/25 via-white/75 to-pink-300/20 dark:from-coral/20 dark:via-white/[0.04] dark:to-pink-300/10",
  Nutricion: "from-lime-400/25 via-white/75 to-sage/20 dark:from-lime-300/15 dark:via-white/[0.04] dark:to-sage/15",
  Salud: "from-emerald-300/25 via-white/75 to-cobalt/10 dark:from-emerald-300/15 dark:via-white/[0.04] dark:to-cobalt/15",
  Ciencia: "from-cobalt/20 via-white/75 to-gold/20 dark:from-cobalt/20 dark:via-white/[0.04] dark:to-gold/10",
  Tecnologia: "from-sky-400/25 via-white/75 to-cobalt/20 dark:from-sky-400/15 dark:via-white/[0.04] dark:to-cobalt/20",
  IA: "from-violet-400/25 via-white/75 to-cobalt/20 dark:from-violet-400/20 dark:via-white/[0.04] dark:to-cobalt/20",
  Filosofia: "from-gold/25 via-white/75 to-coral/10 dark:from-gold/15 dark:via-white/[0.04] dark:to-coral/10",
  Politica: "from-red-300/20 via-white/75 to-cobalt/15 dark:from-red-300/15 dark:via-white/[0.04] dark:to-cobalt/15",
  Economia: "from-gold/25 via-white/75 to-emerald-300/20 dark:from-gold/15 dark:via-white/[0.04] dark:to-emerald-300/10",
  Historia: "from-amber-300/25 via-white/75 to-coral/15 dark:from-amber-300/15 dark:via-white/[0.04] dark:to-coral/10",
  Sociedad: "from-coral/20 via-white/75 to-cobalt/15 dark:from-coral/15 dark:via-white/[0.04] dark:to-cobalt/15",
  Educacion: "from-cobalt/20 via-white/75 to-emerald-300/20 dark:from-cobalt/15 dark:via-white/[0.04] dark:to-emerald-300/10",
  "Medio ambiente": "from-sage/30 via-white/75 to-lime-300/20 dark:from-sage/20 dark:via-white/[0.04] dark:to-lime-300/10",
  Cultura: "from-fuchsia-300/25 via-white/75 to-gold/15 dark:from-fuchsia-300/15 dark:via-white/[0.04] dark:to-gold/10",
  Espiritualidad: "from-indigo-300/25 via-white/75 to-gold/15 dark:from-indigo-300/15 dark:via-white/[0.04] dark:to-gold/10"
};

export function TopicCard({
  title,
  category,
  status,
  slug,
  support,
  opposition,
  resources
}: {
  title: string;
  category: string;
  status: string;
  slug: string;
  support?: Argument[];
  opposition?: Argument[];
  resources?: Resource[];
}) {
  const color = categoryColors[category] ?? "from-white/80 via-white/75 to-cobalt/10 dark:from-white/[0.08] dark:via-white/[0.04] dark:to-cobalt/10";
  const strongestArgument = support?.[0] ?? opposition?.[0];
  const resourceCount = resources?.length ?? [...(support ?? []), ...(opposition ?? [])].flatMap((argument) => argument.resources).length;

  return (
    <Link
      href={`/temas/${slug}`}
      className={`group flex min-h-40 flex-col justify-between rounded-lg border border-ink/10 bg-gradient-to-br ${color} p-4 shadow-soft transition duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:border-cobalt/30 dark:border-white/10 sm:min-h-56 sm:p-5`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-graphite dark:bg-white/10 dark:text-white/70">
          <Tag className="h-3 w-3" />
          {category}
        </span>
        <ArrowUpRight className="h-4 w-4 text-graphite transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-white/60" />
      </div>
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-ink dark:text-white sm:text-xl">{title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-graphite dark:text-white/65 sm:mt-3 sm:line-clamp-none">{status}</p>
        {strongestArgument ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <EvidenceBadge level={strongestArgument.evidence} />
            {resourceCount ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-graphite dark:bg-white/10 dark:text-white/70">
                <BookOpen className="h-3.5 w-3.5" />
                {resourceCount} fuentes
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
