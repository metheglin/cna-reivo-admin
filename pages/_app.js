import FlashProvider from 'modules/rvadmin/core/FlashProvider'
import SessionProvider from 'modules/rvadmin/core/SessionProvider'
import {ThemeProvider} from '@themes/default'
import {CssBaseline} from '@material-ui/core'
import GlobalStyles from '../styles/GlobalStyles'
import {QueryClient, QueryClientProvider} from 'react-query'
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <CssBaseline />
      <GlobalStyles />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <QueryClientProvider client={queryClient}>
        <FlashProvider>
          <SessionProvider>
            <Component {...pageProps} />
          </SessionProvider>
        </FlashProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default MyApp
