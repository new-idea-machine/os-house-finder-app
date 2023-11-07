import { IUser } from '@models/userModel';
import { GeneralResponse } from './general';

export interface LoginUserData {
  _id: string;
  email: string;
  role: string;
}

export interface RegisterUserData extends LoginUserData {}

export type RegisterUserResponse = GeneralResponse<RegisterUserData>;
export type LoginUserResponse = GeneralResponse<LoginUserData>;
export type GetUserResponse = GeneralResponse<IUser>;
export type GetUsersResponse = GeneralResponse<IUser[]>;
