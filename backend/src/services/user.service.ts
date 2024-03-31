import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

const findUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return user;
};

const comparePasswords = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 8);
  return hashedPassword;
};

export const userService = {
  findUserByUsername,
  comparePasswords,
  hashPassword,
};
