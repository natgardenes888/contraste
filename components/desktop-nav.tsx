"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/lib/navigation";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegación principal" className="hidden items-center gap-4 text-sm text-graphite dark:text-white/70 xl:flex">
      {navigationItems.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`border-b-2 py-5 transition ${
              active
                ? "border-cobalt font-semibold text-ink dark:text-white"
                : `border-transparent hover:text-ink dark:hover:text-white ${item.accent ? "font-semibold text-coral" : ""}`
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
