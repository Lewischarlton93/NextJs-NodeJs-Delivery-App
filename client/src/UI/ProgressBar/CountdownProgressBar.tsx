import React, { useEffect, useState } from 'react'
import { styled, Theme } from '@mui/system'
import { colors } from '../../Theme/Theme'

interface CountdownProgressBarProps {
  initialTime: number
  onTimeout: () => void
}

const CountdownProgressBarContainer = styled('div')(({ theme }: { theme: Theme }) => ({
  width: '100%',
  height: theme.spacing(2),
  backgroundColor: colors.grey,
  position: 'relative'
}))

const CountdownProgressBarInner = styled('div')(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.primary.light,
  height: '100%',
  position: 'absolute'
}))

const CountdownProgressBar: React.FC<CountdownProgressBarProps> = ({ initialTime, onTimeout }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTime)

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1)
      }, 1000)
    } else {
      onTimeout()
    }

    return () => clearInterval(intervalId)
  }, [timeRemaining, onTimeout])

  const percentage: number = (timeRemaining / initialTime) * 100

  return (
    <CountdownProgressBarContainer>
      <CountdownProgressBarInner
        sx={{
          width: `${percentage}%`
        }}
      />
    </CountdownProgressBarContainer>
  )
}

export default CountdownProgressBar
