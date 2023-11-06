import { IPreference } from '@models/preferenceModel';
import { GeneralResponse } from './general';

export type GetPreferencesResponse = GeneralResponse<IPreference[]>;
export type GetAPreferenceResponse = GeneralResponse<IPreference>;
export type CreatePreferenceResponse = GeneralResponse<IPreference>;
export type UpdatePreferenceResponse = GeneralResponse<IPreference>;
