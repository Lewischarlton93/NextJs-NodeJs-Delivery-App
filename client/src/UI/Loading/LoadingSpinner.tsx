'use client'
import { styled } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { dFlexCenter } from '../../Theme/UtilityStyles'

interface LoadingSpinnerProps {
  containerHeight?: string
}

const LoadingSpinnerContainer = styled('div')(({ theme }) => ({
  ...dFlexCenter
}))

/* Pass containerHeight in to center loading spinner */
const LoadingSpinner = ({ containerHeight }: LoadingSpinnerProps) => {
  return (
    <LoadingSpinnerContainer sx={{ height: containerHeight }}>
      <CircularProgress />
    </LoadingSpinnerContainer>
  )
}

export default LoadingSpinner
