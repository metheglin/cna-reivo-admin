import React, {useState, useMemo, useContext, createContext} from 'react'
import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
  createTheme,
  colors,
} from '@mui/material'
import darkScrollbar from './darkScrollbar'

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
  type: 'light',
  mode: 'light',
}
const darkPalette = {
  type: 'dark',
  mode: 'dark',
}

export function ThemeProvider({children}) {
  const [paletteType, setPaletteType] = useState(getCookie('paletteType') || 'dark')

  React.useEffect(() => {
    setCookie(`paletteType=${paletteType};path=/;max-age=31536000`)
  }, [paletteType])

  const theme = useMemo(()=>{
    const nextTheme = createTheme({
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
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: paletteType === 'dark' ? darkScrollbar() : null,
          },
        },
      }
    })
    return nextTheme
  }, [paletteType])

  return (
    <ThemeContext.Provider value={{paletteType, setPaletteType}}>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          {children}
        </MuiThemeProvider>
      </StyledEngineProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext)
