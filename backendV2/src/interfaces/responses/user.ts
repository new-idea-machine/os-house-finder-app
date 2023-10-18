import { IUser } from '@models/userModel';
import { GeneralResponse } from './general';

export interface TokenType {
  token?: string;
}

export interface LoginUserData {
  _id: string;
  email: string;
  role: string;
}

export type RegisterUserResponse = GeneralResponse<TokenType>;
export type LoginUserResponse = GeneralResponse<LoginUserData>;
export type GetUserResponse = GeneralResponse<IUser>;
export type GetUsersResponse = GeneralResponse<IUser[]>;
