import { Link } from '@material-ui/core'

export default function LinkInEditor({contentState, entityKey, children}) {
  const {url, className} = contentState.getEntity(entityKey).getData()
  return (
    <Link href={url} className={className} target="_blank">
      {children}
    </Link>
  )
}

// const style = {
//   width: 'auto',
//   maxWidth: '400px',
// }