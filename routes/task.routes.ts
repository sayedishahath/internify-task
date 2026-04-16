import express from "express";
import { checkSchema } from "express-validator";
import { controller } from "../controllers/common.controller";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask
} from "../controllers/task.controller";
import { authenticateUser } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validate-request";
import {
  createTaskValidationSchema,
  taskIdParamValidationSchema,
  tasksPaginationValidationSchema,
  updateTaskValidationSchema
} from "../validations/tasks.validation";
import { setupRoutes } from "./route.util";

const router = express.Router();

const routes = [
  {
    method: "post" as const,
    path: "/",
    middlewares: [authenticateUser, ...checkSchema(createTaskValidationSchema), validateRequest],
    handler: controller(createTask)
  },
  {
    method: "get" as const,
    path: "/",
    middlewares: [authenticateUser, ...checkSchema(tasksPaginationValidationSchema), validateRequest],
    handler: controller(getTasks)
  },
  {
    method: "get" as const,
    path: "/:id",
    middlewares: [authenticateUser, ...checkSchema(taskIdParamValidationSchema), validateRequest],
    handler: controller(getTaskById)
  },
  {
    method: "put" as const,
    path: "/:id",
    middlewares: [
      authenticateUser,
      ...checkSchema(taskIdParamValidationSchema),
      ...checkSchema(updateTaskValidationSchema),
      validateRequest
    ],
    handler: controller(updateTask)
  },
  {
    method: "delete" as const,
    path: "/:id",
    middlewares: [authenticateUser, ...checkSchema(taskIdParamValidationSchema), validateRequest],
    handler: controller(deleteTask)
  }
];

setupRoutes(router, routes);

export default router;
