import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default ({title, inner}) => {
  const classes = useStyles()
  const [opened, setOpened] = useState(false)
  const handleOpen = ()=>setOpened(true)
  const handleClose = ()=>setOpened(false)

  const render = (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={opened}
      onClose={handleClose}>
      <div style={{top:0,bottom:0,left:0,right:0}} className={classes.paper}>
        {title && <h2 id="simple-modal-title">title</h2>}
        {inner}
      </div>
    </Modal>
  )

  return {
    render, opened, handleOpen, handleClose,
  }
}