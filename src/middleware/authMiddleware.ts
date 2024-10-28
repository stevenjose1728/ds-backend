import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload & { id: string; role: string };
}

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    req.user = user as JwtPayload & { id: string; role: string };
    next();
  });
};

export const checkPermissions = (requiredRole: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role;

    if (!userRole) {
      res.status(403).json({ error: 'Permiso denegado' });
      return;
    }

    const roleHierarchy: Record<string, number> = {
      'reader': 1,
      'creator': 2,
      'admin': 3,
    };

    if (roleHierarchy[userRole] >= roleHierarchy[requiredRole]) {
      next();
    } else {
      res.status(403).json({ error: 'Permiso denegado' });
    }
  };
};
