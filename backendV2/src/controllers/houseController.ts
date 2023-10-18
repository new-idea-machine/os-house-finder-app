import { Request, Response } from 'express';
import { spawn, ChildProcess } from 'child_process';
import House, { IHouse } from '../models/houseModel';

// Get all houses
export const getHouses = async (req: Request, res: Response): Promise<void> => {
  try {
    const houses = await House.find();
    res.status(200).json(houses);
  } catch (error) {
    res.status(404).json(error);
  }
};

// Get a specific house by ID
export const getHouse = async (req: Request, res: Response): Promise<void> => {
  try {
    const house = await House.findById(req.params.id);
    res.status(200).json(house);
  } catch (error) {
    res.status(404).json(error);
  }
};

// Get Scraped data by
export const getScraped = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Now, let's call the Python function
    const pythonProcess: ChildProcess = spawn('python', [
      '../scripts/scraper.py',
      req.params.url,
    ]) as ChildProcess;

    pythonProcess.stdout?.on('data', (data) => {
      const result: string = data.toString();
      res.send(result); // Sending the Python function result as the response
    });

    pythonProcess.on('error', (error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).send('Error calling Python function');
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        // eslint-disable-next-line no-console
        console.error(`Python process exited with code ${code}`);
      }
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

// Create a new house
export const createHouse = async (
  req: Request,
  res: Response
): Promise<void> => {
  const house: IHouse = new House(req.body);

  try {
    await house.save();
    res.status(201).json(house);
  } catch (error) {
    res.status(409).json(error);
  }
};

// Update a specific house by ID
export const updateHouse = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedHouse = await House.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedHouse) {
      res.status(404).json({ message: `House with ID ${id} not found.` });
      return;
    }

    res.status(200).json({
      message: `House with ID ${id} updated successfully.`,
      updatedHouse,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

// Delete a specific house by ID
export const deleteHouse = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedHouse = await House.findByIdAndRemove(id);

    if (!deletedHouse) {
      res.status(404).json({ message: `House with ID ${id} not found.` });
      return;
    }

    res
      .status(200)
      .json({ message: `House with ID ${id} deleted successfully.` });
  } catch (error) {
    res.status(400).json(error);
  }
};
