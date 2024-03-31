import { Router, Request, Response, NextFunction } from "express";
import { taskController } from "../controllers/task.controller";

const router = Router();

export const tasksMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { user, dueDate } = req.query;

  if (user === "current" && dueDate) {
    return taskController.getCurrentUserTasks(req, res, next);
  }

  return taskController.getAllTasks(req, res, next);
};

router.get("/tasks", tasksMiddleware);

export default router;
