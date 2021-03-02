import React, {useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel'
import CircularProgress from '@material-ui/core/CircularProgress'
import TableCell from '@material-ui/core/TableCell'
import Link from '@material-ui/core/Link'
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';

import newSelectableList from './newSelectableList'
import newSearchBar from './newSearchBar'
import {ItemListTemplate} from '../newRowsPager'

import {normalizePath} from 'modules/rvadmin/utils/Util'
import Api from 'modules/rvadmin/utils/Api'
import useFlash from 'modules/rvadmin/core/useFlash'

const useStyles = makeStyles(theme => ({
  label: {
    marginBottom: theme.spacing(1),
  },
  gridList: {
    // maxHeight: 450,
    marginBottom: theme.spacing(2),
  },
  selector: {
    backgroundColor: theme.palette.primary.light,
  },
  // assetCard: {
  //   opacity: 0.7,
  // },
  searchItem: {
    cursor: 'pointer',
  },
  newLabelButton: {
    verticalAlign: 'middle',
  },
}))

export const List = (props) => {
  const {values, pushValue} = props
  const [loading, setLoading] = useState(false)
  const [labels, setLabels] = useState([])
  const baseQuery = props.baseQuery || {}
  const prefix = props.prefix
  const searchBar = newSearchBar({
    disabled: props.disabled,
    placeholder: prefix ? "Search with path" : "Start with /",
    startAdornment: prefix ?
      <InputAdornment position="start">{`${prefix}/`}</InputAdornment> :
      null
  })

  const {handleApiError} = useFlash()
  const classes = useStyles()
  const api = Api.json({handleApiError})

  useEffect(()=>{
    if (!searchBar.value) return
    setLoading(true)
    const queryPrefix = normalizePath(`${prefix}/${searchBar.value}`)
    const query = {...baseQuery, prefix: queryPrefix}
    api.fetch('/labels', {query}).then(res=>{
      setLabels(res.data)
      setLoading(false)
    }).catch(error=>{
      // console.log('abc err',error)
      setLoading(false)
      handleApiError(error)
    })
  }, [searchBar.value])

  const unSelectedLabels = labels.filter(x=>!values.map(a=>a.id).includes(x.id))

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {searchBar.render}
      </Grid>
      <Grid item xs={12}>
        {loading && <CircularProgress size={24} />}
        {labels.length > 0 && <ItemListTemplate rows={unSelectedLabels} 
          rowComponent={({row})=>(
            <React.Fragment>
              <TableCell>
                <IconButton size="small" color="primary" onClick={()=>{pushValue(row)}}><AddCircleIcon /></IconButton>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{row.name}</Typography>
              </TableCell>
              <TableCell>
                <Chip size="small" label={row.path} />
              </TableCell>
              <TableCell></TableCell>
            </React.Fragment>
          )} />}
      </Grid>
    </Grid>
  )
}

export const Selector = (props) => {
  const classes = useStyles()
  const {values, removeValues} = props
  return (
    <React.Fragment>
      {/*<InputLabel>Selector</InputLabel>*/}
      <Grid container className={classes.selector}>
        <ItemListTemplate rows={values} 
          rowComponent={({row})=>(
            <React.Fragment>
              <TableCell>
                <IconButton size="small" color="secondary" 
                  onClick={()=>removeValues(x=>x.id === row.id)}>
                  <CancelIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{row.name}</Typography>
              </TableCell>
              <TableCell>
                <Chip size="small" label={row.path} />
              </TableCell>
              <TableCell>Selected</TableCell>
            </React.Fragment>
          )} />
      </Grid>
    </React.Fragment>
  )
}

export default ({defaultValue, label, max, baseQuery, prefix, disabled}) => {
  const selectedDefault = defaultValue.filter(x=>x.path.startsWith(prefix))
  const accessors = newSelectableList({max, defaultValue: selectedDefault})
  const renderList = List({...accessors, baseQuery, prefix, disabled})
  const renderSelector = Selector(accessors)
  const classes = useStyles()
  return {
    ...accessors,
    renderList,
    renderSelector,
    render: (
      <React.Fragment>
        {label && (
          <InputLabel className={classes.label}>
            {label}
            <Link className={classes.newLabelButton} href={`/labels/prefix${prefix}`} target="_blank"><AddIcon /></Link>
          </InputLabel>
        )}
        {renderList}
        {renderSelector}
      </React.Fragment>
    )
  }
}