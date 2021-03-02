import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import TableCell from '@material-ui/core/TableCell'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton';

import {ItemListTemplate} from 'components/organisms/newRowsPager'
import ShopListItem from 'components/pages/Shops/parts/ListItemTiny'
import newShopsSearch from 'components/molecules/forms/newShopsSearch'

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
}))

export default ({editorRef, editorState, setContentState, handleClose}) => {
  const classes = useStyles()
  const shopSearch = newShopsSearch({baseQuery: {}, defaultValue: ""})
  const {render, loading, shops} = shopSearch
  const onClick = (shop)=>{
    const data = {
      shop_id: shop.id, 
      name: shop.shop_name, 
      thumbnail: (shop.images.length > 0) ? shop.images[0].publish_url : null, 
      catchcopy: shop.catchcopy,
      subtitle: shop.genre.name,
    }
    editorRef.current.insertAtomicBlock("shopcard", data)
    handleClose()
  }

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open
      onClose={handleClose}>
      <div style={{top:0,bottom:0,left:0,right:0}} className={classes.paper}>
        <Grid container spacing={2} direction="column" style={{height: '100%'}}>
          <Grid item style={{height: '60px'}}>
            {render}
          </Grid>
          <Grid item style={{flex: 1, 'overflowY': 'scroll'}}>
            <Box>
            {loading && <CircularProgress size={24} />}
            {shops.length > 0 && <ItemListTemplate rows={shops}
              headers={['', 'スラグ', '名前',]} 
              rowComponent={({row})=>(
                <React.Fragment>
                  <TableCell>
                    <IconButton size="small" color="primary" 
                      onClick={()=>onClick(row)}>
                      <AddCircleIcon />
                    </IconButton>
                  </TableCell>
                  <ShopListItem {...row} />
                </React.Fragment>
              )} />}
            </Box>
          </Grid>
        </Grid>
      </div>
    </Modal>
  )
}