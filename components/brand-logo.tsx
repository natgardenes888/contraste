import Link from "next/link";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 64"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="3" y="4" width="90" height="56" rx="10" fill="#fff" />
      <path
        d="M7 14h82c-.8 3.1-3.9 5-9.1 5H63.8c-5.4 0-8.2 2.2-8.2 6.1 0 2.4 1.7 4 4 5.3 2.9 1.7 3.8 4.7 1.5 6.6-1.1.9-2.8 1.5-5 1.8-2.4.4-3.2 2.3-1.2 3.6 1.8 1.2 2.5 3.1 1.5 4.9-.6 1.1-2 2-4 2.8-2.5.9-3.8 2.5-3.8 4.8v2.7H77c3.6 0 6.4 1.5 8.3 4.4H10.7c1.9-2.9 4.7-4.4 8.3-4.4h28.4v-2.7c0-2.3-1.3-3.9-3.8-4.8-2-.8-3.4-1.7-4-2.8-1-1.8-.3-3.7 1.5-4.9 2-1.3 1.2-3.2-1.2-3.6-2.2-.3-3.9-.9-5-1.8-2.3-1.9-1.4-4.9 1.5-6.6 2.3-1.3 4-2.9 4-5.3 0-3.9-2.8-6.1-8.2-6.1H16.1C10.9 19 7.8 17.1 7 14Z"
        fill="#050505"
      />
    </svg>
  );
}

export function BrandLogo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="CONTRASTE, inicio">
      <LogoMark className="h-8 w-12 shrink-0 transition group-hover:scale-105 sm:h-9 sm:w-14" />
      <span className="text-sm font-black tracking-[0.18em] text-ink dark:text-white sm:tracking-[0.22em]">
        CONTRASTE
      </span>
    </Link>
  );
}
