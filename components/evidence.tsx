import { CheckCircle2, CircleAlert, CircleDot, CircleSlash, FileText, FlaskConical, LineChart, Microscope, Scale } from "lucide-react";
import type { EvidenceLevel, StudyType } from "@/data/topics";

const evidenceStyles: Record<EvidenceLevel, string> = {
  Alta: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200",
  Moderada: "bg-yellow-100 text-yellow-800 dark:bg-yellow-400/15 dark:text-yellow-100",
  Baja: "bg-orange-100 text-orange-800 dark:bg-orange-400/15 dark:text-orange-100",
  "Sin evidencia suficiente": "bg-red-100 text-red-800 dark:bg-red-400/15 dark:text-red-100"
};

const evidenceIcons = {
  Alta: CheckCircle2,
  Moderada: CircleDot,
  Baja: CircleAlert,
  "Sin evidencia suficiente": CircleSlash
};

const studyIcons: Record<StudyType, React.ComponentType<{ className?: string }>> = {
  Metaanalisis: Scale,
  "Revision sistematica": FileText,
  "Ensayo clinico": FlaskConical,
  Longitudinal: LineChart,
  Observacional: Microscope,
  Opinion: FileText
};

export function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  const Icon = evidenceIcons[level];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${evidenceStyles[level]}`}>
      <Icon className="h-3.5 w-3.5" />
      Evidencia {level.toLowerCase()}
    </span>
  );
}

export function StudyIcon({ type }: { type: StudyType }) {
  const Icon = studyIcons[type];

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 px-2.5 py-1 text-xs text-graphite dark:border-white/10 dark:text-white/70">
      <Icon className="h-3.5 w-3.5" />
      {type}
    </span>
  );
}
