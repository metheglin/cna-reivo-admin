import {useState, useEffect} from 'react'
import {Grid, InputAdornment} from '@mui/material'
import newSearchBar from '../newSearchBar'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {normalizePath, stripLastSlash} from './index.js'
import {useSession} from 'modules/rvadmin/core/SessionProvider'

export default function useLabels({baseQuery}) {
  const {api} = useSession()
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const prefix = normalizePath(baseQuery.prefix || '/')

  const searchBar = newSearchBar({
    disabled: false,
    placeholder: "Search with path",
    startAdornment: <InputAdornment position="start">{`${prefix}`}</InputAdornment>
  })
  const renderSearch = (
    <Grid container spacing={1}>
      <Grid item xs={12}>{searchBar.render}</Grid>
    </Grid>
  )

  const searchPrefix = normalizePath([prefix, searchBar.value].filter(x=>x).join(""))
  const params = {...(baseQuery || {}), prefix: stripLastSlash(searchPrefix)}

  useDeepCompareEffect(()=>{
    setLoading(true)
    api.fetch('/labels', {params}).then(res=>{
      setItems(res.data)
      setLoading(false)
    }).catch(error=>setLoading(false))
  }, [params])

  return {
    loading, items, setItems, prefix,
    renderSearch,
  }
}
