import { taskService } from "../services/task.service";
import catchAsync from "../utils/catchAsync";

interface CustomUser {
  id: string | undefined;
  role: string | undefined;
}

declare global {
  namespace Express {
    interface User extends CustomUser {}
  }
}

const getAllTasks = catchAsync(async (req, res) => {
  const allTasks = await taskService.getAllTasks();
  res.send(allTasks);
});

const getCurrentUserTasks = catchAsync(async (req, res) => {
  if (req.user && req.user.id && req.user.role) {
    const dueDate = req.query.dueDate as string;
    console.log(dueDate);

    const tasks = await taskService.getTasksByUserAndDate(req.user.id, dueDate);
    res.send(tasks);
  } else {
    res.status(401).send("Unauthorized");
  }
});

const createTask = catchAsync(async (req, res) => {
  if (req.user && req.user.id && req.user.role) {
    const taskData = {
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      status: req.body.status,
      responsibleId: req.body.responsibleId,
      creatorId: req.user.id,
    };

    const result = await taskService.createTask(taskData);
    res.send(result);
  } else {
    res.status(401).send("Unauthorized");
  }
});

const changeTask = catchAsync(async (req, res) => {
  if (req.user && req.user.id && req.user.role) {
    const taskId = req.params.taskId;
    const { title, dueDate, responsibleId, description, status, priority } =
      req.body;

    const task = await taskService.getTaskById(taskId);

    if (req.user.role === "ADMIN") {
      // Admin can update all fields
      task.title = title || task.title;
      task.description = description || task.description;
      task.dueDate = dueDate || task.dueDate;
      task.priority = priority || task.priority;
      task.status = status || task.status;
      task.responsibleId = responsibleId || task.responsibleId;
    } else {
      // User user can only update the status field
      task.status = status || task.status;
    }

    const updatedTask = await taskService.updateTask(taskId, task);
    res.json(updatedTask);
  } else {
    res.status(401).send("Unauthorized");
  }
});

export const taskController = {
  getAllTasks,
  createTask,
  getCurrentUserTasks,
  changeTask,
};
