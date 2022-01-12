import React, {useState, useMemo, useEffect} from 'react'
import makeStyles from '@mui/styles/makeStyles';

import newRowsPager from 'components/organisms/newRowsPager'

import Modal from '@mui/material/Modal'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default ({onClick, headers, onPage, baseQuery, ListItemComponent, header}) => {
  const classes = useStyles()
  const [opened, setOpened] = useState(false)
  const setOpen = () => setOpened(true)
  const setClose = () => setOpened(false)
  const handleClick = (row) => {
    onClick(row)
    setClose()
  }
  
  const pager = newRowsPager({headers, onPage, baseQuery,
    rowComponent: ({row, updateRowById}) => (
      <React.Fragment>
        {/*<TableCell>
          <ResourceStatusButton 
            resource_key="authors" 
            resource={row} 
            updateRowById={updateRowById} />
        </TableCell>*/}
        <TableCell>
          <IconButton size="small" color="primary" onClick={()=>handleClick(row)}><AddCircleIcon /></IconButton>
        </TableCell>
        <ListItemComponent {...row} />
      </React.Fragment>
    )
  })
  const render = (
    <Modal open={opened} onClose={()=>setClose()}>
      <div style={{top:0,bottom:0,left:0,right:0}} className={classes.paper}>
        {header}
        <div className={classes.paperInner}>
          {pager.render}
        </div>
      </div>
    </Modal>
  )

  return {
    render, opened, setOpened, setOpen, setClose,
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
