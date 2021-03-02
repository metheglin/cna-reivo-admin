import React, {useState,} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import newDraggableList from './newDraggableList'

export default ({defaultValue, options, Component}) => {
  const classes = useStyles()
  const draggableList = newDraggableList({
    defaultValue,
    Component: (props) => (
      <React.Fragment>
        <Component {...props} />
        <ListItemSecondaryAction>
          <IconButton size="small" onClick={()=>{
            removeItemsIn(props)
            addItemsOut(props)
          }}>
            <VerticalAlignBottomIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </React.Fragment>
    ),
  })
  const [itemsOut, setItemsOut] = useState(options.filter(x=>!draggableList.items.map(x=>x.id).includes(x.id)))
  const addItemsIn = (item) => draggableList.setItems(_state=>[..._state, item])
  const addItemsOut = (item) => setItemsOut(_state=>[..._state, item])
  const removeItemsIn = (item) => draggableList.setItems(_state=>_state.filter(x=>x.id!==item.id))
  const removeItemsOut = (item) => setItemsOut(_state=>_state.filter(x=>x.id!==item.id))

  const render = (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.active}>
          {draggableList.render}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.inactive}>
          <List dense component="div" role="list">
            {itemsOut.map((x,i)=>(
              <ListItem key={i} role="listitem" button onClick={()=>{
                removeItemsOut(x)
                addItemsIn(x)
              }}>
                <ListItemIcon><VerticalAlignTopIcon /></ListItemIcon>
                <Component {...x} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  )

  return {values: draggableList.items, render}
}

const useStyles = makeStyles(theme => ({
  active: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
  },
  inactive: {
    backgroundColor: theme.palette.grey[700],
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
  },
}))