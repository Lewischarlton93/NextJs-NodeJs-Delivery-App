'use client'
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'
import OrderService from '../../Services/Internal/Orders/Orders'
import { Typography } from '@mui/material'
import CreateOrder from './CreateOrder'
import LoadingSpinner from '../../UI/Loading/LoadingSpinner'

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface Order {
  id: number
  items: { [productId: string]: OrderItem }
  status: string
  // TODO: Update backend to reflect riderId and restaurantId.
  riderId: number
  restaurantId: number
}

const AllOrders = () => {
  const queryOptions: UseQueryOptions<UseQueryResult<Order[], Error>, Error, Order[]> = {
    queryKey: ['allOrders'],
    // @ts-ignore
    queryFn: OrderService.getOrders
  }

  const {
    data: orderData,
    isLoading,
    isError
  }: UseQueryResult<Order[], Error> = useQuery(queryOptions)

  if (isLoading) return <LoadingSpinner />
  if (isError) {
    // TODO: Handle this better.
    return <div>Error fetching data</div>
  }

  // TODO: We can link Restaurant ID with restaurant to get the Restaurant name and location.
  return (
    <div>
      <Typography variant="h2">Orders</Typography>
      {orderData?.map((order) => (
        <div key={order.id}>
          <h3>Order #{order.id}</h3>
          <p>Status: {order.status}</p>
          <p>Assigned Rider ID: {order.riderId}</p>
          <p>Restaurant ID: {order.riderId}</p>
          <ul>
            {Object.values(order.items).map((item) => (
              <li key={uuidv4()}>
                {item.quantity} x {item.name} - £{item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Typography variant="h2">Create Order</Typography>
      <CreateOrder />
    </div>
  )
}

export default AllOrders
