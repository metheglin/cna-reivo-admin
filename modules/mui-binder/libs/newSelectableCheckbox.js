import {useState} from 'react';
import {
  FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText
} from '@mui/material'
import {useTranslation} from 'react-i18next'
import useDeepCompareEffect from 'use-deep-compare-effect'

export default function newSelectableCheckbox({defaultValue, label, options, helperText, ...props}) {
  const [values, setValues] = useState(defaultValue || [])
  const pushValue = val => {
    setValues(_state=>([..._state, val].slice(0, max)))
  }
  const removeValues = cond => setValues(_state=>_state.filter((x,i)=>!cond(x,i)))
  const clearValues = () => setValues([])
  const hasValues = () => values && values.length > 0
  const accessors = {values, pushValue, removeValues, clearValues, hasValues, setValues}
  useDeepCompareEffect(()=>setValues(defaultValue), [defaultValue])

  const render = (
    <FormControl component="fieldset">
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <FormGroup row>
        {Object.keys(options).map(x=><FormControlLabel key={x} label={options[x]}
          control={
            <Checkbox checked={values.includes(x)} color="primary"
              onChange={(e)=>{
                if (e.target.checked) {
                  setValues(_state=>([...new Set([..._state, x])]))
                } else {
                  setValues(_state=>_state.filter(y=>y!==x))
                }
              }} />}
          />)}
      </FormGroup>
    </FormControl>
  )

  return {...accessors, render}
}
