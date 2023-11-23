import { IPreference } from '@models/preferenceModel';
import { IUser } from '@src/models/userModel';
import { Request } from 'express';

// export type ReqbodyPreference = Omit<IPreference, 'userId'> & {
//   userId: Types.ObjectId;
// };

// interface FoundUser {
//   id: Types.ObjectId;
//   email: string;
//   role: string;
// }
export interface CreatePreferenceRequest extends Request {
  user?: IUser;
  body: IPreference;
}

export interface GetAPreferenceRequest extends CreatePreferenceRequest {
  params: {
    id: string;
  };
}

export interface DeletePreferenceRequest extends GetAPreferenceRequest {
  // user: IUser;
}

export interface UpdatePreferenceRequest extends GetAPreferenceRequest {
  // params: {
  //   id: string;
  // };
  body: IPreference;
}
