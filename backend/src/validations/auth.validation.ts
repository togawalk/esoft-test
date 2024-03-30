import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const login = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = login.body.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error: error.details.map(err => err.message) });
  }
  next();
};

export const authValidation = {
  validateLogin,
};
