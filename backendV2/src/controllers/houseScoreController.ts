import { Request, Response } from 'express';
import { StatusCodes } from '../constant';

export const createHouseScore = (req: Request, res: Response) => {
  try {
    const { squareFootage, maxSquareFootage, minSquareFootage } = req.body;
    const { squareFootWeight } = req.body;
    const { reqBedrooms, actualBedrooms, ensuites, powderRooms } = req.body;
    const { bedRoomWeight } = req.body;
    const { avgTravelTime, maxTravelTime } = req.body;
    const { travelWeight } = req.body;
    const { storieNumber, depth, frontage } = req.body;
    const { lotSizeWeight } = req.body;
    const { reqBathrooms, actualBathrooms } = req.body;
    const { bathroomWeight } = req.body;

    const squareFootScore =
      2 * (squareFootage - minSquareFootage) -
      (1 / (maxSquareFootage - minSquareFootage)) *
        (squareFootage - minSquareFootage) ** 2;

    const bedRoomScore =
      (Math.atan((reqBedrooms + 1) * actualBedrooms) * 100) / (reqBedrooms + 1);

    const bathroomBonus = ensuites + powderRooms / 2;
    const bathroomScore =
      (Math.atan((reqBathrooms + 1) * (actualBathrooms + bathroomBonus)) *
        100) /
      (reqBathrooms + 1);

    const travelScore = Math.max((50 / avgTravelTime) * maxTravelTime + 100, 0);

    const houseFootprint = squareFootage / storieNumber;
    const landFootprint = depth * frontage * 3.28084;
    const lotSizeScore = (1 - houseFootprint / landFootprint) * 100;

    const score = Number(
      (
        squareFootScore * squareFootWeight +
        bedRoomScore * bedRoomWeight +
        travelScore * travelWeight +
        lotSizeScore * lotSizeWeight +
        bathroomScore * bathroomWeight
      ).toFixed(2)
    );

    res.status(StatusCodes.OK).json({ score });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};
