import Link from "next/link";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="3" y="3" width="114" height="74" rx="8" fill="#fff" />
      <path
        d="M12 15h96c-.8 3.8-4.8 6-12.4 6H77.8c-6 0-9.8 2.2-11.1 6.3-.8 2.4-.1 5 2 7.4 1.6 1.8 2.7 3.5 3.2 5 .7 2.4-.2 4.2-2.7 5.3-2.3 1-5.4 1.5-9.2 1.5s-6.9-.5-9.2-1.5c-2.5-1.1-3.4-2.9-2.7-5.3.5-1.5 1.6-3.2 3.2-5 2.1-2.4 2.8-5 2-7.4C52 23.2 48.2 21 42.2 21H24.4C16.8 21 12.8 18.8 12 15Z"
        fill="#050505"
      />
      <path
        d="M52.5 43.4c2.1 1 4.6 1.5 7.5 1.5s5.4-.5 7.5-1.5c-.8 3-2.2 5.7-4.2 8.1-1.5 1.8-2.3 3.8-2.3 6v4.2h24.5c5.1 0 9.1 2 12 6H22.5c2.9-4 6.9-6 12-6H59v-4.2c0-2.2-.8-4.2-2.3-6-2-2.4-3.4-5.1-4.2-8.1Z"
        fill="#050505"
      />
    </svg>
  );
}

export function BrandLogo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="CONTRASTE, inicio">
      <LogoMark className="h-9 w-[54px] shrink-0 transition group-hover:scale-105 sm:h-10 sm:w-[60px]" />
      <span className="text-sm font-black tracking-[0.18em] text-ink dark:text-white sm:tracking-[0.22em]">
        CONTRASTE
      </span>
    </Link>
  );
}
