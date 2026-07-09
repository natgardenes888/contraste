"use client";

import { useState } from "react";
import { BrainCircuit, ExternalLink, Gauge, LoaderCircle, SendHorizontal } from "lucide-react";
import { ShareableReport } from "@/components/shareable-report";
import { TweetShareButton } from "@/components/tweet-share-button";
import type { AnalysisMode, LocalAnalysis } from "@/lib/local-analysis";

const examples: Record<AnalysisMode, string> = {
  claim: "¿Las redes sociales están destruyendo la capacidad de atención?",
  devil: "La universidad ya no sirve.",
  tiktok: "Resume aquí la afirmación principal del vídeo."
};

export function AnalysisDemo({ mode, initialText }: { mode: AnalysisMode; initialText?: string }) {
  const [text, setText] = useState(initialText?.trim() || examples[mode]);
  const [analysis, setAnalysis] = useState<LocalAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyze() {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text, mode })
      });
      const payload = await response.json() as LocalAnalysis | { error: string };
      if (!response.ok || "error" in payload) {
        throw new Error("error" in payload ? payload.error : "No se pudo completar la búsqueda.");
      }
      setAnalysis(payload);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "No se pudo completar la búsqueda.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-4 sm:gap-6 xl:grid-cols-[minmax(18rem,0.34fr)_minmax(24rem,0.46fr)_minmax(14rem,0.20fr)]">
      <section className="aurora-panel rounded-lg border border-ink/10 bg-white/80 p-4 shadow-soft dark:border-white/10 dark:bg-white/[0.05] sm:p-5">
        <div className="relative z-10">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cobalt to-coral text-white sm:h-11 sm:w-11">
            <BrainCircuit className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <h1 className="mt-3 text-3xl font-semibold text-ink dark:text-white sm:mt-5 sm:text-4xl">{copy[mode].title}</h1>
          <p className="mt-3 text-sm leading-6 text-graphite dark:text-white/70 sm:mt-4 sm:leading-7">{copy[mode].subtitle}</p>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="mt-4 min-h-28 w-full resize-none rounded-lg border border-ink/10 bg-paper/80 p-3 text-sm leading-6 text-ink outline-none transition focus:border-cobalt dark:border-white/10 dark:bg-black/20 dark:text-white sm:mt-6 sm:min-h-40 sm:p-4"
            placeholder={copy[mode].placeholder}
          />
          <button
            onClick={analyze}
            disabled={text.trim().length < 8 || isLoading}
            className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white transition hover:bg-cobalt disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-ink sm:mt-4 sm:h-12 sm:px-5"
          >
            {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <SendHorizontal className="h-4 w-4" />}
            {isLoading ? "Buscando evidencia..." : copy[mode].button}
          </button>
          {error ? <p role="alert" className="mt-3 text-sm font-medium text-coral">{error}</p> : null}
          <p className="mt-3 text-xs leading-5 text-graphite/70 dark:text-white/45">
            Consulta la biblioteca de CONTRASTE y literatura académica pública. No requiere cuenta, clave ni pago.
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-ink/10 bg-white/80 p-4 shadow-soft dark:border-white/10 dark:bg-white/[0.04] sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-3 dark:border-white/10 sm:mb-5 sm:pb-4">
          <p className="text-sm font-semibold text-ink dark:text-white">Informe de contraste</p>
          {analysis ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cobalt/10 px-3 py-1 text-xs font-semibold text-cobalt dark:text-blue-200">
              <Gauge className="h-3.5 w-3.5" />
              Confianza {analysis.confidence}%
            </span>
          ) : null}
        </div>

        {analysis ? (
          <AnalysisResult analysis={analysis} />
        ) : (
          <div className="flex min-h-44 items-center justify-center rounded-lg border border-dashed border-ink/15 bg-paper/50 p-5 text-center dark:border-white/10 dark:bg-black/10 sm:min-h-[28rem] sm:p-8">
            <p className="max-w-sm text-sm leading-6 text-graphite dark:text-white/60 sm:leading-7">
              Escribe una idea concreta. CONTRASTE distinguirá sus supuestos, pruebas necesarias y mejores objeciones.
            </p>
          </div>
        )}
      </section>

      <ShareableReport
        title={copy[mode].reportTitle}
        summary={analysis?.summary ?? "El informe aparecerá aquí cuando termines el análisis."}
        confidence={analysis?.confidence ?? 0}
        signals={analysis?.biases.map((bias) => bias.name).slice(0, 3) ?? ["evidencia", "matices", "fuentes"]}
      />
    </div>
  );
}

function AnalysisResult({ analysis }: { analysis: LocalAnalysis }) {
  if (analysis.resultKind === "unresolved") {
    return (
      <div className="space-y-5" aria-live="polite">
        <ReportBlock title="No puedo responder con fiabilidad">
          <p>{analysis.summary}</p>
        </ReportBlock>
        <ListBlock title="Qué información falta" items={analysis.unknown} />
        <ListBlock title="Cómo formular mejor la búsqueda" items={analysis.questions} />
        <SearchLinks query={analysis.claim} />
      </div>
    );
  }

  if (analysis.resultKind === "research-map") {
    return (
      <div className="space-y-5" aria-live="polite">
        <ReportBlock title="Mapa de investigación">
          <p>{analysis.summary}</p>
          <p className="mt-3 font-medium text-ink dark:text-white">
            Estas publicaciones son candidatas de lectura. CONTRASTE no atribuye conclusiones sin revisar el texto completo.
          </p>
        </ReportBlock>
        <ListBlock title="Qué encontró la búsqueda" items={analysis.known} />
        <ListBlock title="Qué no puede concluir todavía" items={analysis.unknown} />
        <ListBlock title="Preguntas para revisar las fuentes" items={analysis.questions} />
        <SourceList sources={analysis.sources} />
      </div>
    );
  }

  return (
    <div className="space-y-5" aria-live="polite">
      <ReportBlock title="Afirmación precisa">
        <p>{analysis.claim}</p>
        <p className="mt-3 font-medium text-ink dark:text-white">Calidad global de evidencia: {analysis.evidenceQuality}</p>
      </ReportBlock>
      <ReportBlock title="Lectura breve"><p>{analysis.summary}</p></ReportBlock>
      <ArgumentGroup title="La mejor defensa" tone="support" arguments={analysis.argumentsFor} />
      <ArgumentGroup title="La mejor objeción" tone="opposition" arguments={analysis.argumentsAgainst} />
      <ListBlock title="Lo que sabemos" items={analysis.known} />
      <ListBlock title="Lo que no sabemos" items={analysis.unknown} />
      <ReportBlock title="Sesgos que pueden aparecer">
        <div className="space-y-3">
          {analysis.biases.map((bias) => <p key={bias.name}><strong className="text-ink dark:text-white">{bias.name}:</strong> {bias.explanation}</p>)}
        </div>
      </ReportBlock>
      <ListBlock title="Preguntas para seguir pensando" items={analysis.questions} />
      <ReportBlock title="Fuentes consultadas">
        <SourceCards sources={analysis.sources} />
      </ReportBlock>
    </div>
  );
}

function SourceList({ sources }: { sources: LocalAnalysis["sources"] }) {
  return (
    <ReportBlock title="Publicaciones relacionadas">
      <SourceCards sources={sources} />
    </ReportBlock>
  );
}

function SourceCards({ sources }: { sources: LocalAnalysis["sources"] }) {
  if (!sources.length) return <p>No hay fuentes suficientemente relacionadas.</p>;
  return (
    <div className="space-y-3">
      {sources.map((source) => (
        <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="flex items-start justify-between gap-3 rounded-md border border-ink/10 p-3 font-medium text-cobalt hover:bg-cobalt/5 dark:border-white/10 dark:text-blue-300">
          <span>
            {source.title}
            <small className="mt-1 block font-normal text-graphite dark:text-white/55">
              {source.authors ? `${source.authors} · ` : ""}{source.publisher}{source.year ? ` · ${source.year}` : ""}
              {typeof source.citations === "number" ? ` · ${source.citations} citas` : ""}
            </small>
            {source.summary ? <small className="mt-2 block font-normal leading-5 text-graphite dark:text-white/65">{source.summary}</small> : null}
          </span>
          <ExternalLink className="mt-0.5 h-4 w-4 shrink-0" />
        </a>
      ))}
    </div>
  );
}

function SearchLinks({ query }: { query: string }) {
  const encoded = encodeURIComponent(query);
  const links = [
    ["Buscar en Google Scholar", `https://scholar.google.com/scholar?q=${encoded}`],
    ["Buscar en PubMed", `https://pubmed.ncbi.nlm.nih.gov/?term=${encoded}`],
    ["Buscar en Semantic Scholar", `https://www.semanticscholar.org/search?q=${encoded}`]
  ];
  return (
    <ReportBlock title="Continuar la búsqueda">
      <div className="grid gap-2">
        {links.map(([label, href]) => (
          <a key={href} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center justify-between rounded-md border border-ink/10 px-3 py-2 font-medium text-cobalt hover:bg-cobalt/5 dark:border-white/10 dark:text-blue-300">
            {label}
            <ExternalLink className="h-4 w-4" />
          </a>
        ))}
      </div>
    </ReportBlock>
  );
}

function ArgumentGroup({ title, tone, arguments: items }: { title: string; tone: "support" | "opposition"; arguments: LocalAnalysis["argumentsFor"] }) {
  return (
    <ReportBlock title={title}>
      <div className="space-y-4">
        {items.map((item) => (
          <article key={item.title} className={`border-l-2 pl-4 ${tone === "support" ? "border-sage" : "border-coral"}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold text-ink dark:text-white">{item.title}</h3>
              <span className="text-xs font-semibold text-graphite dark:text-white/55">Evidencia {item.evidence}</span>
            </div>
            <p className="mt-2">{item.explanation}</p>
            <div className="mt-3">
              <TweetShareButton compact text={`${item.title}. ${item.explanation}`} />
            </div>
          </article>
        ))}
      </div>
    </ReportBlock>
  );
}

function ReportBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-ink/10 bg-paper/70 p-4 text-sm leading-7 text-graphite dark:border-white/10 dark:bg-black/20 dark:text-white/70">
      <h2 className="mb-3 text-sm font-semibold uppercase text-coral dark:text-orange-200">{title}</h2>
      {children}
    </section>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <ReportBlock title={title}>
      <ul className="space-y-2">
        {items.map((item) => <li key={item} className="flex gap-2"><span className="text-cobalt">•</span><span>{item}</span></li>)}
      </ul>
    </ReportBlock>
  );
}

const copy = {
  claim: {
    title: "Investiga una idea",
    subtitle: "Escribe una afirmación. CONTRASTE analizará su forma, buscará una ficha relacionada y separará argumentos, objeciones y pruebas necesarias.",
    placeholder: "Ejemplo: ¿La terapia se ha convertido en una forma de evitar responsabilidades?",
    button: "Investigar y contrastar",
    reportTitle: "Informe de contraste"
  },
  devil: {
    title: "Otro punto de vista",
    subtitle: "Escribe tu postura. La herramienta buscará excepciones, costes ocultos y la explicación rival más fuerte sin caricaturizarte.",
    placeholder: "Ejemplo: La universidad ya no sirve para encontrar trabajo.",
    button: "Construir el contraargumento",
    reportTitle: "Otro punto de vista"
  },
  tiktok: {
    title: "Analiza este contenido",
    subtitle: "Pega o resume el mensaje. CONTRASTE distinguirá afirmación, encuadre persuasivo, omisiones y evidencia necesaria.",
    placeholder: "Pega el texto, titular o afirmación principal del vídeo...",
    button: "Examinar el contenido",
    reportTitle: "Lectura crítica"
  }
} satisfies Record<AnalysisMode, { title: string; subtitle: string; placeholder: string; button: string; reportTitle: string }>;
