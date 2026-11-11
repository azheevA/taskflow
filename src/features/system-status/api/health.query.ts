import { queryOptions } from "@tanstack/react-query";

export type HealthResponse = {
  status: "ok" | "degraded";
  services: {
    database: "ok" | "error";
    redis: "ok" | "error";
  };
  timestamp: string;
};

export const healthQueryOptions = queryOptions({
  queryKey: ["system", "health"],
  queryFn: async (): Promise<HealthResponse> => {
    const response = await fetch("/api/health", {
      cache: "no-store"
    });

    if (!response.ok && response.status !== 503) {
      throw new Error("Не удалось проверить состояние сервисов");
    }

    return (await response.json()) as HealthResponse;
  },
  refetchInterval: 30_000
});
