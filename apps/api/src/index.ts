import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { prisma } from "@repo/db";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "ok", message: "Database connected" });
  } catch (error) {
    console.error("Database connection failed", error);
    res
      .status(500)
      .json({ status: "error", message: "Database connection failed" });
  }
});

async function startServer() {
  try {
    console.log("Connecting to the database...");
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connection successful.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
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
