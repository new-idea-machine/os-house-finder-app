import { IHouse } from '@models/houseModel';
import { GeneralResponse } from './general';

export type GetHouseResponse = GeneralResponse<IHouse>;
export type UpdateHouseResponse = GetHouseResponse;
export type GetHousesResponse = GeneralResponse<IHouse[]>;
