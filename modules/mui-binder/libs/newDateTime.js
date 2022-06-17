import React, {useState, useEffect} from 'react'
import {format, isValid} from 'date-fns'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  LocalizationProvider, DateTimePicker
} from '@mui/lab'
import {TextField} from "@mui/material";

export default function newDateTime({defaultValue, label, helperText}) {
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        fullWidth
        variant="inline"
        ampm={false}
        label={label}
        renderInput={(params) => <TextField {...params} />}
        value={date}
        onChange={date=>setSelectedWithValidity(date)}
        inputFormat="yyyy-MM-dd HH:mm"
        mask="____-__-__ __:__"
      />
    </LocalizationProvider>
  )

  return { 
    render,
    value: date, setValue: setDate,
    format: (fm)=>(isValid(date) ? format(date, fm) : null),
    reset,
  }
}