import passport from "passport";
import { router } from "../../app";
import { taskController } from "../../controllers/task.controller";
import { tasksValidation } from "../../validations/tasks.validation";

router.get('/tasks', passport.authenticate('jwt', { session: false }), tasksValidation.validateTasks, taskController.getAllTasks);
router.post('/tasks', passport.authenticate('jwt', { session: false }), taskController.createTask);
