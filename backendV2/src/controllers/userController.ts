import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '@models/userModel';
import { UserAuthInfoRequest } from '@middleware/userAuth';
import {
  UpdateUserRequest,
  UserAuthInfoParamIdRequest,
  UserLoginRequest,
  UserRegisterRequest,
} from '@interfaces/requests/user';
import {
  GetUserResponse,
  GetUsersResponse,
  LoginUserResponse,
  RegisterUserResponse,
  GoogleLoginResponse,
} from '@interfaces/responses/user';
import { GeneralResponse } from '@interfaces/responses/general';
import { OAuth2Client } from 'google-auth-library';
import { StatusCodes } from '../constant';

export const registerUser = async (
  req: UserRegisterRequest,
  res: Response<RegisterUserResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const existingUser: IUser | null = await User.findOne({ email });

    if (existingUser) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error('Email already in use');
    }

    const newUser: IUser = new User({ email, password });
    await newUser.save();

    const token: string = newUser.generateToken();
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });

    res.status(StatusCodes.CREATED).json({
      message: 'success',
      status: StatusCodes.CREATED,
      data: {
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (
  _: Request,
  res: Response<GeneralResponse<null>>,
  next: NextFunction
): Promise<void> => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    res
      .status(StatusCodes.OK)
      .json({ message: 'Successfully logged out', status: StatusCodes.OK });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    next(error);
  }
};

export const loginUser = async (
  req: UserLoginRequest,
  res: Response<LoginUserResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED);
      throw new Error('Invalid credentials');
    }

    const isMatch: boolean = await user.comparePassword(password);

    if (!isMatch) {
      res.status(StatusCodes.UNAUTHORIZED);
      throw new Error('Invalid credentials');
    }

    const token: string = user.generateToken();

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });
    res.status(StatusCodes.OK).json({
      message: 'success',
      status: StatusCodes.OK,
      data: { _id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (
  req: Request,
  res: Response<GoogleLoginResponse>,
  next: NextFunction
): Promise<void> => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Referrer-Policy', 'no-referrer-when-downgrade');

  const redirectUrl = 'http://127.0.0.1:3000/oauth';
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

export const updateUser = async (
  req: UpdateUserRequest,
  res: Response<GeneralResponse<null>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.id as string;
    const { email, password } = req.body;
    const user: IUser | null = await User.findById(userId);

    if (!user) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('User not found');
    }

    if (!(user.email === req.user?.email || req.user?.role === 'admin')) {
      res.status(StatusCodes.FORBIDDEN);
      throw new Error('You are not authorized to perform this action');
    }

    const temp: IUser | null = await User.findOne({ email });

    if (email && email !== user.email && temp) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error('Email already in use');
    }

    user.email = email || user.email;
    user.password = password || user.password;
    await user.save();

    res
      .status(StatusCodes.OK)
      .json({ message: 'User updated successfully', status: StatusCodes.OK });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: UserAuthInfoParamIdRequest,
  res: Response<GeneralResponse<null>>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.id as string;

    const user: IUser | null = await User.findByIdAndDelete(userId);

    if (!user) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('User not found');
    }

    if (!(user.email === req.user?.email || req.user?.role === 'admin')) {
      res.status(StatusCodes.FORBIDDEN);
      throw new Error('You are not authorized to perform this action');
    }

    res
      .status(StatusCodes.OK)
      .json({ message: 'User deleted successfully', status: StatusCodes.OK });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: UserAuthInfoParamIdRequest,
  res: Response<GetUserResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const userId: string = req.params.id as string;
    const user: IUser | null = await User.findById(userId);

    if (!user) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('User not found');
    }

    if (!(user.email === req.user?.email || req.user?.role === 'admin')) {
      res.status(StatusCodes.FORBIDDEN);
      throw new Error('You are not authorized to perform this action');
    }

    res
      .status(StatusCodes.OK)
      .json({ message: 'success', status: StatusCodes.OK, data: user });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: UserAuthInfoRequest,
  res: Response<GetUsersResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.user?.role !== 'admin') {
      res.status(StatusCodes.FORBIDDEN);
      throw new Error('You are not authorized to perform this action');
    }

    const users: IUser[] = await User.find();

    res
      .status(StatusCodes.OK)
      .json({ message: 'success', status: StatusCodes.OK, data: users });
  } catch (error) {
    next(error);
  }
};
