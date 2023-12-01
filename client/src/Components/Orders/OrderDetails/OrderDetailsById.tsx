'use client'
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import OrderService from '../../../Services/Internal/Orders/Orders'
import ErrorMessage from '../../../UI/Error/ErrorMessage'
import { useState } from 'react'
import { Button } from '@mui/material'
import LoadingSpinner from '../../../UI/Loading/LoadingSpinner'
import { Order } from '../../../Types/Order'
import { styled } from '@mui/material'
import { colors } from '../../../Theme/Theme'

const OrderDetailsWrapper = styled('div')(({ theme }) => ({
  // TODO
}))

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

  if (isLoading) return <LoadingSpinner />
  if (isError) {
    return <ErrorMessage error="Error loading order details, please refresh this window" />
  }

  const toggleItemDetails = () => {
    setShowItemDetails(!showItemDetails)
  }

  return (
    <>
      {orderData && (
        <OrderDetailsWrapper>
          <p>Order #{orderData.id}</p>
          {/* ... Other order details ... */}
          <Button
            onClick={toggleItemDetails}
            variant="text"
            sx={{ color: colors.black, paddingLeft: 0 }}
          >
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
        </OrderDetailsWrapper>
      )}
    </>
  )
}

export default OrderDetailsById
