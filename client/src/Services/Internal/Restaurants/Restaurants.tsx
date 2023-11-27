import axios from 'axios'

interface Restaurant {
  id: number
  name: string
  location: [string, string]
  orders: [number] // Array of Order IDs. TODO: Update backend with this field!
}

const getRestaurants = async () => {
  const { data } = await axios.get<Restaurant[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/restaurants`
  )
  console.log('LEW Restaurant DATA', data)
  return data
}

const getRestaurantById = async (restaurantId: number) => {
  const { data } = await axios.get<Restaurant>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/restaurants/${restaurantId}`
  )
  console.log('LEW Restaurant data by ID', data)
  return data
}

const createRestaurant = () => {
  // TODO!
}

const editRestaurant = () => {
  // TODO!
}

const deleteRestaurant = () => {
  // TODO!
}

const RestaurantsService = {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  editRestaurant,
  deleteRestaurant
}

export default RestaurantsService
