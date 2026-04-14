import express from "express";
import { controller } from "../controllers/common.controller";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask
} from "../controllers/task.controller";
import { authenticateUser } from "../middlewares/auth";
import { setupRoutes } from "./route.util";

const router = express.Router();

const routes = [
  { method: "post" as const, path: "/", middlewares: [authenticateUser], handler: controller(createTask) },
  { method: "get" as const, path: "/", middlewares: [authenticateUser], handler: controller(getTasks) },
  { method: "get" as const, path: "/:id", middlewares: [authenticateUser], handler: controller(getTaskById) },
  { method: "put" as const, path: "/:id", middlewares: [authenticateUser], handler: controller(updateTask) },
  { method: "delete" as const, path: "/:id", middlewares: [authenticateUser], handler: controller(deleteTask) }
];

setupRoutes(router, routes);

export default router;
