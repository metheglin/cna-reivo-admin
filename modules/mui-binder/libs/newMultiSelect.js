import React, {useState,useMemo,useCallback} from 'react'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import Input from '@mui/material/Input'
import { useTheme } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export default ({defaultValue, label, options}) => {
  const classes = useStyles()
  const [values, setValues] = useState(defaultValue || [])
  const setValue = val => setValues(_state=>setValues([..._state, val]))
  const opts = useMemo(()=>(options || {}), [])
  const items = useMemo(()=>{
    return Object.keys(opts).map(k=>(
      <MenuItem key={k} value={k}>{opts[k]}</MenuItem>
    ))
  }, [])
  
  const render = (
    <React.Fragment>
      <InputLabel htmlFor="select-multiple-chip">{label}</InputLabel>
      <Select
        multiple
        value={values}
        onChange={e=>setValues(e.target.value)}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(value => (
              <Chip key={value} label={opts[value] || value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {items}
      </Select>
    </React.Fragment>
  )

  return {
    values, 
    // Component, 
    render,
    titles: values.map(x=>opts[x] || x)
  }
}