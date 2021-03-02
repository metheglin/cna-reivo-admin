import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
// import Button from '@material-ui/core/Button'
import AttachFileIcon from '@material-ui/icons/AttachFile'
// import Api from '../../utils/Api'
// import useFlash from '../../modules/useFlash'

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  cardBox:{
    position: 'relative',
    overflow: 'visible',
    "& span": {
      position: "absolute",
      top: '-3px',
      right: '-3px',
      background: '#f83161',
      padding: '0 5px',
      cursor: 'pointer',
      borderRadius: '50%'
    }
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  cardMedia: {
    paddingTop: '100%',
  },
  cardContent: {
    flexGrow: 1,
  },

  defaultFile: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: theme.palette.grey[10],
    textAlign: 'center',
  },
}));

export default ({item, onClick/*, onDeleteImage*/}) => {
  // const {handleApiError} = useFlash()

  const classes = useStyles()
  const renderVisual = () => {
    if (item.rough_content_type === 'image') {
      const {publish_url, s3_url, variant_urls} = item
      const url = (variant_urls && variant_urls.thumbnail) ?
        variant_urls.thumbnail :
        (publish_url || s3_url)
      return (
        <CardMedia className={classes.cardMedia}
          image={url} />
      )
    }
    return (<DefaultFile className={classes.cardMedia} item={item} />)
  }
  // const onDelete = (item) => {
  //   var confirmation = window.confirm('Are you want to delete the image?');
  //   if(confirmation){
  //     Api.fetchAuth('/assets/'+item.id, {
  //       method: 'PATCH'
  //     }).then(r=>r.json()).then(response=>{
  //       onDeleteImage(response.data.id)
  //     }).catch(error=>{
  //       handleApiError(error)
  //     })
  //   }
  // }
  return (
    <div className={classes.cardBox}>
      <Card className={classes.card} onClick={()=>onClick(item)}>
        {renderVisual()}
        <CardActions>
          <Typography variant="body2">{item.content_type}</Typography>
        </CardActions>
      </Card>
      {/*<span onClick={()=>onDelete(item)}>X</span>*/}
    </div>
  )
}

const DefaultFile = ({item}) => {
  const classes = useStyles()
  return (
    <div className={classes.defaultFile}>
      <AttachFileIcon />
      <span>{item.title}</span>
    </div>
  )
}