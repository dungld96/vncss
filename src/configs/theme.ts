import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#8F0A0C',
    },
    error: {
      main: '#ec0e0e',
    },
  },
  typography: {
    fontFamily: 'inherit'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: 44,
          textTransform: 'initial',
        },
        sizeSmall: {
          height: 36,
          fontSize: 13,
        },
      },
    },
  },
})
