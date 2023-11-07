import {ICTStation} from '@models/ctStationModel'
import { GeneralResponse } from './general';

export type GetCTStationsResponse = GeneralResponse<ICTStation[]>;
export type GetACTStationResponse = GeneralResponse<ICTStation>;