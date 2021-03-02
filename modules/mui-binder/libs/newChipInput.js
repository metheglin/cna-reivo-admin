import React, {useState,useMemo,useCallback} from 'react'
import ChipInput from 'material-ui-chip-input'
import InputLabel from '@material-ui/core/InputLabel'
// import { makeStyles, useTheme } from '@material-ui/core/styles'

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//     maxWidth: 300,
//   },
//   chips: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   chip: {
//     margin: 2,
//   },
//   noLabel: {
//     marginTop: theme.spacing(3),
//   },
// }))

export default ({defaultValue, label}) => {
  // const classes = useStyles()
  const [values, setValues] = useState(defaultValue || [])
  const setValue = val => setValues(_state=>([..._state, val]))
  const unsetValue = index => setValues(_state=>(_state.filter((v,i)=>i!==index)))
  const render = (
    <React.Fragment>
      {label && <InputLabel htmlFor="select-multiple-chip">{label}</InputLabel>}
      <ChipInput
        value={values}
        onAdd={chip=>setValue(chip)}
        onDelete={(chip, index)=>unsetValue(index)}
      />
    </React.Fragment>
  )

  return { values, render }
}