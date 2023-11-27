import axios from 'axios'

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface Order {
  id: number
  items: { [productId: string]: OrderItem }
  status: string
  riderId: number
  restaurantId: number
}

const getOrders = async () => {
  const { data } = await axios.get<Order[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`)
  console.log('LEW ORDER DATA', data)
  return data
}

const OrderService = {
  getOrders
}

export default OrderService
