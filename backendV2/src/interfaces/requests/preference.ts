import { IPreference } from '@models/preferenceModel';
import { IUser } from '@src/models/userModel';
import { Request } from 'express';

export interface CreatePreferenceRequest extends Request {
  user?: IUser;
  body: IPreference;
}

export interface GetAPreferenceRequest extends CreatePreferenceRequest {
  params: {
    id: string;
  };
}

export interface DeletePreferenceRequest extends GetAPreferenceRequest {}

export interface UpdatePreferenceRequest extends GetAPreferenceRequest {
  body: IPreference;
}
