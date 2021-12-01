
export default function Media({contentState, block, blockProps}) {
  const {url, type} = contentState.getEntity(block.getEntityAt(0)).getData()
  return (
    <div>
      <img src={url} style={style} />
    </div>
  )
}

const style = {
  width: 'auto',
  maxWidth: '400px',
}