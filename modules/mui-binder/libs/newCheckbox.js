import React, {useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

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
