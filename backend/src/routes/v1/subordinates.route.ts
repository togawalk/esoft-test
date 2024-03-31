import passport from "passport";
import { router } from "../../app";
import { checkUserRole } from "../../middlewares/checkUserRole";
import { subordinatesController } from "../../controllers/subordinates.controller";

router.get('/subordinates/:managerId',
  passport.authenticate("jwt", { session: false }),
  subordinatesController.getSubordinatesByManagerId
);

router.get('/subordinates',
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["ADMIN"]),
  subordinatesController.getSubordinatesCurrentUser
);
