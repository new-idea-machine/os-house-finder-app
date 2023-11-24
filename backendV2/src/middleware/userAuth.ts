import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '@models/userModel';
import { StatusCodes } from '@src/constant';

export interface UserAuthInfoRequest extends Request {
  user?: DecodedToken;
}

interface DecodedToken {
  id: string;
  email: string;
  role: string;
}

export const userAuth = async (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.cookies.jwt;

  // Check if the token exists
  if (!token) {
    throw new Error('Authorization token missing');
  }

  try {
    // Verify the token and extract the payload
    const decoded: DecodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || 'Bearer'
    ) as DecodedToken;

    req.user = (await User.findById(decoded.id).select(
      '-password'
    )) as DecodedToken;

    return next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED);
    return next(error);
  }
};
