import {useState} from 'react'
import {makeStyles, Modal} from '@material-ui/core'

const useStyles = makeStyles({
  img: {
    objectFit: 'contain',
  },
})

export default function Image({publish_url, variant_urls, onClick, ...props}) {
  const classes = useStyles()
  const url = variant_urls.thumbnail || publish_url
  // const url = publish_url
  const handleClick = () => onClick && onClick(publish_url)
  return <img className={classes.img} src={url} onClick={handleClick} {...props} />
}

export function newImageZoomModal() {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState()
  const show = url => {
    setUrl(url)
    setOpen(true)
  }

  const render = (
    <Modal
      open={open}
      onClose={()=>setOpen(false)}>
      <img src={url} />
    </Modal>
  )

  return {render, show}
}