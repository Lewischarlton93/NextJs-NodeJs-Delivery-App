import create from 'zustand'

interface RiderStore {
  riderId: number,
  riderFirstName: string,
  riderLastName: string,
  riderContactNumber: string,
  riderEmailAddress: string,
  // When doing the backend, there's certain fields I probably shouldn't include e.g. location (as this changes constantly)
  riderLocationAddress: string,
  riderLocationCoordinates: { lat: number, long: number },
  delivered: number,
  earned: number,
  rejected: number,
  assignedOrder: number,
  riderStep: 'GO_ONLINE' | 'ORDER_RECEIVED' | 'ORDER_ACCEPTED' | 'ORDER_COLLECTED' | 'ORDER_DELIVERED'
  updateRiderInfo: (info: Partial<RiderStore>) => void
}

// Added some default values for now as it makes it easier during dev until I have sorted register/backend out properly.
export const useRiderStore = create<RiderStore>((set) => ({
  riderId: 0,
  riderFirstName: 'Lewis',
  riderLastName: 'Charlton',
  riderContactNumber:'07777777777',
  riderEmailAddress: 'lewistest@test.com',
  riderLocationAddress: '21 Lyceum Close, Crewe, CW1 3YB',
  riderLocationCoordinates: { lat: 53.09787, long: -2.44161 },
  delivered: 2,
  earned: 44.65,
  rejected: 7,
  assignedOrder: 0,
  riderStep: 'GO_ONLINE',
  updateRiderInfo: (info) => set((state) => ({ ...state, ...info })),
}))
