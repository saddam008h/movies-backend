import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from './authenticatedRequest';

interface JwtPayload {
    _id: string;
    email: string;
}

const jwtSecret = process.env.JWTPRIVATEKEY;

export default function (req: AuthenticatedRequest, res: Response, next: NextFunction): Response | void {
  const token = req.cookies['token']; 
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

// Note: I encoded jwt as: { _id: user._id, email: user.email }
