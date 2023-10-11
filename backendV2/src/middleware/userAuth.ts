import * as jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';
import { Request, Response, NextFunction } from 'express';

export const userAuth = async (req: Request, res: Response, next: NextFunction) => {

    let token: string;

    token = req.cookies.jwt;

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
        // Verify the token and extract the payload
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'Bearer');

        // Attach the user's ID and email to the request object
        // req.user = {
        //   id: decoded.id,
        //   email: decoded.email,
        //   role: decoded.role,
        // };

        req.user = (await User.findById(decoded.id).select('-password')) as IUser;

        next(); // Move to the next middleware or route handler
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};
