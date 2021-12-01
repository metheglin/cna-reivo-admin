import {useState,useEffect} from 'react'
import {useSession} from 'modules/rvadmin/core/SessionProvider'

const useAssets = ({baseQuery}) => {
  const {api} = useSession()
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const addItem = (item) => setItems(x => [item, ...x])
  const params = baseQuery || {}

  useEffect(()=>{
    setLoading(true)
    api.fetch('/assets', {params}).then(res=>{
      setItems(res.data)
      setLoading(false)
    }).catch(error=>setLoading(false))
  }, [])

  return {loading, items, setItems, addItem}
}

export default useAssets
