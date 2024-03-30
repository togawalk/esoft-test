import { Request, Response, NextFunction } from 'express';

interface User {
  role: string;
}

export const checkUserRole = (requiredRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User;
  console.log(user)

  if (user && requiredRoles.includes(user.role)) {
    return next();
  } else {
    return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
  }
};
