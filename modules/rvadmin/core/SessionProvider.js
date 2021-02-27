import React, {useState, useEffect, useCallback, useContext, createContext} from 'react'
import {useRouter} from 'next/router'
import AccessToken from '@modules/rvadmin/utils/AccessToken'

const SessionContext = createContext({})

export default function SessionProvider({children}) {
  const router = useRouter()
  const [component, setComponent] = useState()

  const renderContainer = useCallback((accessToken) => {
    const {status} = accessToken
    if (status === 'authorized') {
      if (router.asPath.startsWith('/un/signin')) {
        router.push('/')
        return
      }
      return (<React.Fragment>{children}</React.Fragment>)
    } else if (status === 'authenticated') {
      if (router.asPath.startsWith('/att/')) {
        return (<React.Fragment>{children}</React.Fragment>)
      } else {
        router.push('/att/permissions')
        return
      }
    } else { // logout
      if (router.asPath.startsWith('/un/')) {
        return (<React.Fragment>{children}</React.Fragment>)
      } else {
        router.push('/un/signin')
        return
      }
    }
  }, [router])

  useEffect(()=>{
    setComponent(renderContainer(AccessToken))
  }, [router])
  
  return (
    <SessionContext.Provider
      value={{
        testa: 123,
        testb: 456,
      }}>
      {component}
    </SessionContext.Provider>
  )
}

export const useSession = () => useContext(SessionContext)
