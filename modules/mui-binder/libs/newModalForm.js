import React, {useState, useMemo, useEffect, useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
// import IconButton from '@material-ui/core/IconButton'
import CheckIcon from '@material-ui/icons/Check';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

// Example Usage:
// ```
// const newLinkForm = ({value})=>{
//   value = value || {}
//   const title = newTextField({
//     defaultValue: value.title,
//     label: 'タイトル', fullWidth: true,
//   })
//   const url = newTextField({
//     defaultValue: value.url,
//     label: 'URL', fullWidth: true,
//   })
//   const render = (
//     <Grid container spacing={1} direction="column">
//      <Grid item>{title.render}</Grid>
//      <Grid item>{url.render}</Grid>
//    </Grid>
//   )
//   return {
//     render,
//     value: {
//       title: title.value,
//       url: url.value,
//     },
//   }
// }
// const links = newModalForm({
//   defaultValue: {},
//   form: newLinkForm({}),
// })
// ```
export default ({defaultValue, header, form, onClick}) => {
  const classes = useStyles()
  const [value, setValue] = useState(defaultValue)
  const [opened, setOpened] = useState(false)
  const setOpen = () => setOpened(true)
  const setClose = () => setOpened(false)
  const handleClick = () => {
    const result = form.value
    setValue(result)
    onClick && onClick(result)
    form.reset()
    setClose()
  }
  
  const render = (
    <Modal open={opened} onClose={()=>setClose()}>
      <div style={{top:0,bottom:0,left:0,right:0}} className={classes.paper}>
        {header}
        <div className={classes.paperInner}>
          <Box p={2}>
            <Grid container spacing={2} direction="column">
              <Grid item>{form.render}</Grid>
              <Grid item>
                <Button onClick={handleClick} 
                  variant="contained"
                  startIcon={<CheckIcon />}
                  color="primary">OK</Button>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </Modal>
  )

  return {
    render, value, setValue, setOpen, setClose,
  }
}

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
    // padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
  },
  paperInner: {
    width: '100%',
    // height: '100%',
    flexGrow: 1,
    overflowY: 'scroll',
  }
}))
