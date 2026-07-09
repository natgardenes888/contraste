import Link from "next/link";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="3" y="3" width="58" height="58" rx="14" fill="#12110F" />
      <path
        d="M13.5 15.5h37c-.9 3.7-3.8 5.7-8.7 6l-6 .4c-3.3.2-5.4 1.6-6.1 4.2-.5 1.9.2 3.7 2.1 5.5 1.6 1.5 2.4 3.1 2.4 4.8 0 2.1-1.2 3.8-3.5 5-1.6.8-2.4 2-2.4 3.5v4.6h9.5c4.2 0 7.2 1.6 9 4.8H17.2c1.8-3.2 4.8-4.8 9-4.8h9.5v-4.6c0-1.5-.8-2.7-2.4-3.5-2.3-1.2-3.5-2.9-3.5-5 0-1.7.8-3.3 2.4-4.8 1.9-1.8 2.6-3.6 2.1-5.5-.7-2.6-2.8-4-6.1-4.2l-6-.4c-4.9-.3-7.8-2.3-8.7-6Z"
        fill="#F8F5EE"
      />
      <path
        d="M18.5 20.5c3.3 3.3 5.1 6.9 5.5 10.8.4 4-1 7.6-4.2 10.7M45.5 20.5c-3.3 3.3-5.1 6.9-5.5 10.8-.4 4 1 7.6 4.2 10.7"
        stroke="#F8F5EE"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BrandLogo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="CONTRASTE, inicio">
      <LogoMark className="h-9 w-9 shrink-0 transition group-hover:scale-105 sm:h-10 sm:w-10" />
      <span className="text-sm font-black tracking-[0.18em] text-ink dark:text-white sm:tracking-[0.22em]">
        CONTRASTE
      </span>
    </Link>
  );
}
