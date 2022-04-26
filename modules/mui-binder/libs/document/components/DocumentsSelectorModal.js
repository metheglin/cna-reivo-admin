import {Fragment, useState, forwardRef, useImperativeHandle} from 'react'
import {
  Dialog, DialogContent, DialogActions, Button, Grid, InputLabel, 
  GridList, List,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { DocumentRow } from './DocumentRow'
import Link from 'next/link'
import AddIcon from '@mui/icons-material/Add'
import {useTranslation} from 'react-i18next'

const useStyles = makeStyles(theme=>({
  grow: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  selector: {
    marginTop: 68,
  }
}))

// USAGE:
// 
// import {useDocuments, DocumentsSelectorModal} from 'modules/mui-binder/libs/document'
// 
// const sources = useDocuments({baseQuery: {}})
// const documents = useSelector({defaultValue: subject.documents || [], max: 20,})
// 
// return <DocumentsSelectorModal selector={ documents } sources={sources} sourceUploader={uploader} label="Documents" />
const DocumentsSelectorModal = forwardRef(({selector, sources, sourceUploader, label}, ref) => {
  const classes = useStyles()
  const {t} = useTranslation()
  const {values, onRemove, onPush, isSelected} = selector
  const [open, setOpen] = useState(false)

  const {prefix, renderSearch} = sources

  const getItemProps = (item) => {
    const selected = isSelected(item)
    const onClick = () => selected ? onRemove(item) : onPush(item)
    return {item, selected, onClick}
  }

  const renderSelector = (
    <List dense>
      {values.map((item,i) => (<DocumentRow key={i} {...getItemProps(item)} />))}
    </List>
  )

  const renderCollection = (
    <List dense>
      {sources.items.map((item,i) => (<DocumentRow key={i} {...getItemProps(item)} />))}
    </List>
  )

  const renderUploader = sourceUploader ? sourceUploader.render : null

  // const renderSearchArea = (
  //   <Grid item container spacing={1} justifyContent="space-between">
  //     <Grid item className={classes.grow}>{renderSearch}</Grid>
  //     {/*<Grid item>
  //       <Link href={`/documents`} passHref>
  //         <Button size="small"
  //           className={classes.button}
  //           startIcon={<AddIcon />}>
  //           Add More
  //         </Button>
  //       </Link>
  //     </Grid>*/}
  //   </Grid>
  // )

  useImperativeHandle(ref, ()=>({
    get open() {return open},
    setOpen(x) {return setOpen(x)}
  }))

  return (
    <Fragment>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          {label && <InputLabel shrink>{label}</InputLabel>}
        </Grid>
        <Grid item>
          <Button size="small" onClick={()=>setOpen(true)} color="primary">{t('Modify')}</Button>
        </Grid>
      </Grid>
      
      {renderSelector}

      <Dialog
        className={classes.root}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth={true}
        maxWidth={false}
        onEntering={()=>{}}
        aria-labelledby="confirmation-dialog-title"
        open={open}>
        <DialogContent dividers>
          <Grid container justify="space-between" spacing={1}>
            <Grid item sm={3}>
              <div className={classes.selector}>{renderSelector}</div>
            </Grid>
            <Grid item container sm={9}>
              <Grid item container alignItems="center" spacing={1}>
                <Grid item className={classes.grow}>{renderUploader}</Grid>
              </Grid>
              <Grid item className={classes.grow}>{renderCollection}</Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>setOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
})

export default DocumentsSelectorModal