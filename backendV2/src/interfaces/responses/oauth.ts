import { GeneralResponse } from '@interfaces/responses/general';

export interface GoogleUserData {
  _id: string;
  email: string;
  role: string;
}

export type GoogleUserDataResponse = GeneralResponse<GoogleUserData>;
