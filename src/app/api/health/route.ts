import { NextResponse } from "next/server";
import { getRedis } from "@/shared/lib/server/redis";
import { prisma } from "@/shared/lib/server/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const [databaseResult, redisResult] = await Promise.allSettled([
    prisma.$queryRaw`SELECT 1`,
    getRedis().ping()
  ]);

  const services = {
    database: databaseResult.status === "fulfilled" ? "ok" : "error",
    redis: redisResult.status === "fulfilled" && redisResult.value === "PONG" ? "ok" : "error"
  } as const;

  const healthy = Object.values(services).every((status) => status === "ok");

  return NextResponse.json(
    {
      status: healthy ? "ok" : "degraded",
      services,
      timestamp: new Date().toISOString()
    },
    {
      status: healthy ? 200 : 503,
      headers: { "Cache-Control": "no-store" }
    }
  );
}
