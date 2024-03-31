import { router } from "../../app";
import { authController } from "../../controllers/auth.controller";
import { authValidation } from "../../validations/auth.validation";

router.post("/login", authValidation.validateLogin, authController.login);
