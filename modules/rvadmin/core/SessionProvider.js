import {Fragment, useState, useEffect, useCallback, useContext, createContext} from 'react'
import {useRouter} from 'next/router'
import AccessToken from '@modules/rvadmin/utils/AccessToken'
import {useFlash} from 'modules/rvadmin/core/FlashProvider'
import Api from 'modules/rvadmin/utils/Api'
import Link from 'components/Link'
import {ErrorLayout} from 'components/layouts'

const SessionContext = createContext({})

export default function SessionProvider({children}) {
  const router = useRouter()
  const {handleApiError, enqueueSnackbar, enqueuePermanentError} = useFlash()
  const [component, setComponent] = useState()

  const renderContainer = useCallback((accessToken) => {
    const {status} = accessToken
    if (status === 'authorized') {
      if (router.asPath.startsWith('/un/signin')) {
        router.push('/')
        return
      }
      return (<Fragment>{children}</Fragment>)
    } else if (status === 'authenticated') {
      if (router.asPath === '/') {
        router.push('/att/permissions')
        return
      }
      if (router.asPath.startsWith('/att/')) {
        return (<Fragment>{children}</Fragment>)
      } else {
        return (
          <ErrorLayout title="アクセスできません">
            <Link href='/att/permissions'>アカウントを選択してください</Link>
          </ErrorLayout>
        )
      }
    } else { // logout
      if (router.asPath === '/') {
        router.push('/un/signin')
        return
      }
      if (router.asPath.startsWith('/un/')) {
        return (<Fragment>{children}</Fragment>)
      } else {
        return (
          <ErrorLayout title="アクセスできません">
            <Link href='/un/signin'>ログインしてください</Link>
          </ErrorLayout>
        )
      }
    }
  }, [router])

  useEffect(()=>{
    setComponent(renderContainer(AccessToken))
  }, [router])
  
  return (
    <SessionContext.Provider
      value={{
        get token() {return AccessToken},
        get payload() {return AccessToken.data || {}},
        setToken(token) {AccessToken.setToken(token)},
        logout() {
          AccessToken.destroy()
          router.push('/un/signin')
        },
        get api() {
          return Api.json({token: AccessToken.token, handleApiError})
        },
        get apiRaw() {
          return Api.raw({token: AccessToken.token, handleApiError})
        },
        enqueueSnackbar, enqueuePermanentError,
      }}>
      {component}
    </SessionContext.Provider>
  )
}

export const useSession = () => useContext(SessionContext)
