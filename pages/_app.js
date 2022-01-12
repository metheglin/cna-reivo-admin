import {useState, useEffect, useCallback} from 'react'
import FlashProvider from 'modules/rvadmin/core/FlashProvider'
import SessionProvider from 'modules/rvadmin/core/SessionProvider'
import {ThemeProvider} from '@themes/default'
import {CssBaseline} from '@mui/material'
import GlobalStyles from 'themes/default/GlobalStyles'
import {ErrorLayout} from 'components/layouts'
import {QueryClient, QueryClientProvider} from 'react-query'
const queryClient = new QueryClient()
import i18n from 'modules/i18n'

import {resolveDynamicRoute} from 'modules/next-ext/ext'

function MyApp(props) {
  const {pageProps, router, Component} = props
  const [status, setStatus] = useState()

  useEffect(async () => {
    // console.log('out router.route', router.route, router.asPath)
    const pages = await router.pageLoader.getPageList()
    // console.log('pages', pages)
    // const parsed = router.resolveDynamicRoute({pathname: router.asPath}, pages)
    // const parsed = parseRelativeUrl(router.asPath)
    const parsedPathname = resolveDynamicRoute({pathname: router.asPath, pages})
    // console.log('parsed', parsedPathname)
    if (typeof window !== 'undefined') {
      router.fetchComponent(parsedPathname).then(res=>{
        // console.log('fetch success', res)
        // console.log('router asPath', router.asPath)
        router.replace(window.location.href)
        setStatus('ok')
      }).catch(err=>{
        // console.log('err:', err)
        setStatus('error')
      })
    }
  }, [])

  if (status === 'ok') {
    return (<MyAppInner {...props} />)
  } else if (status === 'error') {
    return (<MyAppNotFound />)
  } else {
    return null
  }
}

export default MyApp

function MyAppInner({Component, pageProps, router}) {
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

function MyAppNotFound() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <GlobalStyles />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <ErrorLayout title="アクセスできません">
        ページが見つかりません
      </ErrorLayout>
    </ThemeProvider>
  )
}

