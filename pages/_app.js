import {ThemeProvider} from '@material-ui/core'
import FlashProvider from 'modules/rvadmin/core/FlashProvider'
import SessionProvider from 'modules/rvadmin/core/SessionProvider'
import theme from '@themes/default'
import GlobalStyles from '../styles/GlobalStyles'
import {QueryClient, QueryClientProvider} from 'react-query'
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
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
