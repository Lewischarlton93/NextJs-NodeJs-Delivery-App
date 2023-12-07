'use client'
import { Typography, styled, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { assignOrderToRider } from '../../Utils/Rider/RiderUtils'
import { newOrder, onlineRiders } from '../../__test__/MockData'
import { useRiderStore } from '../../Stores/Rider/useRiderStore'

const GoOnline = () => {
  const { riderFirstName, updateRiderInfo } = useRiderStore()
  const [isOnline, setIsOnline] = useState(false)

  // TODO: This actually appears once they have arrived at the restaurant.
  // const showAssignedOrder = () => {
  //   return <OrderDetailsById orderId={1} />
  // }

  const handleUpdateOnlineStatus = () => {
    // TODO: POST REQ to update rider online status in Rider table.
    setIsOnline(!isOnline)
    if (!isOnline) {
      // TODO: Autodecline the order
    }
  }

  const handleOrderTimeout = () => {
    // TODO: Handle the logic when the 30-second countdown reaches 0 (auto-decline the order)
    console.log('Order not accepted within 30 seconds. Auto-declining...')
    updateRiderInfo({ riderStep: 'GO_ONLINE' })
  }

  const handleDeclineOrder = () => {
    // TODO: Handle the logic when the rider declines the order
    console.log('Order declined.')
    // setWaitingForOrder(true)
  }

  // TODO: Uncomment / Set this back to 30 when done adding styling.
  // const { timeRemaining, resetTimer } = useCountdownTimer(300000, handleOrderTimeout)

  useEffect(() => {
    // Simulate the process of assigning an order after 5 seconds - TODO: Will be changing once customer order part is added!
    const assignmentTimeout = setTimeout(() => {
      if (isOnline) {
        // setWaitingForOrder(false)
        assignOrderToRider(newOrder, onlineRiders)
        updateRiderInfo({ riderStep: 'ORDER_RECEIVED' })
      }
    }, 5000)

    return () => {
      clearTimeout(assignmentTimeout)
    }
  }, [isOnline])

  return (
    <>
      <Typography variant="h2">
        {isOnline ? 'Finding orders for you...' : `Ready to ride, ${riderFirstName} ?`}
      </Typography>
      <Button onClick={handleUpdateOnlineStatus} variant="contained">
        {isOnline ? 'Go Offline' : 'Go Online'}
      </Button>
    </>
  )
}

export default GoOnline
