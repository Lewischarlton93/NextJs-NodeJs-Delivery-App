import { create } from 'zustand'
import { Coordinates } from '../../Types/SharedTypes'

interface RestaurantStore {
    restaurantId: number,
    restaurantName: string,
    restaurantAddress: string,
    restaurantLocationCoordinates: Coordinates,
    // Keeping this quite simple for now but may change later.
    activeOrders: number[], // Array of Order IDs. Can then use this to get the order info.
    completedOrders: number[],
    updateRestaurantInfo: (info: Partial<RestaurantStore>) => void
}

export const useRestaurantStore = create<RestaurantStore>((set) => ({
    restaurantId: 0,
    restaurantName: 'McDonalds',
    restaurantAddress: '100 Dunwoody Way, Crewe CW1 3AW',
    restaurantLocationCoordinates: { lat: 53.098293, lng: -2.4578496 },
    activeOrders: [1, 3, 6],
    completedOrders: [9, 33, 5],
    updateRestaurantInfo: (info) => set((state) => ({ ...state, ...info })),
}))
