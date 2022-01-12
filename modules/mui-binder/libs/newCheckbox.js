import React, {useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

export default ({defaultValue, label, helperText, ...props}) => {
  const [value, setValue] = useState(!!defaultValue)
  const render = (
    <React.Fragment>
      <FormControlLabel
        control={
          <Checkbox
            checked={value}
            onChange={()=>setValue(!value)}
            {...props}
          />        
        }
        label={label}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </React.Fragment>
  )
  return {value, setValue, render}
}
