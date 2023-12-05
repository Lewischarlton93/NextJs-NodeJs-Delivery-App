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
  updateRiderInfo: (info: Partial<RiderStore>) => void
}

export const useRiderStore = create<RiderStore>((set) => ({
  riderId: 0,
  riderFirstName: '',
  riderLastName: '',
  riderContactNumber:'',
  riderEmailAddress: '',
  riderLocationAddress: '',
  riderLocationCoordinates: { lat: 0, long: 0 },
  delivered: 0,
  earned: 0,
  rejected: 0,
  assignedOrder: 0,
  updateRiderInfo: (info) => set((state) => ({ ...state, ...info })),
}))
