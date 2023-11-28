'use client'
import Register from '../../../src/Components/Auth/Register'
import { Typography } from '@mui/material'

const RestaurantRegisterPage = () => {
  return (
    <>
      <Typography variant="h1">Register</Typography>
      <Register userType="Restaurant" existingAnswers={{}} />
    </>
  )
}

export default RestaurantRegisterPage
