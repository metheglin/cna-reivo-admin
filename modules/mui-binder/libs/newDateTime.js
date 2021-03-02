import 'date-fns'
import {
  format, 
  // formatDistance, 
  // formatRelative, 
  // subDays, 
  isValid 
} from 'date-fns'
import React, {useState,useEffect} from 'react'
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

export default ({ defaultValue, label, dateProps, timeProps, onChange }) => {
  dateProps = dateProps || {}
  timeProps = timeProps || {}
  const init = {
    date: defaultValue ? new Date(defaultValue) : new Date,
    lastValidDate: null,
  }
  const [selected, setSelected] = useState(init)
  useEffect(()=>{
    onChange && onChange(selected)
  }, [selected])
  const setSelectedWithValidity = date => {
    if (isValid(date)) {
      setSelected(_state=>({lastValidDate: date, date}))
    } else {
      setSelected(_state=>({..._state, date}))
    }
  }
  const reset = () => setSelected(init)

  const render = (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={innerTheme}>
        <KeyboardDateTimePicker
          fullWidth
          variant="inline"
          ampm={false}
          label={label || " "}
          value={selected.date}
          onChange={date=>setSelectedWithValidity(date)}
          format="yyyy/MM/dd HH:mm"
        />
        {/*<KeyboardDatePicker {...dateProps}
          disableToolbar
          variant="inline"
          margin="normal"
          format={dateProps.format || "yyyy/MM/dd"}
          label={label || " "}
          value={selected.date}
          onChange={date=>setSelectedWithValidity(date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker {...timeProps}
          margin="normal"
          label={" "}
          value={selected.date}
          onChange={date=>setSelectedWithValidity(date)}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />*/}
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  )

  return { 
    render,
    // Component, 
    value: selected.date, 
    format: (fm)=>(isValid(selected.date) ? format(selected.date, fm) : null),
    reset,
  }
}