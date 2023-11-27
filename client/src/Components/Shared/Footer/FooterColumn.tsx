import { Typography, styled } from '@mui/material'
import React, { ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { colors } from '../../../Theme/Theme'
import Link from 'next/link'

interface FooterColumnProps {
  title: string
  links: {
    text: string
    url: string
  }[]
  children?: ReactNode
}

const FooterCol = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexBasis: '50%',
  [theme.breakpoints.up('md')]: {
    flexBasis: '25%'
  },
  ul: {
    padding: `0 ${theme.spacing(2)} 0 0`,
    li: {
      listStyle: 'none',
      padding: `${theme.spacing(2)} 0`,
      a: {
        textDecoration: 'none',
        color: colors.white
      }
    }
  }
}))

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links, children }) => {
  return (
    <FooterCol>
      <Typography variant="h4" sx={{ color: colors.white }}>
        {title}
      </Typography>
      <ul>
        {links.map((link) => (
          <li key={uuidv4()}>
            <Link href={link.url}>{link.text}</Link>
          </li>
        ))}
      </ul>
      {children}
    </FooterCol>
  )
}

export default FooterColumn
