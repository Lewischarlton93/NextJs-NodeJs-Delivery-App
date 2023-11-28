'use client'
import Register from '../../../src/Components/Auth/Register'
import { Typography } from '@mui/material'

const RiderRegisterPage = () => {
  return (
    <>
      <Typography variant="h1">Register</Typography>
      <Register userType="Rider" existingAnswers={{}} />
    </>
  )
}

export default RiderRegisterPage
