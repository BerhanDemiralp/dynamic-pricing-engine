import app from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { connectRedis, disconnectRedis } from "./config/redis.js";

async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    await connectRedis();

    const server = app.listen(env.port, () => {
      console.log(`Server is running on http://localhost:${env.port}`);
    });

    async function shutdown(signal: string): Promise<void> {
      console.log(`${signal} received. Shutting down gracefully.`);

      server.close(async () => {
        try {
          await disconnectDatabase();
          await disconnectRedis();

          console.log("Application shutdown completed.");
          process.exit(0);
        } catch (error) {
          console.error("Application shutdown failed.", error);
          process.exit(1);
        }
      });
    }

    process.on("SIGINT", () => {
      void shutdown("SIGINT");
    });

    process.on("SIGTERM", () => {
      void shutdown("SIGTERM");
    });
  } catch (error) {
    console.error("Application startup failed.", error);
    process.exit(1);
  }
}

void startServer();
