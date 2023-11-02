import { IPreference } from '@models/preferenceModel';
import { Request } from 'express';

export interface GetAPreferenceRequest extends Request {
  params: {
    id: string;
  };
}

export interface DeletePreferenceRequest extends GetAPreferenceRequest {}

export interface CreatePreferenceRequest extends Request {
  body: IPreference;
}

export interface UpdatePreferenceRequest extends CreatePreferenceRequest {
  params: {
    id: string;
  };
  body: IPreference;
}
