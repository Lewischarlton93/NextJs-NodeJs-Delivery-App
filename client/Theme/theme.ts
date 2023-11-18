import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
      xs: true,
      sm: true,
      md: true,
      lg: true,
      xl: true,
      xxl: true
    }
}

const colors = {
    black: '#2E3333',
    white: '#FFF',
    teal: '#00CCBC',
    tealDark: '#00B8A9'
}

const theme = createTheme({
    breakpoints: { 
        values: { 
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1440,
            xxl: 1920
        }
    },
    palette: {
        primary: {
            main: colors.teal,
            dark: colors.tealDark
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: theme.palette.primary.main,
                    color: colors.white,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark
                    }
                })
            }
        }
    }
})

export default theme
