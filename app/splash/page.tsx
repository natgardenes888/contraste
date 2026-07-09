import Link from "next/link";

export default function SplashPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="float-in text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cobalt via-coral to-gold text-5xl text-white shadow-soft">
          ●
        </div>
        <p className="mt-8 text-sm font-black tracking-[0.34em] text-ink dark:text-white">CONTRASTE</p>
        <h1 className="mt-8 text-5xl font-semibold tracking-tight text-ink dark:text-white sm:text-7xl">
          Lo que tu algoritmo no te enseña.
        </h1>
        <Link href="/" className="mt-10 inline-flex h-13 items-center justify-center rounded-md bg-ink px-8 py-4 text-sm font-semibold text-white transition hover:scale-105 hover:bg-cobalt dark:bg-white dark:text-ink">
          Empezar
        </Link>
      </section>
    </main>
  );
}
