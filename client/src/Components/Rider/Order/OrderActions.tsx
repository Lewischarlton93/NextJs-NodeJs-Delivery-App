import { useEffect, useState } from 'react'
import { useRiderStore } from '../../../Stores/Rider/useRiderStore'
import { useRestaurantStore } from '../../../Stores/Restaurant/useRestaurantStore'
import Directions from '../../../Services/External/Google/Directions'
import { Button } from '@mui/material'
import { useCustomerStore } from '../../../Stores/Customer/useCustomerStore'

interface OrderActionsProps {
  travelingTo: 'Restaurant' | 'Customer'
}

const OrderActions: React.FC<OrderActionsProps> = ({ travelingTo }) => {
  const [distanceToLocation, setDistanceToLocation] = useState('')
  const { riderLocationAddress, riderTravelType, updateRiderInfo } = useRiderStore()
  const { restaurantAddress } = useRestaurantStore()
  const { customerLocationAddress } = useCustomerStore()

  useEffect(() => {
    const fetchDistances = async () => {
      try {
        const distToLocation = await Directions(
          riderLocationAddress,
          travelingTo === 'Restaurant' ? restaurantAddress : customerLocationAddress,
          riderTravelType
        )
        setDistanceToLocation(distToLocation.distanceText)
      } catch (error) {
        console.error('Error Fetching Directions Data:', error)
      }
    }

    fetchDistances()
  }, [])

  const handleArrivedAtLocation = () => {
    // TODO: Some more thought needs to go into this, e.g. button disabled until rider is near the desired destination before
    // they can click on the button.

    if (travelingTo === 'Restaurant') {
      updateRiderInfo({ riderStep: 'ORDER_COLLECTED' })
    }
  }

  return (
    <Button variant="contained" onClick={handleArrivedAtLocation}>
      Travel {distanceToLocation} to {travelingTo}
    </Button>
  )
}

export default OrderActions
