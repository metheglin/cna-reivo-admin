import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
// import InputLabel from '@material-ui/core/InputLabel'

import newSelectableList from './newSelectableList'
import Uploader from '../components/Uploader'
import AssetCard from '../components/AssetCard'

import useImages from 'modules/rvadmin/core/useImages'

const useStyles = makeStyles(theme => ({
  gridList: {
    // maxHeight: 450,
    // overflowY: 'scroll',
    marginBottom: theme.spacing(1),
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

const newSelectableAssets = ({defaultValue, max, baseQuery, api, apiUpload}) => {
  const accessors = newSelectableList({max, defaultValue})
  const assetsModule = useImages({baseQuery, api, apiUpload})
  const classes = useStyles()
  const {values,pushValue} = accessors
  const renderList = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Uploader onDrop={assetsModule.onDrop} />
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.gridList} spacing={1}>
          {assetsModule.assets.filter(a=>!values.includes(a)).map((item,i) => (
            <Grid item key={i} xs={3} sm={2} md={2}>
              <AssetCard item={item} 
                onClick={(asset)=>pushValue(asset)} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
  const renderSelector = Selector(accessors)
  return {
    assetsModule,
    ...accessors,
    renderList,
    renderSelector,
    render: (
      <React.Fragment>
        {renderList}
        {renderSelector}
      </React.Fragment>
    ),
  }
}
export default newSelectableAssets