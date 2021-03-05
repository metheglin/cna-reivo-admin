import React from 'react'
import {makeStyles, Grid, Typography, IconButton, InputLabel} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import newSelectableList from '../newSelectableList'
import AssetCard from '../../components/AssetCard'

const useStyles = makeStyles(theme => ({
  gridList: {
    // maxHeight: 450,
    // overflowY: 'scroll',
    // marginBottom: theme.spacing(1),
  },
  selector: {
    backgroundColor: theme.palette.primary.light,
  },
  assetCard: {
    opacity: 0.7,
  },
}))

export const Selector = ({values, removeValues}) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      {/*<InputLabel>Selector</InputLabel>*/}
      <Grid container className={classes.selector}>
        {values.map(item => (
          <Grid item xs={12} key={item.id}>
            <Grid container alignItems="center" justify="center" direction="row">
              <Grid item xs={3}>
                <div className={classes.assetCard}>
                  <AssetCard item={item} onClick={()=>{}} />
                </div>
              </Grid>
              <Grid item xs={9} style={{textAlign: 'center'}}>
                <Typography>Selected</Typography>
                <IconButton className={classes.icon2}
                  onClick={()=>removeValues(x=>x.id === item.id)}>
                  <CancelIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  )
}

export function List({assets, isSelected, onClick}) {
  const classes = useStyles()
  return (
    <Grid container className={classes.gridList} spacing={1}>
      {assets.filter(a=>!isSelected(a)).map((item,i) => (
        <Grid item key={i} xs={3} sm={2} md={2}>
          <AssetCard item={item} 
            onClick={onClick} />
        </Grid>
      ))}
    </Grid>
  )
}

const newSelectableAssets = ({defaultValue, max, assetsModule}) => {
  const accessors = newSelectableList({max, defaultValue})
  const {values, pushValue} = accessors

  const renderList = (
    <List assets={assetsModule.assets}
      isSelected={(asset)=>values.includes(asset)}
      onClick={(asset)=>pushValue(asset)} />
  )
  const renderSelector = Selector(accessors)
  return {
    ...accessors,
    renderList,
    renderSelector,
    render: (
      <Grid container spacing={2}>
        <Grid item xs={12}>{assetsModule.render}</Grid>
        <Grid item xs={12}>{renderList}</Grid>
        <Grid item xs={12}>{renderSelector}</Grid>
      </Grid>
    )
  }
}
export default newSelectableAssets
