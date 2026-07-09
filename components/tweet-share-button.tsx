"use client";

import { useEffect, useMemo, useState } from "react";
import { Share2 } from "lucide-react";

function cleanForTweet(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function TweetShareButton({
  text,
  label = "Compartir en X",
  compact = false
}: {
  text: string;
  label?: string;
  compact?: boolean;
}) {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const href = useMemo(() => {
    const tweetText = cleanForTweet(`${text}\n\nHecho con CONTRASTE`);
    const params = new URLSearchParams({ text: tweetText });
    if (currentUrl) params.set("url", currentUrl);
    return `https://twitter.com/intent/tweet?${params.toString()}`;
  }, [currentUrl, text]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-md border border-ink/10 bg-white/80 font-semibold text-cobalt transition hover:border-cobalt/30 hover:bg-cobalt/5 dark:border-white/10 dark:bg-white/[0.05] dark:text-blue-300 ${
        compact ? "min-h-9 px-3 text-xs" : "h-10 px-4 text-sm"
      }`}
    >
      <Share2 className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      {label}
      <span className="sr-only">(abre X en una pestaña nueva)</span>
    </a>
  );
}
