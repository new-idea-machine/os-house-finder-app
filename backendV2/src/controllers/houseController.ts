import { Request, Response } from 'express';
import { spawn, ChildProcess } from 'child_process';
import HouseModel, { HouseZodSchema, IHouse } from '@models/house.model';
import {
  CreateHouseRequest,
  DeleteHouseRequest,
  GetAHouseRequest,
  GetScrapedRequest,
  UpdateHouseRequest,
} from '@interfaces/requests/house';
import { StatusCodes } from '@src/constant';
import {
  GetHouseResponse,
  GetHousesResponse,
  UpdateHouseResponse,
} from '@interfaces/responses/house';
import { GeneralResponse } from '@interfaces/responses/general';

// Get all houses
export const getHouses = async (
  _: Request,
  res: Response<GetHousesResponse>
): Promise<void> => {
  try {
    const houses = await HouseModel.find();

    res
      .status(StatusCodes.OK)
      .json({ message: 'Houses found', status: StatusCodes.OK, data: houses });
  } catch (error) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'Houses not found', status: StatusCodes.NOT_FOUND });
  }
};

// Get a specific house by ID
export const getHouse = async (
  req: GetAHouseRequest,
  res: Response<GetHouseResponse>
): Promise<void> => {
  try {
    const house = (await HouseModel.findById(req.params.id)) as IHouse;
    if (!house) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'House not found', status: StatusCodes.NOT_FOUND });
      return;
    }
    res
      .status(StatusCodes.OK)
      .json({ message: 'House found', status: StatusCodes.OK, data: house });
  } catch (error) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'House not found', status: StatusCodes.NOT_FOUND });
  }
};

// Get Scraped data by
export const getScraped = async (
  req: GetScrapedRequest,
  res: Response
): Promise<void> => {
  try {
    const pythonProcess: ChildProcess = spawn('python', [
      '../scripts/scraper.py',
      req.params.url,
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
    res.status(StatusCodes.NOT_FOUND).json(error);
  }
};

// Create a new house
export const createHouse = async (
  req: CreateHouseRequest,
  res: Response<GetHouseResponse>,
) => {
  try {
    const validatedData = HouseZodSchema.parse(req.body);

    // Address + City + Province should be unique
    const houseExists = await HouseModel.findOne({
      address: validatedData.address,
      city: validatedData.city,
      province: validatedData.province,
    });

    if (houseExists) {
      res.status(StatusCodes.FORBIDDEN).json({
        message: 'House already exists',
        status: StatusCodes.FORBIDDEN,
      });
      return;
    }

    const house: IHouse = new HouseModel(validatedData);

    try {
      await house.save();
      res.status(StatusCodes.CREATED).json({
        message: 'House created',
        status: StatusCodes.CREATED,
        data: house,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Failed to create a house',
        status: StatusCodes.BAD_REQUEST,
      });
    }
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Invalid data',
      status: StatusCodes.BAD_REQUEST,
    });
  }
};

// Update a specific house by ID
export const updateHouse = async (
  req: UpdateHouseRequest,
  res: Response<UpdateHouseResponse>
): Promise<void> => {
  const { id } = req.params;

  try {
    const house: IHouse | null = await HouseModel.findById(id);
    if (!house) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `House with ID ${id} not found.`,
        status: StatusCodes.NOT_FOUND,
      });
      return;
    }
    // Validate data
    const validatedData = HouseZodSchema.parse(req.body);


    // Address + City + Province should be unique
    if (validatedData.address || validatedData.city || validatedData.province) {
      const houseExists = await HouseModel.findOne({
        address: validatedData.address || house.address,
        city: validatedData.city || house.city,
        province: validatedData.province || house.province,
      });

      if (houseExists && houseExists._id != id) {
        res.status(StatusCodes.FORBIDDEN).json({
          message: 'House already exists',
          status: StatusCodes.FORBIDDEN,
        });
        return;
      }
    }

    const updatedHouse = await HouseModel.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!updatedHouse) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `House with ID ${id} not found.`,
        status: StatusCodes.NOT_FOUND,
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: `House with ID ${id} updated successfully.`,
      status: StatusCodes.OK,
      data: updatedHouse,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Fail to update a house',
      status: StatusCodes.BAD_REQUEST,
    });
  }
};

// Delete a specific house by ID
export const deleteHouse = async (
  req: DeleteHouseRequest,
  res: Response<GeneralResponse<null>>
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedHouse = await HouseModel.findByIdAndRemove(id);

    if (!deletedHouse) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `House with ID ${id} not found.`,
        status: StatusCodes.NOT_FOUND,
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: `House with ID ${id} deleted successfully.`,
      status: StatusCodes.OK,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Fail to delete a house',
      status: StatusCodes.BAD_REQUEST,
    });
  }
};
