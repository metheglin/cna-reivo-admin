import React, {useState} from 'react'
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
// import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel'

import newCodeEditor from 'components/molecules/forms/newCodeEditor'
import Modal from '@mui/material/Modal'
import Uploader from '../components/Uploader'
import AssetCard from '../components/AssetCard'
import useImages from 'modules/rvadmin/core/useImages'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export default ({defaultValue, label, editorProps, assetsProps}) => {
  const classes = useStyles()
  const codeEditor = newCodeEditor({...editorProps, defaultValue})
  const assetsModule = useImages(assetsProps || {baseQuery: {}})
  const [modalKind, setModalKind] = useState()

  const render = (
    <React.Fragment>
      {modalKind === 'asset' && (
        <AssetModal 
          assetsModule={assetsModule}
          handleClose={()=>setModalKind(null)}
          onClick={(asset)=>{
            codeEditor.insert(`<img src="${asset.publish_url}">`)
            setModalKind(null)
          }} />
      )}
      {label && <InputLabel className={classes.label}>{label}</InputLabel>}
      <Grid container>
        <Grid item>
          <IconButton color="default" size="medium" onClick={()=>{setModalKind("asset")}}>
            <PhotoLibraryIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="default" size="medium" onClick={()=>codeEditor.toggleLineWrapping()}>
            {codeEditor.lineWrapping ? <ArrowRightAltIcon /> : <KeyboardReturnIcon />}
          </IconButton>
        </Grid>
      </Grid>
      <Box>{codeEditor.render}</Box>
    </React.Fragment>
  )

  return {
    render,
    html: codeEditor.value,
  }
}

const useStyles = makeStyles(theme => ({
  label: {
    marginBottom: theme.spacing(1),
  },
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

const AssetModal = ({assetsModule, onClick, handleClose}) => {
  const classes = useStyles()
  const mod = assetsModule

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open
      onClose={handleClose}>
      <div style={{top:0,bottom:0,left:0,right:0}} className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Uploader onDrop={mod.onDrop} />
          </Grid>
          <Grid item xs={12}>
            <Grid container className={null} spacing={1}>
              {mod.assets.map(item => (
                <Grid item key={item.id} xs={4} sm={3} md={2}>
                  <AssetCard item={item} 
                    onClick={onClick} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Modal>
  )
}
