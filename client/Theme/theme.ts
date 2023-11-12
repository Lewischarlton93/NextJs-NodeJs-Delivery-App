import { createTheme } from '@mui/material/styles'

const colors = {
    black: '#2E3333',
    white: '#FFF',
    teal: '#00CCBC',
    tealDark: '#00B8A9'
}

const theme = createTheme({
    palette: {
        primary: {
            main: colors.teal,
            dark: colors.tealDark
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.teal,
                    color: colors.white,
                    '&:hover': {
                        backgroundColor: colors.tealDark
                    }
                }
            }
        }
    }
})

export default theme
