import { useEffect, useState } from 'react'

interface CountdownTimerHook {
  timeRemaining: number
  resetTimer: () => void
}

const useCountdownTimer = (initialTime: number, onTimeout: () => void): CountdownTimerHook => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime)

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout

    if (timeRemaining > 0) {
      countdownInterval = setInterval(() => {
        setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime))
      }, 1000)
    } else {
      onTimeout() // Trigger the timeout logic when time runs out
    }

    return () => {
      clearInterval(countdownInterval)
    }
  }, [timeRemaining, onTimeout])

  const resetTimer = () => {
    setTimeRemaining(initialTime)
  }

  return { timeRemaining, resetTimer }
}

export default useCountdownTimer
