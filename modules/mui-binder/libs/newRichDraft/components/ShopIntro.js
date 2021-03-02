import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card, CardHeader,
  // Avatar, 
  CardMedia, CardContent, 
  Typography, CardActions, 
  IconButton,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

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

export const generateShopIntro = ({handleEdit})=>(props)=><ShopIntro handleEdit={handleEdit} {...props} />
export const ShopIntro = ({blockProps, handleEdit}) => {
  const classes = cardStyles()
  const {
    shop_id,
    shop_name,
    shop_tel,
    shop_address,
    shop_open_hours,
    shop_holidays,
    shop_link,
    thumbnail,
    introduction,
  } = blockProps
  return (
    <Card className={classes.root}>
      {/*<CardHeader
        title={name}
        subheader={subtitle}
      />*/}
      <CardMedia
        className={classes.media}
        image={thumbnail || "default"}
        title={shop_name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {shop_name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {introduction}
        </Typography>
        <Typography variant="caption" color="textSecondary" component="p">
          電話番号: {shop_tel}
        </Typography>
        <Typography variant="caption" color="textSecondary" component="p">
          住所: {shop_address}
        </Typography>
        <Typography variant="caption" color="textSecondary" component="p">
          営業時間: {shop_open_hours}
        </Typography>
        <Typography variant="caption" color="textSecondary" component="p">
          定休日: {shop_holidays}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {handleEdit && <IconButton onClick={()=>handleEdit(blockProps)}>
          <EditIcon />
        </IconButton>}
        <Typography variant="caption" color="textSecondary" component="p">
          ※ このカードは公開時のレイアウトとは異なります。 ({shop_id})
        </Typography>
      </CardActions>
    </Card>
  )
}
export default ShopIntro
