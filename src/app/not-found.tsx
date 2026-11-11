import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm font-medium tracking-[0.3em] text-cyan-300">404</p>
      <h1 className="text-3xl font-semibold">Страница не найдена</h1>
      <p className="text-muted-foreground">Похоже, такой страницы пока нет.</p>
      <Link className="rounded-lg border px-4 py-2 text-sm transition hover:bg-white/5" href="/">
        Вернуться на главную
      </Link>
    </main>
  );
}
