import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import Box from '@material-ui/core/Box'
import TableCell from '@material-ui/core/TableCell'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'
import Badge from '@material-ui/core/Badge'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button';

import {ItemListTemplate} from 'components/organisms/newRowsPager'
import ShopListItem from 'components/pages/Shops/parts/ListItemTiny'
import newShopsSearch from 'components/molecules/forms/newShopsSearch'
import Uploader from 'components/molecules/forms/Uploader'
import AssetCard from 'components/molecules/AssetCard'
import newTextField from 'components/molecules/forms/newTextField'

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: '86%',
    height: '86%',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 3, 3),
  },
  selected: {
    backgroundColor: theme.palette.primary.light,
  },
}))

export default ({assetsModule, editorRef, editorState, setContentState, handleClose}) => {
  const classes = useStyles()
  const shopSearch = newShopsSearch({baseQuery: {}, defaultValue: ""})
  const {render, loading, shops} = shopSearch

  const [selectedShop, setSelectedShop] = useState()
  const [selectedAsset, setSelectedAsset] = useState()
  const text = newTextField({
    label: "紹介文", fullWidth: true, multiline: true, rows: 6,
  })
  const onClickShop = (shop)=>setSelectedShop(shop)
  const onClickAsset = (asset)=>setSelectedAsset(asset)
  const onSubmit = ()=>{
    const data = {
      shop_id: selectedShop.id,
      shop_name: selectedShop.shop_name,
      shop_tel: selectedShop.tel_basic,
      shop_address: selectedShop.address,
      shop_open_hours: selectedShop.open_hours,
      shop_holidays: selectedShop.holidays,
      shop_link: selectedShop.url_path,
      thumbnail: selectedAsset ? 
        selectedAsset.publish_url : 
        (selectedShop.images.length>0) && selectedShop.images[0].publish_url,
      introduction: text.value,
    }
    editorRef.current.insertAtomicBlock("shopintro", data)
    handleClose()
  }

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open
      onClose={()=>{}}>
      <div style={{top:0,bottom:0,left:0,right:0}} className={classes.paper}>
        <h2 id="simple-modal-title">
          <IconButton size="small" color="secondary" 
            onClick={()=>handleClose()}>
            <CancelIcon />
          </IconButton>
          <Button
            onClick={onSubmit}
            variant="contained"
            color="primary"
            size="medium"
            disabled={!selectedShop}>ショップ紹介を追加</Button>
        </h2>

        <Grid container spacing={2} style={{height: '100%'}}>
          <Grid item container xs={12} md={6} direction="column" spacing={1} style={{height: '90%'}}>
            <Grid item style={{maxHeight: '110px'}}>
              {render}
            </Grid>
            <Grid item style={{flex: 1, 'overflowY': 'scroll'}}>
              {loading && <CircularProgress size={24} />}
              {shops.length > 0 && <ItemListTemplate rows={shops}
                headers={['', 'スラグ', '名前',]} 
                rowComponent={({row})=>(
                  <React.Fragment>
                    <TableCell>
                      {
                        (selectedShop && selectedShop.id === row.id) ?
                          (<CheckCircleIcon />) :
                          (<IconButton size="small" color="primary" 
                            onClick={()=>onClickShop(row)}>
                            <AddCircleIcon />
                          </IconButton>)
                      }
                    </TableCell>
                    <ShopListItem {...row} />
                  </React.Fragment>
                )} />}
            </Grid>
          </Grid>
          <Grid item container xs={12} md={6} spacing={1}>
            <Grid item xs={12}>
              {text.render}
            </Grid>
            <Grid item xs={12}>
              <Uploader onDrop={assetsModule.onDrop} />
            </Grid>
            <Grid item container xs={12}>
              {assetsModule.assets.map(item => (
                <Grid item key={item.id} xs={4} sm={3} md={2}>
                  {
                    (selectedAsset && selectedAsset.id === item.id) ?
                      (<Badge color="secondary" badgeContent="✓"><AssetCard item={item} onClick={onClickAsset} /></Badge>) :
                      (<AssetCard item={item} onClick={onClickAsset} />)
                  }
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Modal>
  )
}