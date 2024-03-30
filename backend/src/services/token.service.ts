import { User } from "@prisma/client";
import { config } from "../config";
import jwt from 'jsonwebtoken';

const generateAuthToken = async (user: User, expiresIn = '1h', secret = config.jwt.secret) => {
  const { id, role } = user;
  const token = jwt.sign({ id: 'walk', role: 'ADMIN' }, secret, { expiresIn: expiresIn });
  return token
};

export const tokenService = {
  generateAuthToken
};
