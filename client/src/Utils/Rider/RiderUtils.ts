import { Order } from "../../Types/Order"
import { Rider } from "../../Types/Rider"

export const assignOrderToRider = (order: Order, onlineRiders: Rider[]) => {
    const availableRiders = onlineRiders.filter((rider) => rider.status === 'online')
  
    // TODO: Currently selecting first rider, but add some logic in to assign to closest? (P2)
    const selectedRider = availableRiders[0]

    if(!selectedRider) return
  
    updateOrderStatus(order.id, 'assigned', selectedRider.id)
    console.log(`Order assigned to ${selectedRider.name}:`, order)
    // TODO: Update Global state for assigned Rider + create useRestarant store!
}

export const updateOrderStatus = (orderId: number, newStatus: Order['status'], riderId: number) => {
    // TODO: POST Reqs to backend.
    console.log(`Order ${orderId} status updated to ${newStatus} for ${riderId}`)
}
