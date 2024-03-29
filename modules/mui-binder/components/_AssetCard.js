import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import AttachFileIcon from '@mui/icons-material/AttachFile'

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
  cardActions: {
    padding: theme.spacing(0.5),
    '& > p': {
      fontSize: 9,
    }
  },

  defaultFile: {
    paddingTop: '100%',
    position: 'relative',
  },
  defaultFileIcon: {
    display: 'block',
    position: 'absolute',
    top: 8,
    left: 0,
    right: 0,
    margin: 'auto',
  }
}));

export default function AssetCard({item, onClick/*, onDeleteImage*/}) {
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
    return (<DefaultFile item={item} />)
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
        <CardActions className={classes.cardActions}>
          <Typography variant="body2">{item.rough_content_type || item.content_type}</Typography>
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
      <AttachFileIcon className={classes.defaultFileIcon} />
    </div>
  )
}
