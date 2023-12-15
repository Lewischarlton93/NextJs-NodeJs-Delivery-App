import { create } from 'zustand'
import { Coordinates } from '../../Types/SharedTypes'

interface RiderStore {
  riderId: number,
  riderFirstName: string,
  riderLastName: string,
  riderContactNumber: string,
  riderEmailAddress: string,
  // When doing the backend, there's certain fields I probably shouldn't include e.g. location (as this changes constantly)
  riderLocationAddress: string,
  riderLocationCoordinates: Coordinates,
  delivered: number,
  earned: number,
  rejected: number,
  assignedOrder: number,
  riderStep: 'GO_ONLINE' | 'ORDER_RECEIVED' | 'ORDER_ACCEPTED' | 'ARRIVED_AT_RESTAURANT' | 'ORDER_COLLECTED' | 'ORDER_DELIVERED',
  riderTravelType: 'driving' | 'walking' | 'bicycling' | 'transit' | undefined
  updateRiderInfo: (info: Partial<RiderStore>) => void
}

// Added some default values for now as it makes it easier during dev until I have sorted register/backend out properly.
export const useRiderStore = create<RiderStore>((set) => ({
  riderId: 0,
  riderFirstName: 'Lewis',
  riderLastName: 'Charlton',
  riderContactNumber: '07777777777',
  riderEmailAddress: 'lewistest@test.com',
  riderLocationAddress: '21 Lyceum Close, Crewe, CW1 3YB',
  riderLocationCoordinates: { lat: 53.09787, lng: -2.44161 },
  delivered: 2,
  earned: 44.65,
  rejected: 7,
  assignedOrder: 0,
  riderStep: 'GO_ONLINE',
  riderTravelType: 'bicycling',
  updateRiderInfo: (info) => set((state) => {
    // Add (increase value) to existing value instead of over-writing value
    const additionalEarned = info.earned ?? 0
    info.earned = state.earned + additionalEarned

    // For now assuming that only 1 order can be assigned at one time.
    if ('delivered' in info) {
      // Increment 'delivered' by 1
      info.delivered = state.delivered + 1
    }

    // Merge the updated info with the current state
    return { ...state, ...info }
  }),
}))
