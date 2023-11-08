import { NextFunction, Request, Response } from 'express';
import {
  GoogleLoginResponse,
  GoogleUserDataResponse,
} from '@interfaces/responses/oauth';
import { OAuth2Client } from 'google-auth-library';
import { StatusCodes } from '../constant';

const getUserDataFromGoogle = async (access_token: string) => {
  console.log('access_token: ', access_token);

  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  const data = await response.json();
  console.log('data: ', data);

  return data;
};

export const googleLogin = async (
  req: Request,
  res: Response<GoogleLoginResponse>,
  next: NextFunction
): Promise<void> => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Referrer-Policy', 'no-referrer-when-downgrade');

  const redirectUrl = 'http://localhost:5001/api/oauth/google';
  try {
    console.log(
      '👹',
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    const client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    const authorizeUrl = client.generateAuthUrl({
      access_type: 'offline',
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
      prompt: 'consent',
    });

    res.json({
      message: 'success',
      status: StatusCodes.OK,
      data: { url: authorizeUrl },
    });

    //
  } catch (error) {
    next(error);
  }
};

export const googleUserData = async (
  req: Request,
  res: Response<GoogleUserDataResponse>,
  next: NextFunction
) => {
  const { code } = req.query;
  console.log('code: ', code);

  try {
    const redirectUrl = 'http://localhost:5001/api/oauth/google';
    const client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    const response = await client.getToken(code as string);
    console.log('googleUserData response: ', response);
    await client.setCredentials(response.tokens);
    console.log('Tokens Acquired');
    const userData = client.credentials;
    console.log('user Credentials: ', userData);
    const getUserRes = await getUserDataFromGoogle(
      userData.access_token as string
    );
    console.log('getUserDataFromGoogle response', getUserRes);
    res.cookie('jwt', userData.id_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
    });

    res.json({
      message: 'success',
      status: StatusCodes.OK,
      data: { _id: getUserRes.sub, email: getUserRes.email, role: 'user' },
    });
  } catch (error) {
    next(error);
  }
};
