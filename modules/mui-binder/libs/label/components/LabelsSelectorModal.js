import {Fragment, useState, forwardRef, useImperativeHandle} from 'react'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  InputLabel,
  ImageList,
  List,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {LabelRow} from './LabelRow'
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
// import {useLabels, LabelsSelectorModal} from 'modules/mui-binder/libs/label'
// 
// const sourceCategories = useLabels({baseQuery: {prefix: '/c/cat'}})
// const categories = useSelector({defaultValue: subject.labels || [], max: 20,})
// 
// return <LabelsSelectorModal selector={categories} sourceLabels={sourceCategories} label="Category" />
const LabelsSelectorModal = forwardRef(({selector, sourceLabels, label}, ref) => {
  const classes = useStyles()
  const {t} = useTranslation()
  const {values, onRemove, onPush, isSelected} = selector
  const [open, setOpen] = useState(false)

  const {prefix, renderSearch} = sourceLabels

  const getItemProps = (item) => {
    const selected = isSelected(item)
    const onClick = () => selected ? onRemove(item) : onPush(item)
    return {item, selected, onClick}
  }

  const renderSelector = (
    <List dense>
      {values.map((item,i) => (<LabelRow key={i} {...getItemProps(item)} />))}
    </List>
  )

  const renderCollection = (
    <List dense>
      {sourceLabels.items.map((item,i) => (<LabelRow key={i} {...getItemProps(item)} />))}
    </List>
  )

  const renderSearchArea = (
    <Grid item container spacing={1} justifyContent="space-between">
      <Grid item className={classes.grow}>{renderSearch}</Grid>
      <Grid item>
        <Link href={`/labels/new${prefix}`} passHref>
          <Button size="small"
            className={classes.button}
            startIcon={<AddIcon />}>
            {t('Add More')}
          </Button>
        </Link>
      </Grid>
    </Grid>
  )

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
        disableEscapeKeyDown
        fullWidth={true}
        maxWidth={false}
        aria-labelledby="confirmation-dialog-title"
        open={open}
        TransitionProps={{
          onEntering: ()=>{}
        }}>
        <DialogContent dividers>
          <Grid container justifyContent="space-between" spacing={1}>
            <Grid item sm={3}>
              <div className={classes.selector}>{renderSelector}</div>
            </Grid>
            <Grid item container sm={9}>
              <Grid item container alignItems="center" spacing={1}>
                <Grid item className={classes.grow}>{renderSearchArea}</Grid>
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

export default LabelsSelectorModal
