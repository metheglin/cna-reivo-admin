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
      <ListItemText primary={row.name} secondary={row.path} />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={onClick}>{icon}</IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export const Collection = ({labels, isSelected, onPush, onRemove}) => (
  <List dense={true}>
    {labels.map((row,i)=>(<Row key={i} {...{row, onPush, onRemove}} selected={isSelected(row)} />))}
  </List>
)

export const Selector = ({labels, onRemove}) => (
  <List dense={true}>
    {labels.map((row,i)=><Row key={i} {...{row, onRemove}} selected={true} />)}
  </List>
)

export default function newSelectableLabels({defaultValue, label, max, labelsModule}) {
  const classes = useStyles()
  const {prefix, labels} = labelsModule
  const selectedDefault = defaultValue.filter(x=>x.path.startsWith(prefix))
  const accessors = newSelectableList({max, defaultValue: selectedDefault})
  const {values, pushValue, removeValues} = accessors
  const onRemove = row=>removeValues(x=>x.id === row.id)
  const onPush = row=>pushValue(row)
  const renderList = (
    <Collection labels={labels || []}
      isSelected={(label)=>values.map(x=>x.id).includes(label.id)}
      onPush={onPush} onRemove={onRemove} />
  )
  const renderSelector = (<Selector labels={values} onRemove={onRemove} />)
  return {
    prefix,
    ...accessors,
    renderFilter: labelsModule.render,
    renderList,
    renderSelector,
    render: (
      <React.Fragment>
        {label && (
          <InputLabel className={classes.label}>
            {label}
            <Link className={classes.newLabelButton} href={`/labels/prefix${prefix}`} target="_blank"><AddIcon /></Link>
          </InputLabel>
        )}
        {labelsModule.render}
        {renderList}
        {renderSelector}
      </React.Fragment>
    )
  }
}

export {default as useLabels} from './useLabels'
export {default as useModalRender} from './useModalRender'

export const normalizePath = (value) => {
  const components = Array.isArray(value) ? value : (value || "").split('/')
  const extracted = components.filter(x=>x).join('/')
  return extracted ? `/${extracted}/` : `/${extracted}`
}
