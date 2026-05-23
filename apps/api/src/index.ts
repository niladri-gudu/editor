import { env } from "./config/env.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.middleware.js";

import { prisma } from "@repo/db";

import { authRoutes } from "./modules/auth/auth.routes.js";
import { boardRoutes } from "./modules/board/board.routes.js";
import { nodeRoutes } from "./modules/node/node.routes.js";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/nodes", nodeRoutes);

app.get("/health", async (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

app.use(errorMiddleware);

async function startServer() {
  try {
    console.log("Connecting to the database...");
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connection successful.");

    app.listen(env.PORT, () => {
      console.log(
        `🚀 API Server humming cleanly in ${env.NODE_ENV} mode on port ${env.PORT}`,
      );
    });
  } catch (error) {
    console.error(
      "Fatal: Database connection failed. Server will not start.",
      error,
    );
    process.exit(1);
  }
}

startServer();
