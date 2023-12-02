import axios from 'axios'

interface DirectionsApiResponse {
  routes: {
    legs: {
      distance: {
        text: string // Returns string value in Km
        value: number // Returns value in Meters
      }
      duration: {
        text: string //Returns string value in Minutes (But maybe days/months/years etc if greater.)
        value: number // Returns value in seconds
      }
    }[]
  }[]
}

const Directions = async (
  origin: string,
  destination: string,
  travelMode: 'driving' | 'walking' | 'bicycling' | 'transit' = 'bicycling'
): Promise<{ distance: number; duration: number }> => {
  try {
    const response = await axios.get<DirectionsApiResponse>(
      `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_BASE_URL}/directions/json?origin=${origin}&destination=${destination}&mode=${travelMode}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    )

    const route = response.data.routes[0].legs[0]
    const distanceInMeters = route.distance.value
    const durationInSeconds = route.duration.value

    // Convert distance to kilometers
    const distanceInKilometers = distanceInMeters / 1000

    // Convert duration to minutes and round to 2 decimal places
    const durationInMinutes = +(durationInSeconds / 60).toFixed(2)

    return { distance: distanceInKilometers, duration: durationInMinutes }
  } catch (error) {
    console.error('Error fetching directions:', error)
    throw error
  }
}

export default Directions