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
    customerLocationAddress: 'Elizabeth street crewe',
    customerLocationCoordinates: { lat: 53.1027896, lng: -2.4545611},
    updateCustomerInfo: (info) => set((state) => ({ ...state, ...info })),
}))
