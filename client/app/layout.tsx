'use client'
import ThemeRegistry from '../Theme/ThemeRegistry'
import { GlobalStyles, styled } from '@mui/material'
import { layoutMaxWidth } from '../Theme/UtilityStyles'
import '../Theme/Fonts.css'
import Header from '../src/Components/Shared/Header/Header'
import Footer from '../src/Components/Shared/Footer/Footer'

const globalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      body: {
        margin: 0,
        padding: 0,
        backgroundColor: theme.palette.background.default,
        // color: colors.black,
        fontFamily: theme.typography.fontFamily,
        overflowX: 'hidden'
      },
      ul: {
        marginTop: 0,
        marginBottom: theme.spacing(4)
      },
      a: {
        fontWeight: 400
      },
      p: {
        margin: 0,
        fontWeight: 400
      },
      address: {
        fontStyle: 'normal',
        fontWeight: 400,
        display: 'flex',
        flexDirection: 'column',
        lineHeight: 1.6
      }
    })}
  />
)

const BodyContainer = styled('main')(({ theme }) => ({
  ...layoutMaxWidth,
  margin: '0 auto',
  padding: `0 ${theme.spacing(4)}`
}))

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: 'mui-theme' }}>
          {globalStyles}
          <Header />
          <BodyContainer>{children}</BodyContainer>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  )
}
