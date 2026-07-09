"use client";

import Link from "next/link";
import { BookOpen, Compass, GitCompareArrows, Menu, Scale, Search, Video, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigationItems } from "@/lib/navigation";

const icons = [Compass, Search, Scale, GitCompareArrows, Video, BookOpen];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) toggleRef.current?.focus();
      wasOpen.current = false;
      return;
    }

    wasOpen.current = true;
    const selector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    menuRef.current?.querySelector<HTMLElement>(selector)?.focus();

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;

      const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>(selector));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-graphite transition hover:bg-ink hover:text-white dark:border-white/10 dark:text-white/70"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
      {open && (
        <>
          <button type="button" aria-label="Cerrar menú" onClick={() => setOpen(false)} className="fixed inset-0 top-14 z-30 bg-ink/15 backdrop-blur-[2px] sm:top-16" />
          <div ref={menuRef} id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Menú principal" className="absolute left-0 top-14 z-40 w-full border-b border-ink/10 bg-paper px-4 py-3 shadow-soft dark:border-white/10 dark:bg-[#11110f] sm:top-16 sm:py-4">
            <nav aria-label="Navegación móvil" className="mx-auto grid max-w-7xl gap-1">
              {navigationItems.map((item, index) => {
                const Icon = icons[index];
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)} className={`flex min-h-10 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition sm:min-h-12 sm:py-3 ${active ? "bg-cobalt/10 text-cobalt dark:text-blue-200" : item.accent ? "text-coral hover:bg-coral/5" : "text-ink hover:bg-ink/5 dark:text-white dark:hover:bg-white/5"}`}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
