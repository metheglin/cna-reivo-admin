import React, {useState,useEffect} from 'react'
import {
  makeStyles, Grid, Typography, InputAdornment, Chip, IconButton, InputLabel, CircularProgress, TableCell,
  List, ListItem, ListItemText, ListItemSecondaryAction
} from '@material-ui/core'
import Link from '@material-ui/core/Link'
import CancelIcon from '@material-ui/icons/Cancel'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import AddIcon from '@material-ui/icons/Add'
import newSelectableList from '../newSelectableList'
import {ItemListTemplate} from '../../newRowsPager'

const useStyles = makeStyles(theme => ({
  label: {
    marginBottom: theme.spacing(1),
  },
  newLabelButton: {
    verticalAlign: 'middle',
  },
  selected: {
    backgroundColor: theme.palette.primary.dark,
  }
}))

const Row = ({row, selected, onPush, onRemove}) => {
  const classes = useStyles()
  const icon = selected ? <CancelIcon color="secondary" /> : <AddCircleIcon color="primary" />
  const onClick = () => selected ? onRemove(row) : onPush(row)
  return (
    <ListItem  className={selected ? classes.selected : null}>
      <ListItemText primary={row.ability_kind} secondary={row.client} />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={onClick}>{icon}</IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export const Collection = ({objects, isSelected, onPush, onRemove}) => (
  <List dense={true}>
    {objects.map((row,i)=>(<Row key={i} {...{row, onPush, onRemove}} selected={isSelected(row)} />))}
  </List>
)

export const Selector = ({objects, onRemove}) => (
  <List dense={true}>
    {objects.map((row,i)=><Row key={i} {...{row, onRemove}} selected={true} />)}
  </List>
)

export default function newSelectablePermissions({defaultValue, label, max, permissions}) {
  const classes = useStyles()
  const accessors = newSelectableList({max, defaultValue})
  const {values, pushValue, removeValues} = accessors
  const onRemove = row=>removeValues(x=>x.identifier === row.identifier)
  const onPush = row=>pushValue(row)
  const renderList = (
    <Collection objects={permissions || []}
      isSelected={(object)=>values.map(x=>x.identifier).includes(object.identifier)}
      onPush={onPush} onRemove={onRemove} />
  )
  const renderSelector = (<Selector objects={values} onRemove={onRemove} />)
  return {
    ...accessors,
    renderList,
    renderSelector,
    render: (
      <React.Fragment>
        {label && (<InputLabel className={classes.label}>{label}</InputLabel>)}
        {renderList}
        {/*renderSelector*/}
      </React.Fragment>
    )
  }
}
