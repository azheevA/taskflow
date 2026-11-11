import "server-only";
import Redis from "ioredis";

const globalForRedis = globalThis as unknown as {
  redis?: Redis;
};

function createRedisClient() {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error("REDIS_URL is not configured");
  }

  const client = new Redis(redisUrl, {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    retryStrategy(times) {
      return Math.min(times * 200, 2_000);
    }
  });

  client.on("error", (error: Error) => {
    if (process.env.NODE_ENV === "development") {
      console.error("Redis connection error:", error.message);
    }
  });

  return client;
}

export const getRedis = () => {
  if (!globalForRedis.redis) {
    globalForRedis.redis = createRedisClient();
  }

  return globalForRedis.redis;
};
