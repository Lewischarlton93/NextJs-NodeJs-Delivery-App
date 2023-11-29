'use client'
import React, { useState, useEffect } from 'react'
import { assignOrderToRider } from '../../../src/Utils/Rider/RiderUtils'
import OrderDetailsById from '../../../src/Components/Orders/OrderDetails/OrderDetailsById'
import { newOrder, onlineRiders } from '../../../src/__test__/MockData'

const AwaitingOrder = () => {
  const [waitingForOrder, setWaitingForOrder] = useState(true)

  const showAssignedOrder = () => {
    return <OrderDetailsById orderId={1} />
  }

  useEffect(() => {
    // Simulate the process of assigning an order after 5 seconds - TODO: Will be changing once customer order part is added!
    const assignmentTimeout = setTimeout(() => {
      setWaitingForOrder(false)
      assignOrderToRider(newOrder, onlineRiders)
    }, 5000)

    return () => {
      clearTimeout(assignmentTimeout)
    }
  }, [])

  return <>{waitingForOrder ? <p>Waiting for orders!</p> : showAssignedOrder()}</>
}

export default AwaitingOrder
