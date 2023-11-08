import { GeneralResponse } from '@interfaces/responses/general';

export interface GoogleLogin {
  url: string;
}

export interface GoogleUserData {
  _id: string;
  email: string;
  role: string;
}

export type GoogleLoginResponse = GeneralResponse<GoogleLogin>;
export type GoogleUserDataResponse = GeneralResponse<GoogleUserData>;
