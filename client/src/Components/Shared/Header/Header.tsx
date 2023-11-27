import React from 'react'
import { styled } from '@mui/material'
import Link from 'next/link'
import { dFlexCenter, dFlexSpaceBetween, layoutMaxWidth } from '../../../Theme/UtilityStyles'
import Button from '@mui/material/Button'
import DeliverooLogo from '../Logo/DeliverooLogo'
// import NavBar from '../../UI/Nav/NavBar'

const DeliverooHeader = styled('header')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: `${theme.spacing(3)} 0 0`,
  paddingBottom: theme.spacing(4), // TODO: Remove this when navBar added back in!
  '& .header-top': {
    ...dFlexSpaceBetween,
    ...layoutMaxWidth,
    flex: 1
  },
  '& .right-col': {
    ...dFlexCenter,
    a: {
      ...dFlexCenter,
      textDecoration: 'none',
      color: theme.palette.primary.main
    }
  }
}))

const Header = () => {
  return (
    <DeliverooHeader>
      <div className="header-top">
        <div className="left-col">
          <DeliverooLogo />
        </div>
        <div className="right-col">
          <Button variant="outlined" sx={{ mr: (theme) => theme.spacing(2) }}>
            <Link href="/register">Sign up</Link>
          </Button>
          <Button variant="outlined" sx={{ mr: (theme) => theme.spacing(2) }}>
            Log in
          </Button>
          <Button variant="outlined">Account</Button>
        </div>
      </div>
      {/* <NavBar /> */}
    </DeliverooHeader>
  )
}

export default Header
