import mongoose from "mongoose";

import { env } from "./env.js";

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(env.mongodb.uri);

    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed.", error);

    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();

  console.log("MongoDB disconnected.");
}
