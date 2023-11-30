'use client'
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'
import OrderService from '../../../Services/Internal/Orders/Orders'
import ErrorMessage from '../../../UI/Error/ErrorMessage'
import { useState } from 'react'
import { Button } from '@mui/material'

// TODO: SORT THESE AS PRIORITY!
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

const OrderDetailsById = ({ orderId }) => {
  const [showItemDetails, setShowItemDetails] = useState(false)

  const queryOptions: UseQueryOptions<UseQueryResult<Order, Error>, Error, Order> = {
    queryKey: ['orderById'],
    // @ts-ignore
    queryFn: () => OrderService.getOrderById(orderId)
  }
  const {
    data: orderData,
    isLoading,
    isError
  }: UseQueryResult<Order, Error> = useQuery(queryOptions)

  if (isLoading) return <div>Loading orders...</div>
  if (isError) {
    return <ErrorMessage error="Error loading order details, please refresh this window" />
  }

  const toggleItemDetails = () => {
    setShowItemDetails(!showItemDetails)
  }

  return (
    <>
      {orderData && (
        <div>
          <p>Order ID: {orderData.id}</p>
          {/* ... Other order details ... */}
          <Button onClick={toggleItemDetails}>
            {showItemDetails ? 'Hide' : 'Show'} Item Details
          </Button>
          {showItemDetails && (
            <>
              <h3>Items:</h3>
              <ul>
                {Object.entries(orderData.items).map(([productId, item]) => (
                  <li key={productId}>
                    <p>Name: {item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: £{item.price.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default OrderDetailsById