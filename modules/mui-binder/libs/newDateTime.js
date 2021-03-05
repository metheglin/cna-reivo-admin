import React, {useState, useEffect} from 'react'
import {format, isValid} from 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers'
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const innerTheme = theme => createMuiTheme({
  ...theme,
  overrides: {
    // MuiFormControl: {
    //   root: {
    //     width: '50%',
    //   }
    // }
  }
})

export default function newDateTime({defaultValue, label}) {
  const [date, setDate] = useState(defaultValue ? new Date(defaultValue) : new Date)
  const [lastValidDate, setLastValidDate] = useState(null)
  const setSelectedWithValidity = date => {
    setDate(date)
    if (isValid(date)) {
      setLastValidDate(date)
    }
  }
  const reset = () => {
    setDate(defaultValue ? new Date(defaultValue) : new Date)
    setLastValidDate(null)
  }

  useEffect(()=>reset(), [defaultValue])

  const render = (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={innerTheme}>
        <KeyboardDateTimePicker
          fullWidth
          variant="inline"
          ampm={false}
          label={label || " "}
          value={date}
          onChange={date=>setSelectedWithValidity(date)}
          format="yyyy/MM/dd HH:mm"
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  )

  return { 
    render,
    value: date, 
    format: (fm)=>(isValid(date) ? format(date, fm) : null),
    reset,
  }
}