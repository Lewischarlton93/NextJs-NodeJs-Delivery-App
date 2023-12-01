import axios from 'axios'

interface GeocodeResponse {
  results: {
    geometry: {
      location: {
        lat: number
        lng: number
      }
    }
  }[]
}

/**
 * @param address 
 * @returns Lat and Long values of given address
 */
const Geocode = async (address: string): Promise<{ lat: number; lng: number }> => {
  try {
    const response = await axios.get<GeocodeResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}`
    )

    const location = response.data.results[0].geometry.location
    return { lat: location.lat, lng: location.lng }

  } catch (error) {
    console.error('Error Geocoding address:', error.message)
    throw error
  }
}

export default Geocode
