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

// interface DecodedToken {
//   [key: string]: Types.ObjectId;
// }

// interface DecodedTokenFromCookie extends DecodedToken {
//   id: string;
//   iat: number;
//   exp: number;
// }

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

    // Attach the user's ID and email to the request object
    // req.user = {
    //   id: decoded.id,
    //   email: decoded.email,
    //   role: decoded.role,
    // };

    req.user = (await User.findById(decoded.id).select(
      '-password'
    )) as DecodedToken;

    return next(); // Move to the next middleware or route handler
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED);
    return next(error);
  }
};
