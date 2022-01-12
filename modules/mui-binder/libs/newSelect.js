import React, {useState, useMemo} from 'react'
import makeStyles from '@mui/styles/makeStyles';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

const useStyles = makeStyles(theme => ({
  formControl: {
    // marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
    minWidth: 200,
  },
}));

export default function newSelect({defaultValue, options, label, required, helperText, ...props}) {
  const [value, setValue] = useState(defaultValue || "")
  const items = useMemo(()=>{
    return Object.keys(options).map(k=>(
      <MenuItem key={k} value={k}>{options[k]}</MenuItem>
    ))
  }, [options])
  const classes = useStyles()

  const render = (
    <FormControl required={required} className={classes.formControl}>
      {label && <InputLabel shrink>{label}</InputLabel>}
      <Select {...props} 
        value={value} 
        onChange={e=>setValue(e.target.value)}>
        {items}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )

  return {
    value, 
    // Component, 
    render,
    title: options[value]
  }
}