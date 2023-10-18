import { Request, Response } from 'express';
import User, { IUser } from '@models/userModel';
import { UserAuthInfoRequest } from '@middleware/userAuth';
import {
  UserAuthInfoParamIdRequest,
  UserLoginRequest,
  UserRegisterRequest,
} from '@interfaces/requests/user';
import {
  GetUserResponse,
  GetUsersResponse,
  LoginUserResponse,
  RegisterUserResponse,
} from '@interfaces/responses/user';
import { GeneralResponse } from '@interfaces/responses/general';
import { StatusCodes } from '@src/constant';

export const registerUser = async (
  req: UserRegisterRequest,
  res: Response<RegisterUserResponse>
) => {
  try {
    const { email, password } = req.body;

    const existingUser: IUser | null = await User.findOne({ email });

    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Email already in use',
        status: StatusCodes.BAD_REQUEST,
      });
    }

    const newUser: IUser = new User({ email, password });
    await newUser.save();

    const token: string = newUser.generateToken();

    return res.status(StatusCodes.CREATED).json({
      message: 'success',
      status: StatusCodes.CREATED,
      data: { token },
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Server error',
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

export const logoutUser = async (
  _: Request,
  res: Response<GeneralResponse<null>>
) => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    return res
      .status(StatusCodes.OK)
      .json({ message: 'Successfully logged out', status: StatusCodes.OK });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Server error',
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

export const loginUser = async (
  req: UserLoginRequest,
  res: Response<LoginUserResponse>
) => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Invalid credentials',
        status: StatusCodes.UNAUTHORIZED,
      });
    }

    const isMatch: boolean = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Invalid credentials',
        status: StatusCodes.UNAUTHORIZED,
      });
    }

    const token: string = user.generateToken();

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });
    return res.status(StatusCodes.OK).json({
      message: 'success',
      status: StatusCodes.OK,
      data: { _id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Server error',
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

export const updateUser = async (
  req: UserAuthInfoParamIdRequest,
  res: Response<GeneralResponse<null>>
) => {
  try {
    const userId = req.params.id as string;
    const { email, password } = req.body;

    const user: IUser | null = await User.findById(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found', status: StatusCodes.NOT_FOUND });
    }

    if (!(user.email === req.user?.email || req.user?.role === 'admin')) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: 'You are not authorized to perform this action',
        status: StatusCodes.FORBIDDEN,
      });
    }

    const temp: IUser | null = await User.findOne({ email });

    if (email && email !== user.email && temp) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Email already in use',
        status: StatusCodes.BAD_REQUEST,
      });
    }

    user.email = email || user.email;
    user.password = password || user.password;
    await user.save();

    return res
      .status(StatusCodes.OK)
      .json({ message: 'User updated successfully', status: StatusCodes.OK });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Server error',
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

export const deleteUser = async (
  req: UserAuthInfoParamIdRequest,
  res: Response<GeneralResponse<null>>
) => {
  try {
    const userId = req.params.id as string;

    const user: IUser | null = await User.findByIdAndDelete(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found', status: StatusCodes.NOT_FOUND });
    }

    if (!(user.email === req.user?.email || req.user?.role === 'admin')) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: 'You are not authorized to perform this action',
        status: StatusCodes.FORBIDDEN,
      });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: 'User deleted successfully', status: StatusCodes.OK });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Server error',
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

export const getUser = async (
  req: UserAuthInfoParamIdRequest,
  res: Response<GetUserResponse>
) => {
  try {
    const userId: string = req.params.id as string;

    const user: IUser | null = await User.findById(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found', status: StatusCodes.NOT_FOUND });
    }

    if (!(user.email === req.user?.email || req.user?.role === 'admin')) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: 'You are not authorized to perform this action',
        status: StatusCodes.FORBIDDEN,
      });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: 'success', status: StatusCodes.OK, data: user });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Server error',
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

export const getAllUsers = async (
  req: UserAuthInfoRequest,
  res: Response<GetUsersResponse>
) => {
  try {
    if (req.user?.role !== 'admin') {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: 'You are not authorized to perform this action',
        status: StatusCodes.FORBIDDEN,
      });
    }

    const users: IUser[] = await User.find();

    return res
      .status(StatusCodes.OK)
      .json({ message: 'success', status: StatusCodes.OK, data: users });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Server error',
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
