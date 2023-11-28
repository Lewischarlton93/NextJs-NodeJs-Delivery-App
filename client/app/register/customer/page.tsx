'use client'
import Register from '../../../src/Components/Auth/Register'
import { Typography } from '@mui/material'

const CustomerRegisterPage = () => {
  return (
    <>
      <Typography variant="h1">Register</Typography>
      <Register userType="Customer" existingAnswers={{}} />
    </>
  )
}

export default CustomerRegisterPage
