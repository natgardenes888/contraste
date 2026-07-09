import Link from "next/link";
import { BookOpen, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { DesktopNav } from "@/components/desktop-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#11110f]/90">
      <a href="#main-content" className="sr-only z-50 bg-ink px-4 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-2">
        Saltar al contenido
      </a>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-black tracking-[0.22em] text-ink dark:text-white">
          CONTRASTE
        </Link>
        <DesktopNav />
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link
            href="/escritos"
            title="Leer mis escritos"
            aria-label="Leer mis escritos"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-graphite transition hover:bg-coral hover:text-white dark:border-white/10 dark:text-white/70 sm:inline-flex"
          >
            <BookOpen className="h-4 w-4" />
          </Link>
          <Link href="/#buscar" className="hidden h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-graphite transition hover:bg-ink hover:text-white dark:border-white/10 dark:text-white/70 dark:hover:bg-white dark:hover:text-ink sm:inline-flex" aria-label="Buscar">
            <Search className="h-4 w-4" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto min-h-screen max-w-7xl px-4 pb-12 pt-5 outline-none sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
      {children}
    </main>
  );
}
