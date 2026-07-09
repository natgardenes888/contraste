import Link from "next/link";
import type { Route } from "next";
import { ArrowLeft } from "lucide-react";

export function BackLink({ href = "/", label = "Volver al inicio" }: { href?: Route; label?: string }) {
  return (
    <Link href={href} className="mb-8 inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm font-semibold text-cobalt transition hover:bg-cobalt/5 dark:text-blue-300">
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      {label}
    </Link>
  );
}
