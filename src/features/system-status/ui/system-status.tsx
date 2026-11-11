"use client";

import { useQuery } from "@tanstack/react-query";
import { healthQueryOptions } from "@/features/system-status/api/health.query";

const labels = {
  database: "PostgreSQL",
  redis: "Redis"
} as const;

export function SystemStatus() {
  const { data, isPending, isError, refetch, isFetching } = useQuery(healthQueryOptions);

  if (isPending) {
    return <p className="text-sm text-muted-foreground">Проверяем подключения…</p>;
  }

  if (isError || !data) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-rose-300">Не удалось получить состояние сервисов.</p>
        <button className="text-xs text-cyan-200 hover:underline" onClick={() => void refetch()}>
          Повторить
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {Object.entries(data.services).map(([service, status]) => (
        <div className="flex items-center justify-between" key={service}>
          <span className="text-sm">{labels[service as keyof typeof labels]}</span>
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <span
              className={`size-2 rounded-full ${status === "ok" ? "bg-emerald-400" : "bg-rose-400"}`}
            />
            {status === "ok" ? "Подключено" : "Недоступно"}
          </span>
        </div>
      ))}
      <div className="flex items-center justify-between border-t pt-3">
        <span className="text-xs text-muted-foreground">
          {data.status === "ok" ? "Все сервисы работают" : "Есть проблемы с подключением"}
        </span>
        <button
          className="text-xs text-cyan-200 hover:underline disabled:opacity-50"
          disabled={isFetching}
          onClick={() => void refetch()}
        >
          {isFetching ? "Проверка…" : "Проверить снова"}
        </button>
      </div>
    </div>
  );
}
