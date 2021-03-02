import React, {useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel'
// import CircularProgress from '@material-ui/core/CircularProgress'
import TableCell from '@material-ui/core/TableCell'
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import newSelectableList from './newSelectableList'
import {ItemListTemplate} from '../newRowsPager'
import newModalList from './newModalList'

const useStyles = makeStyles(theme => ({
  label: {
    marginBottom: theme.spacing(1),
  },
  selector: {
    backgroundColor: theme.palette.primary.light,
  },
  dashedArea: {
    borderRadius: 6,
    width: '100%',
    padding: '4px 0',
    boxSizing: 'border-box',
    textAlign: 'center',
    border: `3px dashed ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
  }
}))

export const Selector = ({max, values, removeValues, ListItemComponent, setOpen}) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      {/*<InputLabel>Selector</InputLabel>*/}
      <Grid container className={classes.selector}>
        <ItemListTemplate rows={values} 
          rowComponent={({row})=>(
            <React.Fragment>
              <TableCell>
                <IconButton size="small" color="secondary" 
                  onClick={()=>removeValues(x=>x.id === row.id)}>
                  <CancelIcon />
                </IconButton>
              </TableCell>
              <ListItemComponent {...row} />
            </React.Fragment>
          )} />
      </Grid>
      {(max > values.length) && <div className={classes.dashedArea}>
        <IconButton size="small" color="primary" onClick={()=>setOpen()}><AddCircleIcon /></IconButton>
      </div>}
    </React.Fragment>
  )
}

export default ({defaultValue, max, label, modalListProps}) => {
  const {ListItemComponent} = modalListProps
  const accessors = newSelectableList({max, defaultValue: [defaultValue].filter(x=>x).flat()})
  const modalList = newModalList({...modalListProps,
    onClick: (x) => accessors.pushValue(x),
  })
  const renderSelector = Selector({...accessors, max, ListItemComponent, setOpen: modalList.setOpen,})
  const classes = useStyles()
  return {
    ...accessors,
    renderSelector,
    render: (
      <React.Fragment>
        {label && <InputLabel shrink className={classes.label}>{label}</InputLabel>}
        {modalList.render}
        {renderSelector}
      </React.Fragment>
    )
  }
}