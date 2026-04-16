import cors from "cors";
import express from "express";
import { connectDB } from "./config/db";
import { env } from "./config/env";
import { errorHandler, notFoundHandler } from "./middlewares/error-handler";
import router from "./routes";
import { sendSuccess } from "./utils/api-response";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.get("/health", (_req, res) => {
  return sendSuccess(res, 200, "Task Management API running");
});
app.use(notFoundHandler);
app.use(errorHandler);

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
