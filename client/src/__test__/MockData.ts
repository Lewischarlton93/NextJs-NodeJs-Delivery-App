import { Order } from "../Types/Order"
import { Rider } from "../Types/Rider"

export const onlineRiders: Rider[] = [
    { id: 1, name: 'Rider 1', status: 'online' },
    { id: 2, name: 'Rider 2', status: 'online' }
]
  
// Mocked order creation
export const newOrder: Order = {
    id: 123,
    customerId: 1,
    riderId: 2,
    restaurantId: 2,
    deliveryLocation: 'Some Address',
    status: 'pending',
    items: {
      product1: {
        name: 'Item 1',
        quantity: 2,
        price: 19.99
      },
      product2: {
        name: 'Item 2',
        quantity: 1,
        price: 29.99
      }
    }
}