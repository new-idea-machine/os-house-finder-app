import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import User, { IUser } from '@models/userModel';

export interface UserAuthInfoRequest extends Request {
  user?: DecodedToken;
}

interface DecodedToken {
  _id?: string;
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
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    // Verify the token and extract the payload
    const decoded: DecodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || 'Bearer'
    ) as DecodedToken;

    // Attach the user's ID and email to the request object
    // req.user = {
    //   id: decoded.id,
    //   email: decoded.email,
    //   role: decoded.role,
    // };

    req.user = (await User.findById(decoded._id).select('-password')) as IUser;

    return next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
