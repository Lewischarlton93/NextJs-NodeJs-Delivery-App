import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
      xs: true,
      sm: true,
      md: true,
      lg: true,
      xl: true,
      xxl: true,
      xxxl: true,
      x4k: true
    }
}

export const fonts = {
    medium: '"Montserrat Medium", sans-serif',
    regular: '"Montserrat Regular", sans-serif',
    bold: '"Montserrat Bold", sans-serif',
    light: '"Montserrat Light", sans-serif'
}

export const colors = {
    black: '#2E3333',
    grey: '#eee',
    greyDark1: '#444',
    white: '#FFF',
    teal: '#00CCBC',
    tealDark: '#00B8A9'
}

const Theme = createTheme({
    typography: {
        fontFamily: [
            fonts.regular,
            fonts.medium,
            fonts.bold,
            fonts.light
        ].join(',')
    },
    breakpoints: { 
        values: { 
            xs: 0,
            sm: 568,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1920,
            xxxl: 2560,
            x4k: 3840
        }
    },
    palette: {
        primary: {
            main: colors.teal,
            dark: colors.tealDark
        },
        background: {
            default: colors.white,
            paper: colors.black
        }
    },
    spacing: [0, 5, 10, 15, 20, 30, 40, 60, 70, 80], 
    components: {
        MuiButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: theme.palette.primary.main,
                    color: colors.white,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark
                    },
                    // Outlined Variant
                    '&.MuiButton-outlined': {
                        backgroundColor: colors.white,
                        color: theme.palette.primary.main
                    }
                })
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.white
                }
            }
        },
        MuiAccordion: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: colors.white,
                    boxShadow: 'unset',
                    borderTop: `1px solid ${colors.grey}`,
                    p: {
                        marginBottom: theme.spacing(3),
                        '&:first-of-type': {
                            marginTop: 0
                        }
                    },
                    li: {
                        marginBottom: theme.spacing(3)
                    },
                    '&.Mui-expanded': {
                        margin: 0
                    }
                })
            }
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root:  ({ theme }) => ({
                    p: {
                        fontSize: 16,
                        fontWeight: 600,
                        marginBottom: 0,
                        [theme.breakpoints.up('sm')]: {
                            fontSize: 18
                        }
                    }
                })
            }
        }
    }
})

// Typography styles
Theme.typography.h1 = {
    fontSize: 30,
    marginBottom: Theme.spacing(5),
    lineHeight: '34px',
    fontFamily: fonts.bold,
    [Theme.breakpoints.up('sm')]: {
        fontSize: 34,
        lineHeight: '38px'
    }
}
Theme.typography.h2 = {
    fontSize: 22,
    marginBottom: Theme.spacing(4),
    lineHeight: '32px',
    fontFamily: fonts.bold,
    [Theme.breakpoints.up('sm')]: {
        fontSize: 26,
        lineHeight: '36px'
    }
}
Theme.typography.h3 = {
    fontSize: 20,
    marginBottom: Theme.spacing(4),
    lineHeight: '30px',
    fontFamily: fonts.bold,
    [Theme.breakpoints.up('sm')]: {
        fontSize: 24,
        lineHeight: '34px'
    }
}
Theme.typography.h4 = {
    fontSize: 18,
    marginBottom: Theme.spacing(4),
    lineHeight: '28px',
    fontFamily: fonts.bold,
    [Theme.breakpoints.up('sm')]: {
        fontSize: 20,
        lineHeight: '30px'
    }
}
Theme.typography.body1 = {
    marginBottom: Theme.spacing(4),
    fontFamily: fonts.regular
}
Theme.typography.body2 = {
    marginBottom: Theme.spacing(4),
    fontFamily: fonts.regular,
    fontSize: 14
}

export default Theme