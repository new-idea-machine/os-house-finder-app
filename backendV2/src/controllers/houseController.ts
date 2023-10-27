import { NextFunction, Request, Response } from 'express';
import { spawn, ChildProcess } from 'child_process';
import HouseModel, { IHouse } from '@models/house.model';
import {
  CreateHouseRequest,
  DeleteHouseRequest,
  GetAHouseRequest,
  GetScrapedRequest,
  UpdateHouseRequest,
} from '@interfaces/requests/house';
import {
  GetHouseResponse,
  GetHousesResponse,
  UpdateHouseResponse,
} from '@interfaces/responses/house';
import { GeneralResponse } from '@interfaces/responses/general';
import { StatusCodes } from '../constant';

// Get all houses
export const getHouses = async (
  _: Request,
  res: Response<GetHousesResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const houses = await HouseModel.find();

    res
      .status(StatusCodes.OK)
      .json({ message: 'Houses found', status: StatusCodes.OK, data: houses });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND);
    next(new Error('Houses not found'));
  }
};

// Get a specific house by ID
export const getHouse = async (
  req: GetAHouseRequest,
  res: Response<GetHouseResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const house = (await HouseModel.findById(req.params.id)) as IHouse;
    if (!house) {
      throw new Error('House not found');
    }
    res
      .status(StatusCodes.OK)
      .json({ message: 'House found', status: StatusCodes.OK, data: house });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND);
    next(error);
  }
};

// Get Scraped data by
export const getScraped = async (
  req: GetScrapedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const pythonProcess: ChildProcess = spawn('python', [
      '../scripts/scraper.py',
      req.body.url,
    ]) as ChildProcess;

    pythonProcess.stdout?.on('data', (data) => {
      const result: string = data.toString();
      res.send(result);
    });

    pythonProcess.on('error', (error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send('Error calling Python function');
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        // eslint-disable-next-line no-console
        console.error(`Python process exited with code ${code}`);
      }
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND);
    next(error);
  }
};

// Create a new house
export const createHouse = async (
  req: CreateHouseRequest,
  res: Response<GetHouseResponse>,
  next: NextFunction
) => {
  try {
    const validatedData = req.body;

    // Address + City + Province should be unique
    const houseExists = await HouseModel.findOne({
      address: validatedData.address,
      city: validatedData.city,
      province: validatedData.province,
    });

    if (houseExists) {
      throw new Error('House already exists');
    }

    const house: IHouse = new HouseModel(validatedData);

    await house.save();
    res.status(StatusCodes.CREATED).json({
      message: 'House created',
      status: StatusCodes.CREATED,
      data: house,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'House already exists') {
      res.status(StatusCodes.FORBIDDEN);
      next(error);
    }
    res.status(StatusCodes.BAD_REQUEST);
    next(new Error('Fail to create a house'));
  }
};

// Update a specific house by ID
export const updateHouse = async (
  req: UpdateHouseRequest,
  res: Response<UpdateHouseResponse>,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const house: IHouse | null = await HouseModel.findById(id);
    if (!house) {
      throw new Error(`House with ID ${id} not found.`);
    }

    const validatedData = req.body;

    // Address + City + Province should be unique
    if (validatedData.address || validatedData.city || validatedData.province) {
      const houseExists = await HouseModel.findOne({
        address: validatedData.address || house.address,
        city: validatedData.city || house.city,
        province: validatedData.province || house.province,
      });

      if (houseExists && houseExists._id.toString() !== id) {
        throw new Error('House already exists');
      }
    }

    const updatedHouse = await HouseModel.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!updatedHouse) {
      throw new Error(`House with ID ${id} not found.`);
    }

    res.status(StatusCodes.OK).json({
      message: `House with ID ${id} updated successfully.`,
      status: StatusCodes.OK,
      data: updatedHouse,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'House already exists') {
        res.status(StatusCodes.FORBIDDEN);
        next(error);
      } else {
        res.status(StatusCodes.NOT_FOUND);
        next(error);
      }
    }
    res.status(StatusCodes.BAD_REQUEST);
    next(new Error('Fail to update a house'));
  }
};

// Delete a specific house by ID
export const deleteHouse = async (
  req: DeleteHouseRequest,
  res: Response<GeneralResponse<null>>,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedHouse = await HouseModel.findByIdAndRemove(id);

    if (!deletedHouse) {
      throw new Error(`House with ID ${id} not found.`);
    }

    res.status(StatusCodes.OK).json({
      message: `House with ID ${id} deleted successfully.`,
      status: StatusCodes.OK,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.NOT_FOUND);
      next(error);
    }
    res.status(StatusCodes.BAD_REQUEST);
    next(new Error('Fail to delete a house'));
  }
};
