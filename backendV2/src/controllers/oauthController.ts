import { NextFunction, Request, Response } from 'express';
import { GoogleUserDataResponse } from '@interfaces/responses/oauth';
import { OAuth2Client } from 'google-auth-library';
import User, { IUser } from '@models/userModel';
import generatePassword from '@src/utils/generatePassword';
import { StatusCodes } from '../constant';

export const gsiUserCredentials = async (
  req: Request,
  res: Response<GoogleUserDataResponse>,
  next: NextFunction
) => {
  // get jwt code from frontend query
  const { code } = req.query;

  try {
    const redirectUrl = `http://localhost:${process.env.PORT}/api/oauth/gsi`;
    const client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    const ticket = await client.verifyIdToken({
      idToken: code as string,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userSub = payload?.sub;
    const userEmail = payload?.email;
    // generate random password for user
    const userPassword = generatePassword(8);
    // TODO - figure out way to get user from db by _id
    // const existingUser: IUser | null = await User.findById(userSub);
    // Because user can change Google account email, we need to check primary identifier instead
    const existingUser: IUser | null = await User.findOne({ email: userEmail });

    let token: string = '';
    // if user does not exist, create new user
    if (!existingUser) {
      const newUser: IUser = new User({
        email: userEmail,
        password: userPassword,
      });
      await newUser.save();
      token = newUser.generateToken();
    }
    token = token === '' ? (existingUser?.generateToken() as string) : token;

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
    });

    res.status(StatusCodes.OK).json({
      message: 'success',
      status: StatusCodes.OK,
      data: {
        _id: userSub as string,
        email: userEmail as string,
        role: 'user',
      },
    });
  } catch (error) {
    next(error);
  }
};
