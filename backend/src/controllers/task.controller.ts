import { taskService } from '../services/task.service';
import catchAsync from '../utils/catchAsync';

const getAllTasks = catchAsync(async (req, res) => {
  const allTasks = await taskService.getAllTasks();
  res.send(allTasks);
});


export const taskController = {
  getAllTasks,
};

