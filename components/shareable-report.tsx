"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Download, Share2 } from "lucide-react";
import { TweetShareButton } from "@/components/tweet-share-button";

export function ShareableReport({
  title,
  summary,
  confidence,
  signals
}: {
  title: string;
  summary: string;
  confidence: number;
  signals: string[];
}) {
  const [copied, setCopied] = useState(false);

  const text = useMemo(
    () => `CONTRASTE\n${title}\n\n${summary}\n\nConfianza: ${confidence}%\nSenales: ${signals.join(", ")}`,
    [confidence, signals, summary, title]
  );

  async function copyReport() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function downloadReport() {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "contraste-informe.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <aside className="rounded-lg border border-ink/10 bg-gradient-to-br from-cobalt/10 via-white/80 to-coral/10 p-3 shadow-soft dark:border-white/10 dark:from-cobalt/20 dark:via-white/[0.05] dark:to-coral/15 sm:p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral dark:text-orange-200">Informe compartible</p>
          <h3 className="mt-1 text-base font-semibold text-ink dark:text-white sm:mt-2 sm:text-lg">{title}</h3>
        </div>
        <Share2 className="h-4 w-4 text-cobalt dark:text-blue-200 sm:h-5 sm:w-5" />
      </div>
      <p className="mt-2 text-sm leading-6 text-graphite dark:text-white/70 sm:mt-3">{summary}</p>
      <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
        {signals.map((signal) => (
          <span key={signal} className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-graphite dark:bg-black/20 dark:text-white/70">
            {signal}
          </span>
        ))}
      </div>
      <div className="mt-3 grid gap-2 sm:mt-4 sm:grid-cols-2">
        <button
          onClick={copyReport}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-ink px-3 text-sm font-semibold text-white transition hover:bg-cobalt dark:bg-white dark:text-ink sm:h-10 sm:px-4"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copiado" : "Copiar"}
        </button>
        <button
          onClick={downloadReport}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-ink/10 bg-white/70 px-3 text-sm font-semibold text-ink transition hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:text-white sm:h-10 sm:px-4"
        >
          <Download className="h-4 w-4" />
          Descargar
        </button>
        <div className="sm:col-span-2">
          <TweetShareButton text={`${title}. ${summary}`} />
        </div>
      </div>
    </aside>
  );
}
