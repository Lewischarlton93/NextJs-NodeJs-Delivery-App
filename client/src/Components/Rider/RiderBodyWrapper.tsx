'use client'
import React from 'react'
import { styled } from '@mui/material'

const RiderBodyWrapperContainer = styled('div')(() => ({
  position: 'relative',
  minHeight: '85vh'
}))

interface RiderBodyWrapperProps {
  children: React.ReactNode
}

// Used to add position relative around the body, so that I can set the map to 100 view height,
// and overlay everything needed with position absolute
const RiderBodyWrapper: React.FC<RiderBodyWrapperProps> = ({ children }) => {
  return <RiderBodyWrapperContainer>{children}</RiderBodyWrapperContainer>
}

export default RiderBodyWrapper
