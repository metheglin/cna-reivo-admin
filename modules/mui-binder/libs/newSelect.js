import React, {useState, useMemo} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

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