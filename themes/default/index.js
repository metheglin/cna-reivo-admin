import React, {useState, useMemo, useContext, createContext} from 'react'
import { ThemeProvider as MuiThemeProvider, createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows'
import typography from './typography'
import darkScrollbar from '../../styles/darkScrollbar'

const ThemeContext = createContext({})

function getCookie(name) {
  if (typeof window === "undefined") return undefined
  const regex = new RegExp(`(?:(?:^|.*;*)${name}*=*([^;]*).*$)|^.*$`)
  return document.cookie.replace(regex, '$1')
}
function setCookie(value) {
  if (typeof window === "undefined") return undefined
  document.cookie = value
}

const lightPalette = {
  background: {
    dark: '#F4F6F8',
    default: colors.common.white,
    paper: colors.common.white
  },
  primary: {
    main: colors.blue[500]
  },
  secondary: {
    main: colors.red[500]
  },
  error: {
    main: '#e82856',
  },
  type: 'light',
  mode: 'light',
}
const darkPalette = {
  primary: {
    main: colors.blue[200]
  },
  secondary: {
    main: colors.red[200]
  },
  error: {
    main: '#f83161',
  },
  type: 'dark',
  mode: 'dark',
}

export function ThemeProvider({children}) {
  const [paletteType, setPaletteType] = useState(getCookie('paletteType') || 'dark')

  React.useEffect(() => {
    setCookie(`paletteType=${paletteType};path=/;max-age=31536000`)
  }, [paletteType])

  const theme = useMemo(()=>{
    const nextTheme = createMuiTheme({
      nprogress: {
        color: paletteType === 'light' ? '#000' : '#fff',
      },
      palette: paletteType === 'light' ? lightPalette : darkPalette,
      mixins: {
        toolbar: {
          minHeight: 48,
          paddingLeft: 16,
          paddingRight: 16,
        }
      }
    },{
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: paletteType === 'dark' ? darkScrollbar() : null,
          },
        },
      },
    }, shadows, typography)
    nextTheme.palette.background.level2 =
      paletteType === 'light' ? nextTheme.palette.grey[100] : '#424242'
    nextTheme.palette.background.level1 =
      paletteType === 'light' ? '#F4F6F8' : '#333'
    return nextTheme
  }, [paletteType])

  return (
    <ThemeContext.Provider value={{paletteType, setPaletteType}}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
