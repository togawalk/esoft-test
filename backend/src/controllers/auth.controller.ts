import catchAsync from '../utils/catchAsync';
import { authService } from '../services/auth.service';
import { tokenService } from '../services/token.service';

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.loginUserWithUsernameAndPassword(username, password);
  const token = await tokenService.generateAuthToken(user);
  res.send({ token});
});


export const authController = {
  login,
};

