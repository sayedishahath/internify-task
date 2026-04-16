import { RequestHandler, Router } from "express";

type RouteConfig = {
  method: "get" | "post" | "put" | "delete" | "patch";
  path: string;
  middlewares: Array<RequestHandler | RequestHandler[]>;
  handler: RequestHandler;
};

export const setupRoutes = (router: Router, routes: RouteConfig[]): void => {
  routes.forEach((route) => {
    router[route.method](route.path, ...(route.middlewares as RequestHandler[]), route.handler);
  });
};
