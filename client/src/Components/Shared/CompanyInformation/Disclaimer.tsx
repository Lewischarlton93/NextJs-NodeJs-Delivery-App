import { Typography } from '@mui/material'
import React from 'react'

const Disclaimer: React.FC = () => {
  return (
    <>
      <Typography variant="body1" sx={{ color: '#b7b6b6' }}>
        Hey Hungry Explorer! Before you dive into your delectable delights, here's a pinch of
        playful wisdom: Our dishes are crafted with love, a sprinkle of magic, and a twist of
        whimsy. Brace yourself for potential flavor surprises and the occasional tap-dancing taco.
        Bon appétit and enjoy the delicious adventure
      </Typography>
      <Typography variant="body1" sx={{ color: '#b7b6b6' }}>
        By placing an order with Deliveroo, you agree to embark on this whimsical gastronomic
        journey with a spirit of joy and adventure. Remember, laughter is the best seasoning!
      </Typography>
    </>
  )
}

export default Disclaimer
