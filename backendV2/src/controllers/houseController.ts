import { NextFunction, Request, Response } from 'express';
import { spawn, ChildProcess } from 'child_process';
import HouseModel, { IHouse } from '@models/houseModel';
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
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('House not found');
    }
    res
      .status(StatusCodes.OK)
      .json({ message: 'House found', status: StatusCodes.OK, data: house });
  } catch (error) {
    next(error);
  }
};

// Get Scraped data by
/* eslint-disable no-console */
export const getScraped = async (
  req: GetScrapedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {


  try {
    const pythonProcess: ChildProcess = spawn('python', [
      "src/scripts/scrape.py",
      req.body.url
    ]) as ChildProcess;

    pythonProcess.stdout?.on('data', (data) => {
      console.log('data done');
      const result: string = data.toString();
      res.send(result);
    });

    pythonProcess.on('error', (error) => {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      throw new Error('Error calling Python function');
    });

    pythonProcess.stderr?.on('data', (data) => {
      const err: string = data.toString();
      console.log(err);

    })

    pythonProcess.on('exit', (code) => {
      if (code !== 0) {
        console.error(`Python process exited with code ${code}`);
      }
    });
  } catch (error) {
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
      res.status(StatusCodes.FORBIDDEN);
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
    next(error);
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
      res.status(StatusCodes.NOT_FOUND);
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
        res.status(StatusCodes.FORBIDDEN);
        throw new Error('House already exists');
      }
    }

    const updatedHouse = await HouseModel.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!updatedHouse) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error(`House with ID ${id} not found.`);
    }

    res.status(StatusCodes.OK).json({
      message: `House with ID ${id} updated successfully.`,
      status: StatusCodes.OK,
      data: updatedHouse,
    });
  } catch (error) {
    next(error);
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
      res.status(StatusCodes.NOT_FOUND);
      throw new Error(`House with ID ${id} not found.`);
    }

    res.status(StatusCodes.OK).json({
      message: `House with ID ${id} deleted successfully.`,
      status: StatusCodes.OK,
    });
  } catch (error) {
    next(error);
  }
};
