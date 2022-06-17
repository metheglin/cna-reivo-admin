import { 
  ListItem, ListItemText, ListItemSecondaryAction, ListItemIcon,
  IconButton, Chip, Grid,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DocumentDownloadButton from './DocumentDownloadButton'

const useStyles = makeStyles(theme => ({
  selected: {
    backgroundColor: theme.palette.primary.main,
  }
}))

export function DocumentRow({item, selected, onClick}) {
  const classes = useStyles()
  const {filename, content_type} = item
  const icon = selected ? <CancelIcon color="secondary" /> : <AddCircleIcon color="primary" />
  return (
    <ListItem  className={selected ? classes.selected : null}>
      <ListItemIcon>
        <DocumentDownloadButton {...item} />
      </ListItemIcon>
      <ListItemText primary={filename} secondary={
        <Grid container spacing={1}>
          <Grid item><Chip size="small" label={item.key} /></Grid>
          <Grid item><Chip size="small" label={content_type} /></Grid>
        </Grid>
      } />
      <ListItemSecondaryAction>
        {onClick && <IconButton edge="end" onClick={onClick}>{icon}</IconButton>}
      </ListItemSecondaryAction>
    </ListItem>
  )
}