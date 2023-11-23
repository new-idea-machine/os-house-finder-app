import { IPreference } from '@models/preferenceModel';
import { GeneralResponse } from './general';

export type GetPreferencesResponse = GeneralResponse<IPreference[]>;
export type GetAPreferenceResponse = GeneralResponse<IPreference>;
export type CreatePreferenceResponse = GeneralResponse<IPreference>;
export type UpdatePreferenceResponse = GeneralResponse<IPreference>;

// export type GetPreferencesResponse = GeneralResponse<ReqbodyPreference[]>;
// export type GetAPreferenceResponse = GeneralResponse<ReqbodyPreference>;
// export type CreatePreferenceResponse = GeneralResponse<ReqbodyPreference>;
// export type UpdatePreferenceResponse = GeneralResponse<ReqbodyPreference>;
