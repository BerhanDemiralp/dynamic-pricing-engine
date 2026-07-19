import { Redis } from "ioredis";

import { env } from "./env.js";

export const redisClient = new Redis({
  host: env.redis.host,
  port: env.redis.port,
  lazyConnect: true,
  maxRetriesPerRequest: 3,
});

redisClient.on("connect", () => {
  console.log("Redis connection started.");
});

redisClient.on("ready", () => {
  console.log("Redis connected successfully.");
});

redisClient.on("error", (error) => {
  console.error("Redis connection error.", error);
});

export async function connectRedis(): Promise<void> {
  await redisClient.connect();
}

export async function disconnectRedis(): Promise<void> {
  await redisClient.quit();

  console.log("Redis disconnected.");
}
