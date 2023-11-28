import React from 'react'
import { styled, SxProps, Typography } from '@mui/material'
import { colors } from '../../Theme/Theme'

export type ErrorProps = {
  error: string
  styleOverrides?: SxProps
}

const Div = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
  p: {
    color: colors.errorRed
  }
}))

const ErrorMessage = ({ error, styleOverrides }: ErrorProps): JSX.Element => (
  <>
    <Div sx={{ ...styleOverrides }} data-testid="error-msg">
      <Typography variant="body1">{error}</Typography>
    </Div>
  </>
)

export default ErrorMessage
