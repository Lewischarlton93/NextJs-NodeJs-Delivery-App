import React from 'react'
import GoOnline from './GoOnline'
import { useRiderStore } from '../../Stores/Rider/useRiderStore'
import DirectionsMap from '../Map/DirectionsMap'
import OrderReceived from './Order/OrderReceived'
import { styled } from '@mui/material'
import { colors } from '../../Theme/Theme'
import OrderActions from './Order/OrderActions'
import OrderDetailsById from '../Orders/OrderDetails/OrderDetailsById'

const RiderStepActionsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(4),
  width: '100%',
  backgroundColor: colors.white,
  flexDirection: 'column',
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

const Rider = () => {
  const { riderStep } = useRiderStore()

  const renderRiderStep = (): JSX.Element => {
    switch (riderStep) {
      case 'GO_ONLINE':
        return <GoOnline />
      case 'ORDER_RECEIVED':
        return <OrderReceived />
      case 'ORDER_ACCEPTED':
        return <OrderActions travelingTo="Restaurant" />
      case 'ORDER_COLLECTED':
        return <OrderDetailsById orderId={1} />
      case 'ORDER_DELIVERED':
        return <p>TODO: DELIVERED COMPONENT</p>
      default:
        return <GoOnline />
    }
  }

  return (
    <>
      <DirectionsMap />
      <RiderStepActionsContainer>{renderRiderStep()}</RiderStepActionsContainer>
    </>
  )
}

export default Rider
