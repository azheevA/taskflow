import { Activity, ArrowUpRight, Boxes, CheckCircle2, Clock3, Users } from "lucide-react";
import { SystemStatus } from "@/features/system-status/ui/system-status";
import { UiPreferencesPanel } from "@/features/ui-preferences/ui/ui-preferences-panel";

const metrics = [
  { label: "Активные задачи", value: "—", icon: CheckCircle2, hint: "Подключим на этапе CRM" },
  { label: "Проекты", value: "—", icon: Boxes, hint: "Подключим на этапе CRM" },
  { label: "Участники", value: "—", icon: Users, hint: "Подключим на этапе CRM" },
  { label: "Ближайшие дедлайны", value: "—", icon: Clock3, hint: "Подключим на этапе CRM" }
];

export function DashboardOverview() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
      <header className="flex flex-col justify-between gap-5 border-b pb-7 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
            <Activity size={22} />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight">TaskFlow CRM</p>
            <p className="text-xs text-muted-foreground">Workspace foundation</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-cyan-300" />
          Этап 1 · Инфраструктура
        </div>
      </header>

      <section className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold tracking-[0.28em] text-cyan-300">PROJECT INITIALIZED</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Рабочее пространство <span className="text-cyan-200">готово к развитию.</span>
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Базовая инфраструктура TaskFlow CRM. Подключены слои состояния, структура приложения и
          серверные адаптеры для PostgreSQL и Redis.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, icon: Icon, hint }) => (
          <article key={label} className="rounded-2xl border bg-card/70 p-5 shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-sm">{label}</span>
              <Icon size={18} />
            </div>
            <p className="mt-5 text-3xl font-semibold tracking-tight">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border bg-card/70 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold">Инфраструктура</h2>
              <p className="mt-1 text-sm text-muted-foreground">Проверка подключений приложения</p>
            </div>
            <ArrowUpRight className="text-muted-foreground" size={18} />
          </div>
          <div className="mt-5">
            <SystemStatus />
          </div>
        </div>
        <div className="rounded-2xl border bg-card/70 p-5 sm:p-6">
          <h2 className="font-semibold">Клиентское состояние</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Redux Toolkit управляет локальными настройками интерфейса.
          </p>
          <div className="mt-5">
            <UiPreferencesPanel />
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t pt-5 text-xs text-muted-foreground">
        TaskFlow CRM · Next.js App Router · FSD · PostgreSQL · Redis
      </footer>
    </main>
  );
}
