'use client'
import { useQuery } from '@tanstack/react-query'
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
}

// TODO: This is only to output all orders for now.
const Orders = () => {
  const { data, isLoading, isError } = useQuery<Order[]>({
    queryKey: ['userOrders'],
    queryFn: async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`)
      console.log(data)
      return data
    }
  })

  if (isLoading) return <div>Loading orders...</div>
  if (isError) {
    // TODO: Handle this better.
    return <div>Error fetching data</div>
  }

  return (
    <div>
      <h2>Orders</h2>
      {data?.map((order) => (
        <div key={order.id}>
          <h3>Order #{order.id}</h3>
          <p>Status: {order.status}</p>
          <ul>
            {Object.values(order.items).map((item, index) => (
              <li key={index}>
                {item.quantity} x {item.name} - £{item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Orders
