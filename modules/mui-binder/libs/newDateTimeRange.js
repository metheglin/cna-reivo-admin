import React from 'react'
import newDateTime from './newDateTime'
import Grid from '@material-ui/core/Grid'

export default function newDateTimeRange({startAtProps, endAtProps, onChange}) {
  startAtProps = startAtProps || {}
  endAtProps = endAtProps || {}
  onChange = onChange || (()=>{})
  const startAt = newDateTime({
    label: startAtProps.label || "Start at",
    onChange: ()=>onChange({startAt, endAt}),
    ...startAtProps
  })
  const endAt = newDateTime({
    label: endAtProps.label || "End at",
    onChange: ()=>onChange({startAt, endAt}),
    ...endAtProps
  })
  const render = (
    <Grid container justify="flex-start" spacing={2}>
      <Grid item md={6}>{startAt.render}</Grid>
      <Grid item md={6}>{endAt.render}</Grid>
    </Grid>
  )
  const reset = () => {
    startAt.reset()
    endAt.reset()
  }
  return {startAt, endAt, render, reset}
}