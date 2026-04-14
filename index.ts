import cors from "cors";
import express from "express";
import { connectDB } from "./config/db";
import { env } from "./config/env";
import router from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.get("/health", (_req, res) => {
  res.status(200).send("Task Management API running");
});

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(env.port, () => {
      console.log(`listening to port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

void startServer();
