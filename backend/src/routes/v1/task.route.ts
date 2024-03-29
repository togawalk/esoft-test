import { router } from "../../app";
import { taskController } from "../../controllers/task.controller";

router.get('/tasks', taskController.getAllTasks);
