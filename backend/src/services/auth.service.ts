import ApiError from "../utils/apiError";
import { userService } from "./user.service";
import httpStatus from "http-status";

export const loginUserWithUsernameAndPassword = async (
  username: string,
  password: string,
) => {
  const user = await userService.findUserByUsername(username);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, `No user with name: ${username}`);
  }

  const isPasswordValid = await userService.comparePasswords(
    password,
    user.password,
  );

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid password");
  }

  return user;
};

export const authService = {
  loginUserWithUsernameAndPassword,
};
