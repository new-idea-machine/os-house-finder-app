import houseModel from '../models/houseModel.js';

// Get all houses
export const getHouses = async (req, res) => {
  try {
    const houses = await houseModel.find();
    res.status(200).json(houses);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// Get a specific house by ID
export const getHouse = async (req, res) => {
  try {
    const house = await houseModel.findById(req.params.id);
    res.status(200).json(house);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// Create a new house
export const createHouse = async (req, res) => {
  const house = req.body;
  const newHouse = new houseModel(house);

  try {
    await newHouse.save();
    res.status(201).json(newHouse);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

// Update a specific house by ID
export const updateHouse = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const updatedHouse = await houseModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedHouse) {
      return res.status(404).json({ message: `House with ID ${id} not found.` });
    }

    res.status(200).json({ message: `House with ID ${id} updated successfully.`, updatedHouse });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Delete a specific house by ID
export const deleteHouse = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedHouse = await houseModel.findByIdAndRemove(id);

    if (!deletedHouse) {
      return res.status(404).json({ message: `House with ID ${id} not found.` });
    }

    res.status(200).json({ message: `House with ID ${id} deleted successfully.` });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};