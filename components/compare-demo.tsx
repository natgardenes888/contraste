"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowRightLeft, CheckCircle2, CircleHelp, RefreshCw, Scale, ShieldAlert } from "lucide-react";
import { topics, type Topic } from "@/data/topics";
import { ShareableReport } from "@/components/shareable-report";

const evidenceScore = { Alta: 4, Moderada: 3, Baja: 2, "Sin evidencia suficiente": 1 };

export function CompareDemo() {
  const [left, setLeft] = useState("feminismo-4b");
  const [right, setRight] = useState("red-pill");
  const leftTopic = topics.find((topic) => topic.slug === left) ?? topics[0];
  const rightTopic = topics.find((topic) => topic.slug === right) ?? topics[1];
  const comparison = useMemo(() => compareTopics(leftTopic, rightTopic), [leftTopic, rightTopic]);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,0.72fr)_minmax(18rem,0.28fr)]">
      <section className="rounded-lg border border-ink/10 bg-white/80 p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
        <header className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cobalt to-coral text-white">
            <ArrowRightLeft className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-coral dark:text-orange-200">Comparador</p>
            <h1 className="text-3xl font-semibold tracking-tight text-ink dark:text-white">Comparar dos ideas</h1>
          </div>
        </header>

        <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-end">
          <TopicSelect label="Idea A" value={left} onChange={setLeft} excluded={right} />
          <button
            type="button"
            onClick={() => {
              setLeft(right);
              setRight(left);
            }}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-ink/10 bg-white px-4 text-sm font-semibold text-graphite transition hover:border-cobalt/30 hover:text-cobalt dark:border-white/10 dark:bg-white/[0.05] dark:text-white/70"
            aria-label="Intercambiar ideas"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="md:hidden">Intercambiar</span>
            <span className="hidden md:inline">vs</span>
          </button>
          <TopicSelect label="Idea B" value={right} onChange={setRight} excluded={left} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <IdeaPanel topic={leftTopic} accent="cobalt" />
          <IdeaPanel topic={rightTopic} accent="coral" />
        </div>

        <div className="mt-6 space-y-4">
          <ComparisonBlock icon={Scale} title="Diferencia central">
            <p>{comparison.centralDifference}</p>
          </ComparisonBlock>

          <div className="grid gap-4 md:grid-cols-2">
            <EvidencePanel label={leftTopic.title} topic={leftTopic} />
            <EvidencePanel label={rightTopic.title} topic={rightTopic} />
          </div>

          <ComparisonBlock icon={CheckCircle2} title="Dónde coinciden">
            <p>{comparison.commonGround}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {comparison.sharedConcepts.map((concept) => (
                <span key={concept} className="rounded-full bg-cobalt/10 px-3 py-1 text-xs font-semibold text-cobalt dark:text-blue-200">
                  {concept}
                </span>
              ))}
            </div>
          </ComparisonBlock>

          <ComparisonBlock icon={Scale} title="Cómo leer esta comparación">
            <p>{comparison.evidenceReading}</p>
          </ComparisonBlock>

          <div className="grid gap-4 md:grid-cols-2">
            <ListPanel title={`Límites de ${leftTopic.title}`} items={leftTopic.unknown.slice(0, 3)} />
            <ListPanel title={`Límites de ${rightTopic.title}`} items={rightTopic.unknown.slice(0, 3)} />
          </div>

          <ComparisonBlock icon={ShieldAlert} title="Qué no sería una comparación justa">
            <p>{comparison.unfairComparison}</p>
          </ComparisonBlock>

          <ComparisonBlock icon={CircleHelp} title="Preguntas que deciden el debate">
            <ul className="space-y-2">
              {comparison.questions.map((question) => (
                <li key={question} className="flex gap-2">
                  <span className="font-semibold text-coral">?</span>
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </ComparisonBlock>
        </div>
      </section>

      <ShareableReport
        title={`${leftTopic.title} vs ${rightTopic.title}`}
        summary={comparison.centralDifference}
        confidence={comparison.confidence}
        signals={comparison.sharedConcepts.slice(0, 3)}
      />
    </div>
  );
}

function compareTopics(left: Topic, right: Topic) {
  const normalize = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const rightConcepts = new Set(right.relatedConcepts.map(normalize));
  const shared = left.relatedConcepts.filter((concept) => rightConcepts.has(normalize(concept)));
  const sharedConcepts = shared.length ? shared : [left.relatedConcepts[0], right.relatedConcepts[0]].filter(Boolean);
  const leftArgument = left.support[0];
  const rightArgument = right.support[0];
  const leftChallenge = left.opposition[0];
  const rightChallenge = right.opposition[0];
  const leftEvidence = averageEvidence(left);
  const rightEvidence = averageEvidence(right);
  const confidence = Math.round(((leftEvidence + rightEvidence) / 8) * 100);
  const leftResources = resourceCount(left);
  const rightResources = resourceCount(right);

  return {
    centralDifference:
      `${left.title} pone el foco en “${leftArgument.title}”. ${right.title}, en cambio, se apoya principalmente en “${rightArgument.title}”. ` +
      `Por tanto, no discuten exactamente la misma pregunta: una comparación útil debe decidir qué diagnóstico explica mejor los hechos y qué consecuencias produce cada propuesta.`,
    commonGround: shared.length
      ? `Ambas ideas se cruzan en ${shared.join(", ")}. Ese terreno compartido permite comparar resultados concretos sin reducir el debate a identidades enfrentadas.`
      : `No comparten conceptos explícitos en sus fichas. El punto común más prudente es que ambas intentan explicar problemas actuales desde marcos diferentes; antes de enfrentarlas habría que acordar qué resultado se quiere evaluar.`,
    sharedConcepts,
    evidenceReading:
      `${left.title} tiene ${leftResources} recursos enlazados en la ficha y ${right.title} tiene ${rightResources}. ` +
      `Esta diferencia no decide quién tiene razón, pero sí indica cuánta base documental hay ahora mismo dentro de CONTRASTE. La comparación debe pesar mecanismos, datos, costes y excepciones, no solo cuál resulta más intuitiva.`,
    unfairComparison:
      `Sería injusto presentar la versión más fuerte de ${left.title} frente a la caricatura de ${right.title}, o al revés. ` +
      `La objeción principal a la primera es “${leftChallenge.title}”; la objeción principal a la segunda es “${rightChallenge.title}”. Ambas deben responderse con el mismo nivel de exigencia.`,
    questions: [
      `¿Qué evidencia permitiría elegir entre “${leftArgument.title}” y “${rightArgument.title}”?`,
      `¿La objeción “${leftChallenge.title}” debilita el núcleo de ${left.title} o solo una versión extrema?`,
      `¿La objeción “${rightChallenge.title}” debilita el núcleo de ${right.title} o solo una mala aplicación?`,
      `¿Qué grupo asumiría los costes de cada enfoque y quién recibiría sus beneficios?`
    ],
    confidence
  };
}

function averageEvidence(topic: Topic) {
  const argumentsToScore = [...topic.support, ...topic.opposition];
  if (!argumentsToScore.length) return 1;
  return argumentsToScore.reduce((sum, argument) => sum + evidenceScore[argument.evidence], 0) / argumentsToScore.length;
}

function resourceCount(topic: Topic) {
  return topic.resources?.length ?? [...topic.support, ...topic.opposition].flatMap((argument) => argument.resources).length;
}

function TopicSelect({ label, value, onChange, excluded }: { label: string; value: string; onChange: (value: string) => void; excluded: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-graphite dark:text-white/55">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-12 w-full rounded-md border border-ink/10 bg-paper px-3 text-sm font-semibold text-ink outline-none focus:border-cobalt dark:border-white/10 dark:bg-black/20 dark:text-white">
        {topics.filter((topic) => topic.slug !== excluded).map((topic) => (
          <option key={topic.slug} value={topic.slug}>{topic.title}</option>
        ))}
      </select>
    </label>
  );
}

function IdeaPanel({ topic, accent }: { topic: Topic; accent: "cobalt" | "coral" }) {
  const argument = topic.support[0];
  return (
    <article className={`rounded-lg border bg-white/80 p-4 dark:bg-white/[0.04] ${accent === "cobalt" ? "border-cobalt/25" : "border-coral/25"}`}>
      <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${accent === "cobalt" ? "text-cobalt" : "text-coral"}`}>{topic.category}</p>
      <h2 className="mt-2 text-xl font-semibold text-ink dark:text-white">{topic.title}</h2>
      <p className="mt-3 text-sm leading-6 text-graphite dark:text-white/70">{topic.summary}</p>
      <div className="mt-4 border-t border-ink/10 pt-4 dark:border-white/10">
        <p className="text-xs font-semibold uppercase text-graphite dark:text-white/50">Argumento más sólido</p>
        <p className="mt-2 text-sm font-semibold text-ink dark:text-white">{argument.title}</p>
        <p className="mt-1 text-xs text-graphite dark:text-white/55">Evidencia {argument.evidence} · Consenso {argument.consensus}</p>
      </div>
      <Link href={`/temas/${topic.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cobalt dark:text-blue-200">
        Abrir ficha <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}

function EvidencePanel({ label, topic }: { label: string; topic: Topic }) {
  const support = topic.support[0];
  const challenge = topic.opposition[0];
  const resourceCount = [...topic.support, ...topic.opposition].flatMap((argument) => argument.resources).length;
  return (
    <article className="rounded-lg border border-ink/10 bg-paper/70 p-4 dark:border-white/10 dark:bg-black/20">
      <h3 className="font-semibold text-ink dark:text-white">{label}</h3>
      <dl className="mt-3 space-y-3 text-sm leading-6 text-graphite dark:text-white/70">
        <div><dt className="font-semibold text-sage">A favor</dt><dd>{support.title}</dd></div>
        <div><dt className="font-semibold text-coral">Objeción</dt><dd>{challenge.title}</dd></div>
        <div><dt className="font-semibold text-ink dark:text-white">Base documental</dt><dd>{resourceCount} recursos enlazados</dd></div>
      </dl>
    </article>
  );
}

function ComparisonBlock({ icon: Icon, title, children }: { icon: typeof Scale; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-ink/10 bg-paper/70 p-4 text-sm leading-7 text-graphite dark:border-white/10 dark:bg-black/20 dark:text-white/70">
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase text-cobalt dark:text-blue-200"><Icon className="h-4 w-4" />{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function ListPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-ink/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.04]">
      <h3 className="font-semibold text-ink dark:text-white">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-graphite dark:text-white/70">
        {items.map((item) => <li key={item} className="flex gap-2"><span className="text-coral">•</span><span>{item}</span></li>)}
      </ul>
    </section>
  );
}
