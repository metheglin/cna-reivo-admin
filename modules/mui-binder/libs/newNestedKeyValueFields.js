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

export default ({defaultValue, schema, label, keyLabel, valueLabel}) => {
  const classes = useStyles()
  const schema = schema
  const defaultValues = defaultValue ?
    Object.keys(defaultValue).map(k=>({ key: k, value: defaultValue[k]})) :
    []
  const [fields, setFields] = useState(defaultValues)
  const addField = val => setFields(_state=>([..._state, val]))
  const addEmptyField = () => {
    const empty = Object.keys(schema).reduce((acc,k)=>({[k]: "", ...acc}), {})
    addField({key: "", value: empty})
  }
  const removeField = index => setFields(_state=>(_state.filter((v,i)=>i!==index)))
  const changeFieldKey = (index,key) => setFields(_state=>{
    return _state.map((field, i)=>{
      if (i === index) { field.key = key }
      return field
    })
  })
  const changeFieldValue = (index,schemaKey,schemaValue) => setFields(_state=>{
    return _state.map((field, i)=>{
      if (i === index) { field.value[schemaKey] = schemaValue }
      return field
    })
  })
  const render = (
    <React.Fragment>
      {label && <InputLabel htmlFor="select-multiple-chip">{label}</InputLabel>}

      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>{keyLabel || "KEY"}</TableCell>
            <TableCell>{valueLabel || "VALUE"}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((row,i) => (
            <TableRow key={`nkvf${i}`} style={{ verticalAlign: 'top' }}>
              <TableCell>
                <TextField
                  required
                  label="Required"
                  value={row.key}
                  className={classes.textField}
                  margin="dense"
                  variant="filled"
                  fullWidth
                  onChange={(e)=>{changeFieldKey(i,e.target.value)}}
                />
              </TableCell>
              <TableCell>
                {
                  Object.keys(schema).map(schemaKey=>{
                    if ( schema[schemaKey].type === 'boolean' ) {
                      return (
                        <FormControlLabel
                          key={`nkvflv1${i}${schemaKey}`}
                          control={
                            <Checkbox
                              checked={!!row.value[schemaKey]}
                              onChange={()=>changeFieldValue(i,schemaKey,!row.value[schemaKey])}
                              value="checked"
                              inputProps={{
                                'aria-label': 'primary checkbox',
                              }}
                            />
                          }
                          label={schema[schemaKey].label}
                        />
                      )
                    } else {
                      return (
                        <TextField
                          key={`nkvf${i}${schemaKey}`}
                          size="small"
                          label={schema[schemaKey].label}
                          value={row.value[schemaKey]}
                          className={classes.textField}
                          margin="dense"
                          variant="filled"
                          fullWidth
                          onChange={(e)=>{changeFieldValue(i,schemaKey,e.target.value)}}
                        />
                      )
                    }
                  })
                }
              </TableCell>
              <TableCell align="right">
                <Icon color="error" onClick={()=>removeField(i)}>cancel</Icon>
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

  const values = fields.reduce((acc,{key,value})=>{
    if (key) acc[key] = value
    return acc
  }, {})
  return {
    values,
    render,
  }
}