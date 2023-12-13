'use client'
import React, { useState, useEffect } from 'react'
import { Typography, styled, Button } from '@mui/material'
import StorefrontIcon from '@mui/icons-material/Storefront'
import PersonIcon from '@mui/icons-material/Person'
import { colors } from '../../../Theme/Theme'
import Directions from '../../../Services/External/Google/Directions'
import { useRiderStore } from '../../../Stores/Rider/useRiderStore'
import CountdownProgressBar from '../../../UI/ProgressBar/CountdownProgressBar'
import { useRestaurantStore } from '../../../Stores/Restaurant/useRestaurantStore'
import { useCustomerStore } from '../../../Stores/Customer/useCustomerStore'

const OrderDetailsContainer = styled('div')(({ theme }) => ({
  backgroundColor: colors.white,
  width: '100%',
  padding: theme.spacing(4),
  '& .restaurant-details, .customer-details': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    '& .MuiTypography-body1': {
      marginBottom: 0
    },
    svg: {
      marginRight: theme.spacing(2)
    }
  },
  '& .distance-to-travel': {
    '& .MuiTypography-body1': {
      marginBottom: 0
    },
    div: {
      marginBottom: theme.spacing(2)
    }
  }
}))

const ActionsContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: colors.white,
  width: '100%'
}))

const OrderReceived = () => {
  const [distanceToRestaurant, setDistanceToRestaurant] = useState<number>()
  const [distanceToCustomer, setDistanceToCustomer] = useState<number>()
  const [totalDistance, setTotalDistance] = useState<number>()
  const [durationToRestaurant, setDurationToRestaurant] = useState<number>()
  const [durationToCustomer, setDurationToCustomer] = useState<number>()
  const [totalDuration, setTotalDuration] = useState<number>()
  const { riderLocationAddress, riderTravelType, updateRiderInfo } = useRiderStore()
  const { restaurantAddress, restaurantName } = useRestaurantStore()
  const { customerLocationAddress, customerName } = useCustomerStore()

  useEffect(() => {
    const fetchDistances = async () => {
      try {
        const riderToRestaurant = await Directions(
          riderLocationAddress,
          restaurantAddress,
          riderTravelType
        )
        setDistanceToRestaurant(riderToRestaurant.distance)
        setDurationToRestaurant(riderToRestaurant.duration)

        const customerToRestaurant = await Directions(
          customerLocationAddress,
          restaurantAddress,
          riderTravelType
        )
        setDistanceToCustomer(customerToRestaurant.distance)
        setDurationToCustomer(customerToRestaurant.duration)
      } catch (error) {
        console.error('Error Fetching Directions Data:', error)
      }
    }

    fetchDistances()
  }, [])

  // Distance
  useEffect(() => {
    // Calculate total distance when both distances are available
    if (distanceToRestaurant !== undefined && distanceToCustomer !== undefined) {
      setTotalDistance(distanceToRestaurant + distanceToCustomer)
    }
  }, [distanceToRestaurant, distanceToCustomer])

  // Duration
  useEffect(() => {
    // Calculate total duration when both durations are available
    if (durationToRestaurant !== undefined && durationToCustomer !== undefined) {
      setTotalDuration(durationToRestaurant + durationToCustomer)
    }
  }, [durationToRestaurant, durationToCustomer])

  const handleAcceptOrder = () => {
    updateRiderInfo({ riderStep: 'ORDER_ACCEPTED' })
  }

  const handleOrderTimeout = () => {
    updateRiderInfo({ riderStep: 'GO_ONLINE' })
  }

  return (
    <>
      <CountdownProgressBar initialTime={30} onTimeout={handleOrderTimeout} />
      <OrderDetailsContainer>
        {/* TODO: Component for these + Map over array of objects data. */}
        <div className="restaurant-details">
          <div>
            <StorefrontIcon />
          </div>
          <div>
            <Typography variant="body1">{restaurantName}</Typography>
            <Typography variant="body1">{restaurantAddress}</Typography>
          </div>
        </div>
        <div className="customer-details">
          <div>
            <PersonIcon />
          </div>
          <div>
            <Typography variant="body1">{customerName}</Typography>
            <Typography variant="body1">{customerLocationAddress}</Typography>
          </div>
        </div>
        {/* TODO: Component for these + Map over array of objects data. */}
        <div className="distance-to-travel">
          <div>
            <Typography variant="subHeading">Distance to Restaurant:</Typography>
            <Typography variant="body1">{distanceToRestaurant} km</Typography>
          </div>
          <div>
            <Typography variant="subHeading">Distance From Restaurant To Customer:</Typography>
            <Typography variant="body1">{distanceToCustomer} km</Typography>
          </div>
          <div>
            <Typography variant="subHeading">Total Distance to Travel:</Typography>
            <Typography variant="body1">{totalDistance} km</Typography>
          </div>
          <div>
            <Typography variant="subHeading">Approx. Travel time:</Typography>
            <Typography variant="body1">{totalDuration} Minutes</Typography>
          </div>
        </div>
      </OrderDetailsContainer>
      <ActionsContainer>
        <Button
          onClick={handleAcceptOrder}
          variant="contained"
          sx={{
            width: '100%'
          }}
        >
          Accept and Go
        </Button>
      </ActionsContainer>
    </>
  )
}

export default OrderReceived
