import { subordinatesService } from "../services/subordinates.service";
import catchAsync from "../utils/catchAsync";

const getSubordinatesByManagerId = catchAsync(async (req, res) => {
  const { managerId } = req.params;
  const subordinates =
    await subordinatesService.subordinatesByManagerId(managerId);
  res.json(subordinates);
});

const getSubordinatesCurrentUser = catchAsync(async (req, res) => {
  if (req.user && req.user.id && req.user.role) {
    const subordinates = await subordinatesService.subordinatesByManagerId(
      req.user.id,
    );
    res.json(subordinates);
  } else {
    res.status(401).send("Unauthorized");
  }
});

export const subordinatesController = {
  getSubordinatesByManagerId,
  getSubordinatesCurrentUser,
};
