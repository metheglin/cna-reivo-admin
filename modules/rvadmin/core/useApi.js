import {useState} from 'react'
import {useSession} from './SessionProvider'
import useDeepCompareEffect from 'use-deep-compare-effect'

/*
 * const {isLoading, error, data, setData} = useApi('/articles', api=>api.fetch('/articles', {params: {offset: 12}}).then(res=>res.data))
 */
export function useApi(key, fn) {
  const {api} = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [data, setData] = useState()

  useDeepCompareEffect(()=>{
    setIsLoading(true)
    fn(api).then(x=>{
      setData(x)
      setIsLoading(false)
    }).catch(err=>{
      setError(err)
      setIsLoading(false)
    })
  }, [{key}])

  return {
    isLoading, error, data, setData
  }
}