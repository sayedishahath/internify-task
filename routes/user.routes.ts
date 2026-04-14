import express from "express";
import { controller } from "../controllers/common.controller";
import { getUsers, loginUser, registerUser } from "../controllers/user.controller";
import { authenticateUser } from "../middlewares/auth";
import { setupRoutes } from "./route.util";

const router = express.Router();

const routes = [
  { method: "post" as const, path: "/register", middlewares: [], handler: controller(registerUser) },
  { method: "post" as const, path: "/login", middlewares: [], handler: controller(loginUser) },
  { method: "get" as const, path: "/", middlewares: [authenticateUser], handler: controller(getUsers) }
];

setupRoutes(router, routes);

export default router;
