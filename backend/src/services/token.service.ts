import { User } from "@prisma/client";
import { config } from "../config";
import jwt from "jsonwebtoken";

const generateAuthToken = async (
  user: User,
  expiresIn = "1h",
  secret = config.jwt.secret,
) => {
  const token = jwt.sign({ id: user.id, role: user.role }, secret, {
    expiresIn: expiresIn,
  });
  return token;
};

export const tokenService = {
  generateAuthToken,
};
