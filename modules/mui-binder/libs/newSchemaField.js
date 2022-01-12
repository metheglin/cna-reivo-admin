import React, {useState} from 'react'
// import ChipInput from 'material-ui-chip-input'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import makeStyles from '@mui/styles/makeStyles';
import Icon from '@mui/material/Icon';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
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
  select: {
    minWidth: 100,
  }
}))

export default ({defaultValue, schema, ...props}) => {
  const classes = useStyles()
  const initValue = Object.keys(schema).reduce((acc,k)=>{
    acc[k] = (typeof defaultValue[k] !== 'undefined') ?
      defaultValue[k] : 
      schema[k].defaultValue
    return acc
  }, {})
  const [values, setValues] = useState(initValue)

  const handleChangeField = (key, value) => setValues({...values, [key]: value})

  const renderField = ({key, schema, value, className, onChangeField}) => {
    if (schema.type === 'boolean') {
      return (<FormControlLabel control={
          <Checkbox
            checked={!!value}
            onChange={()=>onChangeField(key, !value)}
            value="checked"
            inputProps={{
              'aria-label': 'primary checkbox',
            }}
          />
        } label={schema.label}
      />)
    } else if (schema.options) {
      return (<FormControl className={classes.select}>
        <Select {...props} 
          value={value || schema.defaultValue} 
          onChange={e=>onChangeField(key, e.target.value)}>
          {schema.options.map((x,i)=>{
            const [val, label] = [x].flat()
            return (<MenuItem key={i} value={val}>{label || val}</MenuItem>)
          })}
        </Select>
      </FormControl>)
    } else {
      return (<TextField
        value={value || schema.defaultValue}
        className={className}
        margin="normal"
        variant="filled"
        fullWidth
        onChange={e=>onChangeField(key, e.target.value)}
      />)
    }
  }
  const render = (
    <React.Fragment>
      {props.label && <InputLabel shrink htmlFor="select-multiple-chip">{props.label}</InputLabel>}

      <Table className={classes.table} aria-label="simple table" size="small">
        {/*<TableHead>
          <TableRow>
            <TableCell>{props.keyLabel || "KEY"}</TableCell>
            <TableCell>{props.valueLabel || "VALUE"}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>*/}
        <TableBody>
          {Object.keys(schema).map((key,i) => (
            <TableRow key={key}>
              <TableCell>
                <Typography>{key}</Typography>
                {/*<TextField
                  required
                  label="Required"
                  value={key}
                  className={classes.textField}
                  margin="normal"
                  variant="filled"
                  fullWidth
                  disabled
                />*/}
              </TableCell>
              <TableCell>
                {
                  renderField({
                    key: key,
                    schema: schema[key], 
                    value: values[key],
                    className: classes.textField, 
                    onChangeField: handleChangeField,
                  })
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )

  return {
    values,
    render,
  }
}