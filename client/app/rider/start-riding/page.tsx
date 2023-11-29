import { Typography } from '@mui/material'
import GoOnline from '../../../src/Components/Rider/GoOnline'

const StartRiding = () => {
  // TODO: Update this with logged in user.
  const riderName = 'Lewis'

  return (
    <>
      <Typography variant="h2">Ready to ride, {riderName} ?</Typography>
      <GoOnline />
    </>
  )
}

export default StartRiding
