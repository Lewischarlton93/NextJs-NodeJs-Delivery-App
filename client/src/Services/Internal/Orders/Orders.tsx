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

const getOrderById = async (orderId: number) => {
  const { data } = await axios.get<Order>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/${orderId}`
  )
  console.log('LEW order data by ID', data)
  return data
}

const createOrder = () => {
  // TODO!
}

const editOrder = () => {
  // TODO!
}

const deleteOrder = () => {
  // TODO!
}

const OrderService = {
  getOrders,
  getOrderById,
  createOrder,
  editOrder,
  deleteOrder
}

export default OrderService
