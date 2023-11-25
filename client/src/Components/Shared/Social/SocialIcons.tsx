import { styled } from '@mui/material'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link'
import YouTubeIcon from '@mui/icons-material/YouTube'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { dFlexCenter } from '../../../../Theme/UtilityStyles'
import { colors } from '../../../../Theme/Theme'

const socialIconData = [
  {
    name: 'Facebook',
    icon: <FacebookIcon aria-labelledby="Facebook" />,
    link: 'https://www.facebook.com/deliver'
  },
  {
    name: 'Twitter',
    icon: <TwitterIcon aria-labelledby="Twitter" />,
    link: 'https://www.twitter.com/deliveroo'
  },
  {
    name: 'LinkedIn',
    icon: <LinkedInIcon aria-labelledby="LinkedIn" />,
    link: 'https://www.linkedin.com/company/deliveroo'
  },
  {
    name: 'Youtube',
    icon: <YouTubeIcon aria-labelledby="Youtube" />,
    link: 'https://www.youtube.com/deliveroo'
  }
]

const SocialIconsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  '& .icon-wrapper': {
    ...dFlexCenter,
    boxShadow: 'inset 0 0 0 1px #d6d6d6',
    width: 35,
    height: 35,
    borderRadius: '100%'
  },
  a: {
    marginRight: theme.spacing(3)
  },
  svg: {
    color: colors.white
  }
}))

const SocialIcons = () => {
  return (
    <SocialIconsWrapper>
      {socialIconData.map((item) => (
        <Link href={item.link} key={uuidv4()} target="_blank" aria-label={item.name}>
          <div className="icon-wrapper">{item.icon}</div>
        </Link>
      ))}
    </SocialIconsWrapper>
  )
}

export default SocialIcons
