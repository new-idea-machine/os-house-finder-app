import { IHouse } from '@models/house.model';
import { URLParamZodSchema } from '@validator/houseValidator';
import { Request } from 'express';
import { z } from 'zod';

type URLParamInferType = z.infer<typeof URLParamZodSchema>;

export interface GetAHouseRequest extends Request {
  params: {
    id: string;
  };
}

export interface DeleteHouseRequest extends GetAHouseRequest {}

export interface GetScrapedRequest extends Request {
  body: URLParamInferType;
}

export interface CreateHouseRequest extends Request {
  body: IHouse;
}

export interface UpdateHouseRequest extends CreateHouseRequest {
  params: {
    id: string;
  };
}
