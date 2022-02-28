import {Fragment} from 'react'
import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle'
import AttachFileIcon from '@mui/icons-material/AttachFile'

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
    backgroundColor: theme.palette.primary.main,
    '& .MuiAvatar-root': {
      opacity: 0.7,
    }
  },
  tileSelected: {
    backgroundColor: theme.palette.primary.main,
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
        <IconButton edge="end" onClick={onClick} size="large">{icon}</IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export function AssetTile({item, selected, onClick, style}) {
  const classes = useStyles()
  const thumbnail = getThumbnail(item)
  const {content_type} = item
  const icon = selected ? <CancelIcon color="secondary" /> : <AddCircleIcon color="primary" />
  return (
    <Fragment>
    <ImageListItem className={selected ? classes.tileSelected : null} style={{...style}}>
      {thumbnail ? <img src={thumbnail} alt={content_type} /> : <DefaultFile item={item} />}
      <ImageListItemBar actionIcon={<IconButton edge="end" onClick={onClick} size="large">{icon}</IconButton>} />
    </ImageListItem>
    </Fragment>
  );
}
