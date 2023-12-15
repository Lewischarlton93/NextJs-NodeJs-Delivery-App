'use client'
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import OrderService from '../../../Services/Internal/Orders/Orders'
import ErrorMessage from '../../../UI/Error/ErrorMessage'
import { useState } from 'react'
import { Button } from '@mui/material'
import LoadingSpinner from '../../../UI/Loading/LoadingSpinner'
import { Order } from '../../../Types/Order'
import { styled, Typography } from '@mui/material'
import { colors } from '../../../Theme/Theme'
import { useRiderStore } from '../../../Stores/Rider/useRiderStore'

const OrderDetailsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center',
  width: '100%'
}))

const ItemDetailsContainer = styled('div')(({ theme }) => ({
  ul: {
    listStyle: 'none',
    paddingLeft: 0,
    li: {
      marginBottom: theme.spacing(4),
      p: {
        marginBottom: theme.spacing(1)
      },
      span: {
        fontWeight: 600,
        marginRight: theme.spacing(1)
      }
    }
  }
}))

const OrderDetailsById = ({ orderId }) => {
  const [showItemDetails, setShowItemDetails] = useState(false)
  const { updateRiderInfo } = useRiderStore()

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

  const handleCollectedOrder = () => {
    updateRiderInfo({ riderStep: 'ORDER_COLLECTED' })
  }

  return (
    <>
      {orderData && (
        <OrderDetailsWrapper>
          <Typography variant="h3" sx={{ mb: 0 }}>
            Order #{orderData.id}
          </Typography>
          <Button
            onClick={toggleItemDetails}
            variant="text"
            sx={{ color: colors.black, paddingLeft: 0 }}
          >
            {showItemDetails ? 'Hide' : 'Show'} Item Details
          </Button>
          {showItemDetails && (
            <ItemDetailsContainer>
              <h3>Items:</h3>
              <ul>
                {Object.entries(orderData.items).map(([productId, item]) => (
                  <li key={productId}>
                    <p>
                      <span>Name:</span> {item.name}
                    </p>
                    <p>
                      <span>Quantity:</span> {item.quantity}
                    </p>
                    <p>
                      <span>Price:</span> £{item.price.toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            </ItemDetailsContainer>
          )}
          <Button
            onClick={handleCollectedOrder}
            variant="contained"
            sx={{ width: 300, margin: '20px auto' }}
          >
            Confirm Order Collected
          </Button>
        </OrderDetailsWrapper>
      )}
    </>
  )
}

export default OrderDetailsById
