import {useState, useEffect} from 'react'
import {Grid, InputAdornment} from '@material-ui/core'
import newSearchBar from '../newSearchBar'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {normalizePath} from './index.js'

export default function useLabels({baseQuery, api}) {
  const [loading, setLoading] = useState(false)
  const [labels, setLabels] = useState([])
  const prefix = normalizePath(baseQuery.prefix || '/')

  const searchBar = newSearchBar({
    // disabled: props.disabled,
    disabled: false,
    placeholder: "Search with path",
    startAdornment: <InputAdornment position="start">{`${prefix}`}</InputAdornment>
  })
  const render = (
    <Grid container spacing={1}>
      <Grid item xs={12}>{searchBar.render}</Grid>
    </Grid>
  )

  const searchPrefix = normalizePath([prefix, searchBar.value].filter(x=>x).join(""))
  const params = {...(baseQuery || {}), prefix: searchPrefix}

  useDeepCompareEffect(()=>{
    setLoading(true)
    api.fetch('/labels', {params}).then(res=>{
      setLabels(res.data)
      setLoading(false)
    }).catch(error=>setLoading(false))
  }, [params])

  return {
    loading, labels, setLabels,
    render, prefix,
  }
}
