import {Fragment} from 'react'
import {
  makeStyles, Avatar,
  ListItem, ListItemText, ListItemSecondaryAction, ListItemAvatar,
  GridListTile, GridListTileBar,
  IconButton,
} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle'
import AttachFileIcon from '@material-ui/icons/AttachFile'

export function getThumbnail(item) {
  // if (item.rough_content_type !== 'image') return null
  const {publish_url, s3_url, variant_urls} = item
  return (variant_urls && variant_urls.thumbnail) ?
    variant_urls.thumbnail :
    (publish_url || s3_url)
}

export function getSrc(item) {
  const thumbnail = getThumbnail(item)
  return thumbnail ? thumbnail : '/vercel.svg' // TODO: set noimage
}

export function AssetAvatar({item, ...props}) {
  return (<Avatar {...props} variant="rounded" src={getSrc(item)} />)
}

const useStylesForDefaultFile = makeStyles(theme => ({
  defaultFile: {
    paddingTop: '100%',
    position: 'relative',
  },
  defaultFileIcon: {
    display: 'block',
    position: 'absolute',
    top: 8,
    left: 0,
    right: 0,
    margin: 'auto',
  }
}));

function DefaultFile({}) {
  const classes = useStylesForDefaultFile()
  return (
    <div className={classes.defaultFile}>
      <AttachFileIcon className={classes.defaultFileIcon} />
    </div>
  )
}


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

export function AssetRow({item, selected, onClick}) {
  const classes = useStyles()
  const {content_type, path} = item
  const icon = selected ? <CancelIcon color="secondary" /> : <AddCircleIcon color="primary" />
  return (
    <ListItem className={selected ? classes.selected : null}>
      <ListItemAvatar>
        <AssetAvatar item={item} />
      </ListItemAvatar>
      <ListItemText primary={content_type} secondary={path} />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={onClick}>{icon}</IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export function AssetTile({item, selected, onClick, style}) {
  const classes = useStyles()
  const thumbnail = getThumbnail(item)
  const {content_type} = item
  const icon = selected ? <CancelIcon color="secondary" /> : <AddCircleIcon color="primary" />
  return (
    <Fragment>
    <GridListTile className={selected ? classes.tileSelected : null} style={{...style}}>
      {thumbnail ? <img src={thumbnail} alt={content_type} /> : <DefaultFile item={item} />}
      <GridListTileBar actionIcon={<IconButton edge="end" onClick={onClick}>{icon}</IconButton>} />
    </GridListTile>
    </Fragment>
  )
}
