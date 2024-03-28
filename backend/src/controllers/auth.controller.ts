import catchAsync from '../utils/catchAsync';
import { authService } from '../services/auth.service';

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.loginUserWithUsernameAndPassword(username, password);

  res.send({ user });
});


export const authController = {
  login,
};

