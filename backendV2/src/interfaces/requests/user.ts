import { UserAuthInfoRequest } from '@middleware/userAuth';
import { Request } from 'express';

export interface UserRegisterRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface UserLoginRequest extends UserRegisterRequest {}

export interface UserAuthInfoParamIdRequest extends UserAuthInfoRequest {
  params: {
    id?: string;
  };
}
