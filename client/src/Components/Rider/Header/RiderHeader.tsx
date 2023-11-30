'use client'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { dFlexSpaceBetween } from '../../../Theme/UtilityStyles'
import { Typography, styled, Button } from '@mui/material'
import { colors } from '../../../Theme/Theme'

const RiderHeaderContainer = styled('div')(({ theme }) => ({
  ...dFlexSpaceBetween,
  padding: `${theme.spacing(4)} 0`
}))

const RiderHeader = () => {
  return (
    <RiderHeaderContainer>
      <MenuIcon sx={{ color: (theme) => theme.palette.primary.main }} />
      <Typography variant="body1" sx={{ mb: 0, fontWeight: 600 }}>
        New Order!
      </Typography>
      <Button variant="text" sx={{ color: colors.errorRed }}>
        Reject
      </Button>
    </RiderHeaderContainer>
  )
}

export default RiderHeader
