import { router } from "../../app";
import { taskController } from "../../controllers/task.controller";
import { tasksValidation } from "../../validations/tasks.validation";

router.get('/tasks', tasksValidation.validateTasks, taskController.getAllTasks);
