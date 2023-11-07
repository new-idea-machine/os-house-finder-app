import { NextFunction, Request, Response } from 'express';
import { GoogleLoginResponse } from '@interfaces/responses/oauth';
import { OAuth2Client } from 'google-auth-library';
import { StatusCodes } from '../constant';

const getUserDataFromGoogle = async (access_token: string) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`
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
    // const { tokenId } = req.body;
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
  res: Response<any>,
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
    await getUserDataFromGoogle(userData.access_token as string);
    res.redirect('http://localhost:5173');
  } catch (error) {
    next(error);
  }
};
