import React from 'react'
import {
  makeStyles, Grid, Typography, InputAdornment, Chip, IconButton, InputLabel, CircularProgress, TableCell,
  List, ListItem, ListItemText, ListItemSecondaryAction, ListItemAvatar, 
  GridList, GridListTile, GridListTileBar
} from '@material-ui/core'

import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle'
import newSelectableList from '../newSelectableList'
import {AssetAvatar, getThumbnail} from '../../components/Asset'

const useStyles = makeStyles(theme => ({
  selected: {
    backgroundColor: theme.palette.primary.dark,
    '& .MuiAvatar-root': {
      opacity: 0.7,
    }
  },
  tileSelected: {
    backgroundColor: theme.palette.primary.dark,
    '& .MuiGridListTile-tile': {
      opacity: 0.8,
    }
  },
}))

const Row = ({row, selected, onPush, onRemove}) => {
  const classes = useStyles()
  const icon = selected ? <CancelIcon color="secondary" /> : <AddCircleIcon color="primary" />
  const onClick = () => selected ? onRemove(row) : onPush(row)
  return (
    <ListItem className={selected ? classes.selected : null}>
      <ListItemAvatar>
        <AssetAvatar item={row} />
      </ListItemAvatar>
      <ListItemText primary={row.content_type} secondary={row.path} />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={onClick}>{icon}</IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export function Collection({assets, isSelected, onPush, onRemove}) {
  const classes = useStyles()
  return (
    <GridList cellHeight={120} spacing={6} cols={12}>
      {assets.map((item,i) => {
        const thumbnail = getThumbnail(item)
        const selected = isSelected(item)
        const icon = selected ? <CancelIcon color="secondary" /> : <AddCircleIcon color="primary" />
        const onClick = () => selected ? onRemove(item) : onPush(item)
        return (
        <GridListTile className={selected ? classes.tileSelected : null}>
          {thumbnail ? <img src={thumbnail} alt={item.content_type} /> : <DefaultFile item={item} />}
          <GridListTileBar actionIcon={<IconButton edge="end" onClick={onClick}>{icon}</IconButton>} />
        </GridListTile>
      )})}
    </GridList>
  )
}

export const Selector = ({assets, onRemove}) => (
  <List dense={true}>
    {assets.map((row,i)=><Row key={i} {...{row, onRemove}} selected={true} />)}
  </List>
)

const newSelectableAssets = ({defaultValue, max, assetsModule}) => {
  const accessors = newSelectableList({max, defaultValue})
  const {values, pushValue, removeValues} = accessors
  const onRemove = row=>removeValues(x=>x.id === row.id)
  const onPush = row=>pushValue(row)

  const renderList = (
    <Collection assets={assetsModule.assets}
      isSelected={(asset)=>values.map(x=>x.id).includes(asset.id)}
      onPush={onPush} onRemove={onRemove} />
  )
  const renderSelector = (<Selector assets={values} onRemove={onRemove} />)
  return {
    ...accessors,
    renderUploader: assetsModule.render,
    renderList,
    renderSelector,
    render: (
      <Grid container spacing={2}>
        <Grid item xs={12}>{assetsModule.render}</Grid>
        <Grid item xs={12}>{renderList}</Grid>
        <Grid item xs={12}>{renderSelector}</Grid>
      </Grid>
    )
  }
}
export default newSelectableAssets

export {default as useImages} from './useImages'
export {default as useModalRender} from './useModalRender'
