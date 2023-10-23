import { IHouse } from '@models/house.model';
import { GeneralResponse } from './general';

export type GetHouseResponse = GeneralResponse<IHouse>;
export type UpdateHouseResponse = GetHouseResponse;
export type GetHousesResponse = GeneralResponse<IHouse[]>;
