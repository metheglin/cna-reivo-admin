import React, {useState} from 'react'
// import ChipInput from 'material-ui-chip-input'
import InputLabel from '@mui/material/InputLabel'
import makeStyles from '@mui/styles/makeStyles';
import Icon from '@mui/material/Icon';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    // minWidth: 650,
  },
  textField: {
    margin: 0,
  },
}))

export default ({defaultValue, ...props}) => {
  const classes = useStyles()
  const defaultValues = defaultValue ?
    Object.keys(defaultValue).map(k=>({ key: k, value: defaultValue[k]})) :
    []
  const [fields, setFields] = useState(defaultValues)
  const addField = val => setFields(_state=>([..._state, val]))
  const removeField = index => setFields(_state=>(_state.filter((v,i)=>i!==index)))
  const changeFieldKey = (index,key) => setFields(_state=>{
    return _state.map((field, i)=>{
      if (i === index) { field.key = key }
      return field
    })
  })
  const changeFieldValue = (index,value) => setFields(_state=>{
    return _state.map((field, i)=>{
      if (i === index) { field.value = value }
      return field
    })
  })
  const render = (
    <React.Fragment>
      {props.label && <InputLabel htmlFor="select-multiple-chip">{props.label}</InputLabel>}

      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>{props.keyLabel || "KEY"}</TableCell>
            <TableCell>{props.valueLabel || "VALUE"}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((row,i) => (
            <TableRow key={`nkvf${i}`}>
              <TableCell>
                <TextField
                  required
                  label="Required"
                  value={row.key}
                  className={classes.textField}
                  margin="normal"
                  variant="filled"
                  fullWidth
                  onChange={(e)=>{changeFieldKey(i,e.target.value)}}
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={row.value}
                  className={classes.textField}
                  margin="normal"
                  variant="filled"
                  fullWidth
                  onChange={(e)=>{changeFieldValue(i,e.target.value)}}
                />
              </TableCell>
              <TableCell align="right">
                <Icon color="error" onClick={()=>removeField(i)}>cancel</Icon>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={12} align="left">
              <Icon color="primary" fontSize="large" onClick={()=>addField({key: "", value: ""})}>
                add_circle
              </Icon>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  )

  const values = fields.reduce((acc,{key,value})=>{
    if (key) acc[key] = value
    return acc
  }, {})
  return {
    values,
    render,
  }
}