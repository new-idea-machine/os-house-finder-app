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
import User from '@src/models/userModel';

// Get all preferences
// @route GET /api/preferences
// @route GET /api/users/:userId/preferences

export const getAllPreferences = async (
  req: Request,
  res: Response<GetPreferencesResponse>
): Promise<void> => {
  try {
    let query;

    if (req.params.userId) {
      query = Preference.find({ userId: req.params.userId }).populate({
        path: 'userId',
        select: 'email',
        model: User,
      });
    } else {
      query = Preference.find();
    }

    const preferences = (await query) as IPreference[];

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
  if (req.user) req.body.userId = req.user.id;

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
  try {
    const newData = req.body;

    let updatedPreference = (await Preference.findById(id)) as IPreference;

    if (!updatedPreference) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `Preference with ID ${id} not found.`,
        status: StatusCodes.NOT_FOUND,
      });
      return;
    }

    // make sure the user is the owner of the preference

    if (
      req.user &&
      updatedPreference.userId.toString() !== req.user._id.toString()
    ) {
      res.status(StatusCodes.FORBIDDEN).json({
        message: 'You are not authorized to update this preference',
        status: StatusCodes.FORBIDDEN,
      });
      return;
    }

    updatedPreference = (await Preference.findByIdAndUpdate(id, newData, {
      new: true,
    })) as IPreference;

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
    let deletedPreference = (await Preference.findById(id)) as IPreference;
    deletedPreference = (await Preference.findByIdAndDelete(id)) as IPreference;

    if (!deletedPreference) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `Preference with ID ${id} not found.`,
        status: StatusCodes.NOT_FOUND,
      });
      return;
    }

    if (
      req.user &&
      deletedPreference.userId.toString() !== req.user.id.toString()
    ) {
      res.status(StatusCodes.FORBIDDEN).json({
        message: 'You are not authorized to delete this preference',
        status: StatusCodes.FORBIDDEN,
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
