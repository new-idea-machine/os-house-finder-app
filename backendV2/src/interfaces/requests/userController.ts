import { Request } from 'express';

export interface UserRegisterRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}
