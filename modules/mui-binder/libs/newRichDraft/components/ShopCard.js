import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card, CardHeader,
  // Avatar, 
  CardMedia, CardContent, 
  Typography, CardActions, 
} from '@material-ui/core'

const cardStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  avatar: {
    backgroundColor: "tomato"
  }
})

export default ({blockProps}) => {
  const classes = cardStyles()
  const {shop_id, name, thumbnail, catchcopy, subtitle} = blockProps
  return (
    <Card className={classes.root}>
      <CardHeader
        title={name}
        subheader={subtitle}
      />
      <CardMedia
        className={classes.media}
        image={thumbnail || "default"}
        title={name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {catchcopy}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant="caption" color="textSecondary" component="p">
          ※ このカードは公開時のレイアウトとは異なります。 ({shop_id})
        </Typography>
      {/*
        <IconButton 
          aria-label="like card" 
          onClick={handleLiked}>
          <FavoriteIcon />
        </IconButton>
        <IconButton 
          aria-label="share"
          onClick={handleShared}
        >
          <ShareIcon />
        </IconButton>
      */}
      </CardActions>
    </Card>
  )
}