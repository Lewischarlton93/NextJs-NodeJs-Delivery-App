'use client'
import Button from '@mui/material/Button'
import { Typography, styled } from '@mui/material'
import { colors } from '../../Theme/Theme'
import React, { useState, useEffect } from 'react'
import { assignOrderToRider } from '../../Utils/Rider/RiderUtils'
import { newOrder, onlineRiders } from '../../__test__/MockData'
import OrderDetailsById from '../Orders/OrderDetails/OrderDetailsById'
import useCountdownTimer from '../../Hooks/useCountdownTimer'
import CountdownProgressBar from '../../UI/ProgressBar/CountdownProgressBar'

const GoOnlineWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'absolute',
  bottom: 0,
  left: 0,
  padding: theme.spacing(4),
  width: '100%',
  backgroundColor: colors.white,
  h2: {
    marginRight: theme.spacing(4),
    marginBottom: 0,
    fontSize: 14,
    [theme.breakpoints.up('md')]: {
      fontSize: 20
    }
  }
}))

const GoOnline = () => {
  const [isOnline, setIsOnline] = useState(false)
  const [waitingForOrder, setWaitingForOrder] = useState(true)

  const showAssignedOrder = () => {
    return <OrderDetailsById orderId={1} />
  }

  // TODO: Update this with logged in user.
  const riderName = 'Lewis'

  const handleUpdateOnlineStatus = () => {
    // TODO: POST REQ to update rider online status in Rider table.
    console.log('Online!')
    setIsOnline(!isOnline)
    if (!isOnline) {
      // TODO: Autodecline the order
    }
  }

  const handleOrderTimeout = () => {
    // TODO: Handle the logic when the 30-second countdown reaches 0 (auto-decline the order)
    console.log('Order not accepted within 30 seconds. Auto-declining...')
    setWaitingForOrder(true)
  }

  const handleAcceptOrder = () => {
    // TODO: Handle the logic when the rider accepts the order
    console.log('Order accepted!')
    setWaitingForOrder(false)
  }

  const handleDeclineOrder = () => {
    // TODO: Handle the logic when the rider declines the order
    console.log('Order declined.')
    setWaitingForOrder(true)
  }

  const { timeRemaining, resetTimer } = useCountdownTimer(30, handleOrderTimeout)

  useEffect(() => {
    // Simulate the process of assigning an order after 5 seconds - TODO: Will be changing once customer order part is added!
    const assignmentTimeout = setTimeout(() => {
      setWaitingForOrder(false)
      assignOrderToRider(newOrder, onlineRiders)
    }, 5000)

    return () => {
      clearTimeout(assignmentTimeout)
    }
  }, [isOnline])

  return (
    <>
      <GoOnlineWrapper>
        <Typography variant="h2">
          {isOnline ? 'Finding orders for you...' : `Ready to ride, ${riderName} ?`}
        </Typography>
        <Button onClick={handleUpdateOnlineStatus}>{isOnline ? 'Go Offline' : 'Go Online'}</Button>
      </GoOnlineWrapper>
      {/* TODO: Revisit logic here! */}
      {isOnline && !waitingForOrder && (
        <>
          {showAssignedOrder()}
          <CountdownProgressBar initialTime={30} onTimeout={handleOrderTimeout} />
          <p>Time Remaining: {timeRemaining} seconds</p>
          <button onClick={handleAcceptOrder} disabled={timeRemaining === 0}>
            Accept Order
          </button>
          <button onClick={handleDeclineOrder} disabled={timeRemaining === 0}>
            Decline Order
          </button>
        </>
      )}
    </>
  )
}

export default GoOnline
