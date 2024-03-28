import { router } from "../../app";
import { authController } from "../../controllers/auth.controller";

router.post('/login', authController.login);
