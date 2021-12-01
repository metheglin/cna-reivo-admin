import {Fragment, useState} from 'react'
import {
  makeStyles, Dialog, DialogContent, DialogActions, Button, Grid, InputLabel, 
  GridList, List,
} from '@material-ui/core'
import {LabelRow} from './LabelRow'
import Link from 'next/link'
import AddIcon from '@material-ui/icons/Add'

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
export default function LabelsSelectorModal({selector, sourceLabels, label}) {
  const classes = useStyles()
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
            Add More
          </Button>
        </Link>
      </Grid>
    </Grid>
  )

  return (
    <Fragment>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          {label && <InputLabel shrink>{label}</InputLabel>}
        </Grid>
        <Grid item>
          <Button size="small" onClick={()=>setOpen(true)} color="primary">Modify</Button>
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
}
