import passport from "passport";
import { router } from "../../app";
import { taskController } from "../../controllers/task.controller";
import { tasksValidation } from "../../validations/tasks.validation";
import { checkUserRole } from "../../middlewares/checkUserRole";
import { tasksMiddleware } from "../../middlewares/tasks-middleware";

router.get(
  "/tasks",
  passport.authenticate("jwt", { session: false }),
  tasksValidation.validateTasks,
  tasksMiddleware,
);

router.post(
  "/tasks",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["ADMIN"]),
  taskController.createTask,
);

router.put(
  "/tasks/:taskId",
  passport.authenticate("jwt", { session: false }),
  taskController.changeTask,
);
