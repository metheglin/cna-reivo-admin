import React from 'react'
import newDateTime from './newDateTime'
import Grid from '@mui/material/Grid'
import {useTranslation} from 'react-i18next'

export default function newDateTimeRange({startAtProps, endAtProps, onChange}) {
  const {t} = useTranslation()
  startAtProps = startAtProps || {}
  endAtProps = endAtProps || {}
  onChange = onChange || (()=>{})
  const startAt = newDateTime({
    label: startAtProps.label || t("Start at"),
    onChange: ()=>onChange({startAt, endAt}),
    ...startAtProps
  })
  const endAt = newDateTime({
    label: endAtProps.label || t("End at"),
    onChange: ()=>onChange({startAt, endAt}),
    ...endAtProps
  })
  const render = (
    <Grid container justifyContent="flex-start" spacing={2}>
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