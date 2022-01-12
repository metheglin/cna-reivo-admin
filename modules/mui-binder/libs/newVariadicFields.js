import React, {useState} from 'react'
// import ChipInput from 'material-ui-chip-input'
import InputLabel from '@mui/material/InputLabel'
import makeStyles from '@mui/styles/makeStyles';
import Icon from '@mui/material/Icon';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

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