import React from 'react'
import GoOnline from './GoOnline'
import { useRiderStore } from '../../Stores/Rider/useRiderStore'
import DirectionsMap from '../Map/DirectionsMap'
import OrderReceived from './Order/OrderReceived'
import { styled } from '@mui/material'
import { colors } from '../../Theme/Theme'
import OrderAccepted from './Order/OrderAccepted'

const RiderStepActionsContainer = styled('div')(({ theme }) => ({
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

const Rider = () => {
  const { riderStep } = useRiderStore()

  // I vision this as controlling the state of the bottom part overlaying the map.
  const renderRiderStep = (): JSX.Element => {
    switch (riderStep) {
      case 'GO_ONLINE':
        return <GoOnline />
      case 'ORDER_RECEIVED':
        return <OrderReceived />
      case 'ORDER_ACCEPTED':
        return <OrderAccepted />
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
