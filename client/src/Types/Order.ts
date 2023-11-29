export interface Order {
    id: number
    items: { [productId: string]: OrderItem }
    status: 'pending' | 'assigned' | 'completed' | 'cancelled'
    // TODO: Update backend to reflect riderId, customerId and restaurantId.
    riderId: number
    restaurantId: number
    customerId: number,
    // TODO: Revisit this one?
    deliveryLocation: string
  }

interface OrderItem {
    name: string
    quantity: number
    price: number
}
