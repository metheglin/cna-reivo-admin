import React, {useState} from 'react'
// import ChipInput from 'material-ui-chip-input'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

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

export default ({defaultValue, label, schema, rowComponent}) => {
  const classes = useStyles()
  const defaultValues = defaultValue || []
  const [fields, setFields] = useState(defaultValues)
  const addField = val => setFields(_state=>([..._state, val]))
  const addEmptyField = () => {
    const field = Object.keys(schema).reduce((acc,k)=>{
      acc[k] = schema[k].default
      return acc
    }, {})
    addField(field)
  }
  const removeField = index => setFields(_state=>(_state.filter((v,i)=>i!==index)))
  const changeField = (index,fieldKey,fieldValue) => setFields(_state=>{
    return _state.map((field, i)=>{
      if (i === index) {
        field[fieldKey] = fieldValue
      }
      return field
    })
  })
  const render = (
    <React.Fragment>
      {label && <InputLabel shrink htmlFor="select-multiple-chip">{label}</InputLabel>}

      <Table className={classes.table} aria-label="simple table" size="small">
        <TableBody>
          {fields.map((row,index) => (
            <TableRow key={`nvf${index}`} style={{ verticalAlign: 'top' }}>
              <TableCell>
                {rowComponent({row, index, changeField})}
              </TableCell>
              <TableCell align="right">
                <Icon color="error" onClick={()=>removeField(index)}>cancel</Icon>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={12} align="left">
              <Icon color="primary" fontSize="large" onClick={addEmptyField}>
                add_circle
              </Icon>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  )

  return {
    values: fields,
    render,
  }
}