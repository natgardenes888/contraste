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
      <rect x="3" y="3" width="42" height="42" rx="14" fill="#151412" className="dark:fill-white" />
      <path
        d="M23.8 8H9v32h14.8c-4.2-3.5-6.4-7.9-6.4-13.2 0-1.2.4-2.1 1.3-2.6 1.4-.8 2-1.9 2-3.2 0-.9-.4-1.7-1.1-2.3-1-.8-1.5-1.8-1.5-3 0-3 1.9-5.6 5.7-7.7Z"
        fill="#3657d8"
      />
      <path
        d="M24.2 8H39v32H24.2c4.2-3.5 6.4-7.9 6.4-13.2 0-1.2-.4-2.1-1.3-2.6-1.4-.8-2-1.9-2-3.2 0-.9.4-1.7 1.1-2.3 1-.8 1.5-1.8 1.5-3 0-3-1.9-5.6-5.7-7.7Z"
        fill="#df755f"
      />
      <path
        d="M20 9.8h8c-.4 3.9-1.1 6.1-2.1 6.8-1.2.8-1.8 1.8-1.8 3.1 0 1.6.8 2.8 2.4 3.6 1.1.6 1.7 1.4 1.7 2.5 0 1.3-.7 2.4-2 3.1-1.2.7-1.8 2.5-1.8 5.3h4.4v4H19.2v-4h4.4c0-2.8-.6-4.6-1.8-5.3-1.3-.7-2-1.8-2-3.1 0-1.1.6-1.9 1.7-2.5 1.6-.8 2.4-2 2.4-3.6 0-1.3-.6-2.3-1.8-3.1-1-.7-1.7-2.9-2.1-6.8Z"
        fill="#fbfaf7"
      />
      <circle cx="15.4" cy="17.3" r="1.5" fill="#fbfaf7" />
      <circle cx="32.6" cy="17.3" r="1.5" fill="#fbfaf7" />
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
