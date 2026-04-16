import express from "express";
import { checkSchema } from "express-validator";
import { controller } from "../controllers/common.controller";
import { getUsers, loginUser, registerUser } from "../controllers/user.controller";
import { authenticateUser } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validate-request";
import {
  loginUserValidationSchema,
  registerUserValidationSchema,
  usersPaginationValidationSchema
} from "../validations/users.validation";
import { setupRoutes } from "./route.util";

const router = express.Router();

const routes = [
  {
    method: "post" as const,
    path: "/register",
    middlewares: [...checkSchema(registerUserValidationSchema), validateRequest],
    handler: controller(registerUser)
  },
  {
    method: "post" as const,
    path: "/login",
    middlewares: [...checkSchema(loginUserValidationSchema), validateRequest],
    handler: controller(loginUser)
  },
  {
    method: "get" as const,
    path: "/",
    middlewares: [authenticateUser, ...checkSchema(usersPaginationValidationSchema), validateRequest],
    handler: controller(getUsers)
  }
];

setupRoutes(router, routes);

export default router;
