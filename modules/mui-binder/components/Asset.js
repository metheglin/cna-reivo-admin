import {
  makeStyles, Avatar
} from '@material-ui/core'

export function getThumbnail(item) {
  if (item.rough_content_type !== 'image') return null
  const {publish_url, s3_url, variant_urls} = item
  return (variant_urls && variant_urls.thumbnail) ?
    variant_urls.thumbnail :
    (publish_url || s3_url)
}

export function getSrc(item) {
  const thumbnail = getThumbnail(item)
  return thumbnail ? thumbnail : '/vercel.svg' // TODO: set noimage
}

export function AssetAvatar({item, ...props}) {
  return (<Avatar {...props} variant="rounded" src={getSrc(item)} />)
}

const useStylesForDefaultFile = makeStyles(theme => ({
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

function DefaultFile({}) {
  const classes = useStylesForDefaultFile()
  return (
    <div className={classes.defaultFile}>
      <AttachFileIcon className={classes.defaultFileIcon} />
    </div>
  )
}