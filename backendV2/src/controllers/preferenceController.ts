import { Request, Response } from 'express';
import { Preference, IPreference } from '@models/preferenceModel';
import {
  GetAPreferenceRequest,
  DeletePreferenceRequest,
  CreatePreferenceRequest,
  UpdatePreferenceRequest,
} from '@interfaces/requests/preference';
import { StatusCodes } from '@src/constant';
import {
  GetPreferencesResponse,
  GetAPreferenceResponse,
  CreatePreferenceResponse,
  UpdatePreferenceResponse,
} from '@interfaces/responses/preference';
import { GeneralResponse } from '@interfaces/responses/general';

// Get all preferences
export const getAllPreferences = async (
  _: Request,
  res: Response<GetPreferencesResponse>
): Promise<void> => {
  try {
    const preferences = await Preference.find();

    res.status(StatusCodes.OK).json({
      message: 'Preferences found',
      status: StatusCodes.OK,
      data: preferences,
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: error.message, status: StatusCodes.NOT_FOUND });
    }
  }
};

// Get a specific preference by ID
export const getPreference = async (
  req: GetAPreferenceRequest,
  res: Response<GetAPreferenceResponse>
): Promise<void> => {
  try {
    const preference = (await Preference.findById(
      req.params.id
    )) as IPreference;

    res.status(StatusCodes.OK).json({
      message: 'Preference found',
      status: StatusCodes.OK,
      data: preference,
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: error.message, status: StatusCodes.NOT_FOUND });
    }
  }
};

// Create a new preference
export const createPreference = async (
  req: CreatePreferenceRequest,
  res: Response<CreatePreferenceResponse>
) => {
  const newPreference = await Preference.create(req.body);

  try {
    res.status(StatusCodes.CREATED).json({
      message: 'New Preference created',
      status: StatusCodes.CREATED,
      data: newPreference,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Failed to create a new Preference',
      status: StatusCodes.BAD_REQUEST,
    });
  }
};

// Update a specific preference by ID
export const updatePreference = async (
  req: UpdatePreferenceRequest,
  res: Response<UpdatePreferenceResponse>
): Promise<void> => {
  const { id } = req.params;
  console.log(`request parameters is ${req.params}`);
  try {
    const newData = req.body;

    const updatedPreference = (await Preference.findByIdAndUpdate(id, newData, {
      new: true,
    })) as IPreference;

    if (!updatedPreference) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `Preference with ID ${id} not found.`,
        status: StatusCodes.NOT_FOUND,
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: `Preference with ID ${id} updated successfully.`,
      status: StatusCodes.OK,
      data: updatedPreference,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Fail to update a Preference',
      status: StatusCodes.BAD_REQUEST,
    });
  }
};
// Delete a specific house by ID
export const deletePreference = async (
  req: DeletePreferenceRequest,
  res: Response<GeneralResponse<null>>
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedPreference = await Preference.findByIdAndDelete(id);

    if (!deletedPreference) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `Preference with ID ${id} not found.`,
        status: StatusCodes.NOT_FOUND,
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: `Preference with ID ${id} deleted successfully.`,
      status: StatusCodes.OK,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Fail to delete a Preference',
      status: StatusCodes.BAD_REQUEST,
    });
  }
};

export default {
  getAllPreferences,
  getPreference,
  createPreference,
  updatePreference,
  deletePreference,
};
