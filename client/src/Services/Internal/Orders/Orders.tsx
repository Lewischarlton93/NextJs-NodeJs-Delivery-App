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
  try {
    const { data } = await axios.get<Order[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`)
    console.log('LEW ORDER DATA', data)
    return data
  } catch (err) {
    console.log('LEW ERR', err)
  }
}

const getOrderById = async (orderId: number) => {
  try {
    const { data } = await axios.get<Order>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/${orderId}`
    )
    console.log('TEST LEW order data by ID', data)
    return data
  } catch (err) {
    console.log('LEW ERR', err)
  }
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
