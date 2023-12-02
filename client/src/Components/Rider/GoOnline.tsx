'use client'
import { Typography, styled, Button } from '@mui/material'
import { colors } from '../../Theme/Theme'
import React, { useState, useEffect } from 'react'
import { assignOrderToRider } from '../../Utils/Rider/RiderUtils'
import { newOrder, onlineRiders } from '../../__test__/MockData'
import OrderDetailsById from '../Orders/OrderDetails/OrderDetailsById'
import useCountdownTimer from '../../Hooks/useCountdownTimer'
import CountdownProgressBar from '../../UI/ProgressBar/CountdownProgressBar'
import StorefrontIcon from '@mui/icons-material/Storefront'
import PersonIcon from '@mui/icons-material/Person'
import Directions from '../../Services/External/Google/Directions'

const mockRiderData = {
  name: 'Lewis Charlton',
  address: 'Unit 17, Grand Junction Retail Park, Crewe CW1 2RP'
}

const mockRestaurantData = {
  name: "McDonald's",
  address: '100 Dunwoody Way, Crewe CW1 3AW'
}

const mockCustomerData = {
  name: 'John Smith',
  address: '21 Lyceum Close, Leighton, Crewe, CW1 3YB'
}

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
  minHeight: '100px',
  maxHeight: '100px',
  zIndex: 10,
  borderTop: `1px solid ${colors.grey}`,
  h2: {
    marginRight: theme.spacing(4),
    marginBottom: 0,
    fontSize: 14,
    [theme.breakpoints.up('md')]: {
      fontSize: 20
    }
  }
}))

const OrderDetailsContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: '75px',
  backgroundColor: colors.white,
  minHeight: '200px',
  maxHeight: '200px',
  overflowY: 'scroll',
  width: '100%',
  padding: theme.spacing(4),
  zIndex: 11,
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
  position: 'absolute',
  bottom: 0,
  minHeight: '75px',
  padding: theme.spacing(4),
  backgroundColor: colors.white,
  zIndex: 20,
  width: '100%'
}))

const GoOnline = () => {
  const [isOnline, setIsOnline] = useState(false)
  const [waitingForOrder, setWaitingForOrder] = useState(true)

  // TODO: Seperate component for these.
  const [distanceToRestaurant, setDistanceToRestaurant] = useState<number>()
  const [distanceToCustomer, setDistanceToCustomer] = useState<number>()
  const [totalDistance, setTotalDistance] = useState<number>()
  const [durationToRestaurant, setDurationToRestaurant] = useState<number>()
  const [durationToCustomer, setDurationToCustomer] = useState<number>()
  const [totalDuration, setTotalDuration] = useState<number>()

  useEffect(() => {
    const fetchDistances = async () => {
      try {
        const riderToRestaurant = await Directions(
          mockRiderData.address,
          mockRestaurantData.address,
          'bicycling'
        )
        setDistanceToRestaurant(riderToRestaurant.distance)
        setDurationToRestaurant(riderToRestaurant.duration)

        const customerToRestaurant = await Directions(
          mockCustomerData.address,
          mockRestaurantData.address,
          'bicycling'
        )
        setDistanceToCustomer(customerToRestaurant.distance)
        setDurationToCustomer(customerToRestaurant.duration)
      } catch (error) {
        console.error('Error Fetching Directions Data:', error)
      }
    }

    fetchDistances()
  }, [])

  useEffect(() => {
    // Calculate total distance when both distances are available
    if (distanceToRestaurant !== undefined && distanceToCustomer !== undefined) {
      setTotalDistance(distanceToRestaurant + distanceToCustomer)
    }
  }, [distanceToRestaurant, distanceToCustomer])

  useEffect(() => {
    // Calculate total duration when both durations are available
    if (durationToRestaurant !== undefined && durationToCustomer !== undefined) {
      setTotalDuration(durationToRestaurant + durationToCustomer)
    }
  }, [durationToRestaurant, durationToCustomer])

  // TODO: This actually appears once they have arrived at the restaurant.
  // const showAssignedOrder = () => {
  //   return <OrderDetailsById orderId={1} />
  // }

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

  // TODO: Set this back to 30 when done adding styling.
  const { timeRemaining, resetTimer } = useCountdownTimer(300000, handleOrderTimeout)

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
        <Button onClick={handleUpdateOnlineStatus} variant="contained">
          {isOnline ? 'Go Offline' : 'Go Online'}
        </Button>
      </GoOnlineWrapper>
      {/* TODO: Revisit logic here! */}
      {isOnline && !waitingForOrder && (
        <>
          <CountdownProgressBar
            initialTime={300000}
            onTimeout={handleOrderTimeout}
            styleOverrides={{ position: 'absolute', bottom: '275px', zIndex: 15 }}
          />
          <OrderDetailsContainer>
            {/* {showAssignedOrder()} */}
            {/* <Button onClick={handleDeclineOrder} disabled={timeRemaining === 0}>
              Decline Order
            </Button> */}
            <div className="restaurant-details">
              <div>
                <StorefrontIcon />
              </div>
              <div>
                <Typography variant="body1">{mockRestaurantData.name}</Typography>
                <Typography variant="body1">{mockRestaurantData.address}</Typography>
              </div>
            </div>
            <div className="customer-details">
              <div>
                <PersonIcon />
              </div>
              <div>
                <Typography variant="body1">{mockCustomerData.name}</Typography>
                <Typography variant="body1">{mockCustomerData.address}</Typography>
              </div>
            </div>
            {/* Move into seperate component */}
            <div className="distance-to-travel">
              {/* TODO: Just use Directions API for this? */}
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
              // disabled={timeRemaining === 0}
              variant="contained"
              sx={{
                width: '100%'
              }}
            >
              Accept and Go
            </Button>
          </ActionsContainer>
        </>
      )}
    </>
  )
}

export default GoOnline
