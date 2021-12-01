import {
  makeStyles, 
  ListItem, ListItemText, ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle'

const useStyles = makeStyles(theme => ({
  selected: {
    backgroundColor: theme.palette.primary.dark,
  }
}))

export function LabelRow({item, selected, onClick}) {
  const classes = useStyles()
  const {name, path} = item
  const icon = selected ? <CancelIcon color="secondary" /> : <AddCircleIcon color="primary" />
  return (
    <ListItem  className={selected ? classes.selected : null}>
      <ListItemText primary={name} secondary={path} />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={onClick}>{icon}</IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}