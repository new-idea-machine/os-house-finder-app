import { UserAuthInfoRequest } from '@middleware/userAuth';
import { UpdateUser, UserRegister } from '@validator/userValidator';
import { Request } from 'express';
import { z } from 'zod';

type UserRegisterInferType = z.infer<typeof UserRegister>;

type UpdateUserInferType = z.infer<typeof UpdateUser>;

export interface UserRegisterRequest extends Request {
  body: UserRegisterInferType;
}

export interface UserLoginRequest extends UserRegisterRequest {}

export interface UserAuthInfoParamIdRequest extends UserAuthInfoRequest {
  params: {
    id?: string;
  };
}

export interface UpdateUserRequest extends UserAuthInfoParamIdRequest {
  body: UpdateUserInferType;
}
