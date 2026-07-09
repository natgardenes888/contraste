import Link from "next/link";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="3" width="42" height="42" rx="10" fill="#fff" />
      <path
        d="M7.8 10.5c.5 1.8 1.9 3 4.1 3.2l8.3.4c2.3.2 3.9 1.2 4.6 3.1.4 1.1.3 2.3-.3 3.4-.6 1-1.5 1.8-2.7 2.2-1.3.5-2 1.4-2 2.6 0 1.1.5 1.9 1.5 2.5.9.5 1.4 1.2 1.4 2 0 .9-.5 1.6-1.6 2.1-.8.4-1.2 1-1.2 1.7 0 .8.5 1.4 1.4 1.8 1.4.6 2.1 1.6 2.1 3v1.1h-12c-2.5 0-4.2 1.2-5.2 3.9h35.6c-1-2.7-2.7-3.9-5.2-3.9h-12v-1.1c0-1.4.7-2.4 2.1-3 .9-.4 1.4-1 1.4-1.8 0-.7-.4-1.3-1.2-1.7-1.1-.5-1.6-1.2-1.6-2.1 0-.8.5-1.5 1.4-2 1-.6 1.5-1.4 1.5-2.5 0-1.2-.7-2.1-2-2.6-1.2-.4-2.1-1.2-2.7-2.2-.6-1.1-.7-2.3-.3-3.4.7-1.9 2.3-2.9 4.6-3.1l8.3-.4c2.2-.2 3.6-1.4 4.1-3.2H7.8Z"
        fill="#050505"
      />
    </svg>
  );
}

export function BrandLogo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="CONTRASTE, inicio">
      <LogoMark className="h-8 w-8 shrink-0 transition group-hover:scale-105 sm:h-9 sm:w-9" />
      <span className="text-sm font-black tracking-[0.18em] text-ink dark:text-white sm:tracking-[0.22em]">
        CONTRASTE
      </span>
    </Link>
  );
}
