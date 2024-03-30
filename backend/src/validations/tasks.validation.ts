import { Request, Response, NextFunction } from 'express';
import Joi  from 'joi';

const customValidationSchema = Joi.alternatives().try(
  Joi.object({
    user: Joi.string().required(),
    dueDate: Joi.string().valid('today', 'thisWeek', 'future').required()
  }),
  Joi.object({})
);

export const validateTasks = (req: Request, res: Response, next: NextFunction) => {
  const { error } = customValidationSchema.validate(req.query, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error: error.details.map(err => err.message) });
  }
  next();
};


export const tasksValidation = {
  validateTasks,
};
