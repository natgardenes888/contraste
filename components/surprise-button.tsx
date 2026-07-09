"use client";

import { Dice5 } from "lucide-react";
import { useRouter } from "next/navigation";

export function SurpriseButton({ slugs }: { slugs: string[] }) {
  const router = useRouter();

  function surprise() {
    const slug = slugs[Math.floor(Math.random() * slugs.length)];
    if (slug) router.push(`/temas/${slug}`);
  }

  return (
    <button type="button" onClick={surprise} className="inline-flex h-16 items-center justify-center gap-2 rounded-lg border border-ink/10 bg-white/80 px-5 text-sm font-semibold text-ink shadow-soft transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/[0.06] dark:text-white">
      <Dice5 className="h-4 w-4" />
      Sorpréndeme
    </button>
  );
}
