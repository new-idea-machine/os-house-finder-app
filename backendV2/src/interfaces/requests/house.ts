import { IHouse } from '@models/houseModel';
import { Request } from 'express';

export interface GetAHouseRequest extends Request {
  params: {
    id: string;
  };
}

export interface DeleteHouseRequest extends GetAHouseRequest {}

export interface GetScrapedRequest extends Request {
  params: {
    url: string;
  };
}

export interface CreateHouseRequest extends Request {
  body: IHouse;
}

export interface UpdateHouseRequest extends CreateHouseRequest {
  params: {
    id: string;
  };
}
