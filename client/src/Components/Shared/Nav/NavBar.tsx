'use client'
import { styled } from '@mui/material'
import { dFlexSpaceBetween } from '../../../../Theme/UtilityStyles'

const NavBarContainer = styled('div')({
  ...dFlexSpaceBetween,
  padding: 10,
  borderBottom: '1px solid rgba(0,0,0,.08)',
  '& .nav-buttons': {
    backgroundColor: 'red'
  }
})

const NavBar = () => {
  return (
    <NavBarContainer>
      <div className="nav-logo">Logo</div>
      <div className="nav-buttons">Buttons</div>
    </NavBarContainer>
  )
}

export default NavBar
