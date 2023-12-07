import { Request, Response } from 'express';
import { StatusCodes } from '../constant';

export const createHouseScore = (req: Request, res: Response) => {
  try {
    const { squareFootScore } = req.body;
    const { squareFootWeight } = req.body;
    const { bedRoomScore } = req.body;
    const { bedRoomWeight } = req.body;
    const { travelScore } = req.body;
    const { travelWeight } = req.body;
    const { lotSizeScore } = req.body;
    const { lotSizeWeight } = req.body;
    const { bathroomScore } = req.body;
    const { bathroomWeight } = req.body;

    const score =
      squareFootScore * squareFootWeight +
      bedRoomScore * bedRoomWeight +
      travelScore * travelWeight +
      lotSizeScore * lotSizeWeight +
      bathroomScore * bathroomWeight;

    res.status(StatusCodes.OK).json({ score });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};
