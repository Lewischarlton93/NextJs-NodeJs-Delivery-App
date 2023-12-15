import { Button, Typography } from '@mui/material'
import { useRiderStore } from '../../../Stores/Rider/useRiderStore'
import { useEffect, useRef, useState } from 'react'
import { assignOrderToRider } from '../../../Utils/Rider/RiderUtils'
import { newOrder, onlineRiders } from '../../../__test__/MockData'

const OrderDelivered = () => {
  const { updateRiderInfo } = useRiderStore()
  const hasEffectRun = useRef(false)
  const [findNewOrder, setFindNewOrder] = useState(false)

  useEffect(() => {
    // We want to make sure that the amount only updates once. (re-renders would cause additional calls)
    if (!hasEffectRun.current) {
      updateRiderInfo({ earned: 10.5, delivered: 1 })
      hasEffectRun.current = true
    }
  }, [])

  const handleNextOrder = () => {
    setFindNewOrder(true)
    setTimeout(() => {
      assignOrderToRider(newOrder, onlineRiders)
      updateRiderInfo({ riderStep: 'ORDER_RECEIVED' })
    }, 5000)
  }

  return (
    <>
      <Typography variant="h3">
        {findNewOrder ? 'Finding new order...' : 'Order Complete'}
      </Typography>
      <Button variant="contained" onClick={handleNextOrder}>
        Find next order
      </Button>
    </>
  )
}

export default OrderDelivered
