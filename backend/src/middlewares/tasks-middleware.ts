import { Router, Request, Response, NextFunction} from 'express';
import { taskController } from '../controllers/task.controller';

const router = Router();

export const tasksMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { user, dueDate } = req.query;

    if (user === 'current' && dueDate === 'today') {
        return taskController.getTasksForCurrentUserToday(req, res, next);
    } else if (user === 'current' && dueDate === 'thisWeek') {
        return taskController.getTasksForCurrentUserThisWeek(req, res, next);
    } else if (user === 'current' && dueDate === 'future') {
        return taskController.getTasksForCurrentUserFuture(req, res, next);
    }

    return taskController.getAllTasks(req, res, next);
};

router.get('/tasks', tasksMiddleware);

export default router;
