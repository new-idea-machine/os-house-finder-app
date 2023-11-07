import { GeneralResponse } from '@interfaces/responses/general';

export interface GoogleLogin {
  url: string;
}

export type GoogleLoginResponse = GeneralResponse<GoogleLogin>;
