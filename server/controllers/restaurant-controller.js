import Restaurant from "../models/restaurant"; // Assuming you have a Restaurant model

// Create a new restaurant
export const createRestaurant = async (req, res) => {
  try {
    const { name, location } = req.body;

    const newRestaurant = await Restaurant.create({
      name,
      location,
    });

    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating the restaurant" });
  }
};

// Retrieve all restaurants
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving restaurants" });
  }
};

// Retrieve a restaurant by ID
export const getRestaurantById = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant.findByPk(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving restaurant by ID" });
  }
};

// Update a restaurant by ID
export const updateRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, location } = req.body;

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    restaurant.name = name;
    restaurant.location = location;
    await restaurant.save();

    res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating restaurant" });
  }
};

// Delete a restaurant by ID
export const deleteRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    await restaurant.destroy();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting restaurant" });
  }
};
