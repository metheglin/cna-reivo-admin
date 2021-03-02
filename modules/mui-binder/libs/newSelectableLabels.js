import React, {useState,useMemo,useCallback,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

import InputLabel from '@material-ui/core/InputLabel'

import newSelectableList from './newSelectableList'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: 500,
    height: 450,
  },
  selectorGridList: {
    height: 220,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  chips: {
    backgroundColor: theme.palette.grey[100],
    padding: 4,
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}))

export const LabelList = (props) => {
  const {anchorEl, setAnchorEl} = props
  const {values, pushValue} = props
  const {items} = props
  const classes = useStyles()

  return (
    <Menu
      id="lock-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={()=>setAnchorEl(null)}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      {items.map(label => (
        <MenuItem
          key={label.id}
          disabled={false}
          selected={!! values.find(x=>x.id === label.id)}
          onClick={event=>{
            pushValue(label)
          }}
        >
          {label.name}
        </MenuItem>
      ))}
    </Menu>
  )
}

export const LabelSelector = (props) => {
  const {values, removeValues} = props
  const {setAnchorEl} = props
  const classes = useStyles()
  return (
    <div 
      className={classes.chips} 
      aria-haspopup="true"
      onClick={event=>setAnchorEl(event.currentTarget)}>
      <IconButton size="small" onClick={event=>setAnchorEl(event.currentTarget)}>
        <KeyboardArrowDownIcon />
      </IconButton>
      {values.map(label => (
        <Chip
          key={label.id}
          label={label.name}
          className={classes.chip}
          clickable
          color="primary"
          onDelete={()=>removeValues(x=>x.id==label.id)}
          deleteIcon={<CancelIcon />}
        />
      ))}
    </div>
  )
}

export default ({defaultValue, label, items}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const {values, pushValue, removeValues, clearValues} = newSelectableList({defaultValue: defaultValue || []})
  
  const renderList = LabelList({values, pushValue, anchorEl, setAnchorEl, items})
  const renderSelector = LabelSelector({values, removeValues, anchorEl, setAnchorEl})
  return {
    values,
    // ListComponent,
    // SelectorComponent,
    renderList,
    renderSelector,
    render: (
      <React.Fragment>
        {label && <InputLabel>{label}</InputLabel>}
        {renderList}
        {renderSelector}
      </React.Fragment>
    )
  }
}