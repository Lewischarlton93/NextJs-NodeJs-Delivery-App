import Rider from "../models/rider";

// Create a new rider
export const createRider = async (req, res) => {
  try {
    const { firstName, lastName, transportType } = req.body;

    const newRider = await Rider.create({
      firstName,
      lastName,
      transportType,
    });

    res.status(201).json(newRider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating the rider" });
  }
};

// Retrieve all riders
export const getAllRiders = async (req, res) => {
  try {
    const riders = await Rider.findAll();
    res.status(200).json(riders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving riders" });
  }
};

// Retrieve a rider by ID
export const getRiderById = async (req, res) => {
  try {
    const { riderId } = req.params;
    const rider = await Rider.findByPk(riderId);

    if (!rider) {
      return res.status(404).json({ error: "Rider not found" });
    }

    res.status(200).json(rider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving rider by ID" });
  }
};

// Update a rider by ID
export const updateRider = async (req, res) => {
  try {
    const { riderId } = req.params;
    const { firstName, lastName, transportType } = req.body;

    const rider = await Rider.findByPk(riderId);
    if (!rider) {
      return res.status(404).json({ error: "Rider not found" });
    }

    rider.firstName = firstName;
    rider.lastName = lastName;
    rider.transportType = transportType;
    await rider.save();

    res.status(200).json(rider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating rider" });
  }
};

// Delete a rider by ID
export const deleteRider = async (req, res) => {
  try {
    const { riderId } = req.params;

    const rider = await Rider.findByPk(riderId);
    if (!rider) {
      return res.status(404).json({ error: "Rider not found" });
    }

    await rider.destroy();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting rider" });
  }
};
