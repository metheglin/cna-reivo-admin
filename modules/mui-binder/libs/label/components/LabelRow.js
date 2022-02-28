import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle'

const useStyles = makeStyles(theme => ({
  selected: {
    backgroundColor: theme.palette.primary.main,
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
        <IconButton edge="end" onClick={onClick} size="large">{icon}</IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}