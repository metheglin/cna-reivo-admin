import React, {useState} from 'react';
import { alpha } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles(theme => ({
  search: {
    display: 'flex',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    // marginRight: theme.spacing(2),
    marginLeft: 0,
    // width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(3),
    //   width: 'auto',
    // },
  },
  searchIcon: {
    width: theme.spacing(7),
    // pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    // padding: theme.spacing(1, 1, 1, 7),
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}));

export default function newSearchBar({startAdornment, placeholder, onClick, ...props}) {
  const [value, setValue] = useState()
  const classes = useStyles()

  const icon = onClick ?
    (<IconButton onClick={()=>onClick(value)} size="small"><SearchIcon /></IconButton>) :
    (<SearchIcon />)
  const render = (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        {icon}
      </div>
      <InputBase
        {...props}
        value={value}
        onChange={e=>setValue(e.target.value)}
        placeholder={placeholder || "Search..."}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        {...{startAdornment}}
      />
    </div>
  )

  return {value, render}
}