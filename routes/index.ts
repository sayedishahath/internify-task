import { Router } from "express";
import taskRouter from "./task.routes";
import userRouter from "./user.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/tasks", taskRouter);

export default router;
