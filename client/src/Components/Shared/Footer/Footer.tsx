import { styled } from '@mui/material'
import { layoutMaxWidth } from '../../../../Theme/UtilityStyles'
import FooterColumn from './FooterColumn'
import SocialIcons from '../Social/SocialIcons'
import Disclaimer from '../CompanyInformation/Disclaimer'

const companyLinks = [
  { text: 'About Deliveroo', url: '/about-deliveroo/' },
  { text: 'Contact us', url: '/contact-us/' },
  { text: 'Careers', url: '/careers/' },
  { text: 'Newsroom', url: '/news-room/' },
  { text: 'Restaurant Signup', url: '/news-room/' },
  { text: 'Become a rider', url: '/news-room/' }
]
const legalLinks = [
  { text: 'Terms & conditions', url: '/terms-and-conditions/' },
  { text: 'Privacy', url: '/privacy/' },
  { text: 'Cookies', url: '/cookies/' },
  { text: 'Sitemap', url: '/sitemap/' },
  { text: 'Modern Slavery Statement', url: '/mss/' }
]

const DeliverooFooter = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: `${theme.spacing(5)} ${theme.spacing(0)} ${theme.spacing(5)}`,
  marginTop: theme.spacing(6),
  '& .footer': {
    '&__inner': {
      ...layoutMaxWidth
    },
    '&__links': {
      display: 'flex'
    },
    '&__social-media': {
      margin: `${theme.spacing(5)} 0`
    }
  }
}))

const Footer = () => {
  return (
    <DeliverooFooter>
      <div className="footer__inner">
        <div className="footer__links">
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
        </div>
        <div className="footer__social-media">
          <SocialIcons />
        </div>
        <div className="footer__disclaimer">
          <Disclaimer />
        </div>
      </div>
    </DeliverooFooter>
  )
}

export default Footer
