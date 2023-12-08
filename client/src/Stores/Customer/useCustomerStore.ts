import { create } from 'zustand'
import { Coordinates } from '../../Types/SharedTypes'

interface CustomerStore {
    customerId: number,
    customerName: string,
    customerLastName: string,
    customerContactNumber: string,
    customerEmailAddress: string,
    customerLocationAddress: string,
    customerLocationCoordinates: Coordinates,
    // TODO: Add more to this but not doing customer part currently.
    updateCustomerInfo: (info: Partial<CustomerStore>) => void
}

export const useCustomerStore = create<CustomerStore>((set) => ({
    customerId: 0,
    customerName: 'Customer One',
    customerLastName: 'Smith',
    customerContactNumber: '07777777777',
    customerEmailAddress: 'customerone@gmail.com',
    customerLocationAddress: '1-5 Bateman Cl, Crewe CW1 3DQ',
    customerLocationCoordinates: { lat: 53.0981936, lng: -2.455946},
    updateCustomerInfo: (info) => set((state) => ({ ...state, ...info })),
}))
