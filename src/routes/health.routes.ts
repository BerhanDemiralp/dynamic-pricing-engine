import { Router } from "express";
import mongoose from "mongoose";

import { redisClient } from "../config/redis.js";

const healthRouter = Router();

healthRouter.get("/", async (_request, response) => {
  const mongodbStatus = mongoose.connection.readyState === 1 ? "UP" : "DOWN";

  let redisStatus = "DOWN";

  try {
    const redisResponse = await redisClient.ping();

    if (redisResponse === "PONG") {
      redisStatus = "UP";
    }
  } catch {
    redisStatus = "DOWN";
  }

  const isHealthy = mongodbStatus === "UP" && redisStatus === "UP";

  response.status(isHealthy ? 200 : 503).json({
    success: isHealthy,
    message: isHealthy
      ? "All services are operational."
      : "One or more services are unavailable.",
    services: {
      api: "UP",
      mongodb: mongodbStatus,
      redis: redisStatus,
    },
    timestamp: new Date().toISOString(),
  });
});

export default healthRouter;
