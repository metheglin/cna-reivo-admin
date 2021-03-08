import {useState,useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import {useFlash} from 'modules/rvadmin/core/FlashProvider'
import { makeStyles } from '@material-ui/core/styles'

const imageToCanvas = (img, width) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext("2d")
  if (img.width > width) {
    canvas.width = width
    canvas.height = canvas.width * (img.height / img.width)

    // 
    // Regular
    // 
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    // 
    // With Smoothing
    // https://stackoverflow.com/a/19262385/3988797
    // 

    // const oc = document.createElement('canvas'),
    //   octx = oc.getContext('2d')
    // oc.width = img.width * 0.5
    // oc.height = img.height * 0.5
    // octx.drawImage(img, 0, 0, oc.width, oc.height)

    // // NOTE: The process below is useful for shrinking size drastically in case the image will be more than half.
    // // octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5)
    // // ctx.drawImage(oc, 
    // //   0, 0, oc.width * 0.5, oc.height * 0.5,
    // //   0, 0, canvas.width, canvas.height)

    // ctx.drawImage(oc, 
    //   0, 0, oc.width, oc.height,
    //   0, 0, canvas.width, canvas.height)
    return canvas
  } else {
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0, img.width, img.height)
    return canvas
  }
}
export const getProcessedImage = (file, {maxWidth, variantWidth}) => {
  if (! file.type.match('image.*')) throw Error("Please upload image.")
  return new Promise((resolve, reject)=>{
    const img = new Image()
    img.onerror = (e) => reject("Invalid image.")
    img.onload = () => {
      const mainCanvas = imageToCanvas(img, maxWidth)
      const variantCanvas = imageToCanvas(img, variantWidth)
      mainCanvas.toBlob(mainBlob=>{
        variantCanvas.toBlob(variantBlob=>resolve([mainBlob, variantBlob]), file.type)
      }, file.type)
    }
    img.src = URL.createObjectURL(file)
  })
}

const useImages = ({baseQuery, api, apiUpload}) => {
  const [loading, setLoading] = useState(false)
  const [assets, setAssets] = useState([])
  const params = baseQuery || {}

  const {enqueuePermanentError} = useFlash()

  useEffect(()=>{
    setLoading(true)
    api.fetch('/assets', {params}).then(res=>{
      setAssets(res.data)
      setLoading(false)
    }).catch(error=>setLoading(false))
  }, [])

  const onDrop = (files) => {
    console.log('files', files)
    files.forEach(file=>{
      getProcessedImage(file, {maxWidth: 1100, variantWidth: 300}).then(artifacts=>{
        const [blob, thumbBlob] = artifacts
        const formData = new FormData()
        formData.append("file", blob)
        formData.append("variant1", file, "original")
        formData.append("variant2", thumbBlob, "thumbnail")
        Object.keys(params).forEach(k=>{
          formData.append(k, params[k])
        })
        apiUpload.fetch('/assets/upload', {
          method: 'POST',
          body: formData
        }).then(res=>res.json()).then(response=>{
          // onUploaded(response.data)
          setAssets(_state=>[response.data, ..._state])
        })
      }).catch(error=>enqueuePermanentError(error))
    })
  }

  const render = (<Uploader onDrop={onDrop} />)

  return {
    loading, assets, setAssets,
    onDrop, render
  }
}
export default useImages

const useStyles = makeStyles(theme => ({
  dashedArea: {
    cursor: 'pointer',
    borderRadius: 10,
    transition: '0.15s',
    width: '100%',
    padding: '16px 0',
    boxSizing: 'border-box',
    textAlign: 'center',
    border: props => (
      props.isDragActive ?
        `3px solid ${theme.palette.secondary.main}` :
        `3px dashed ${theme.palette.primary.main}`
    ),
    fontSize: 16,
    fontWeight: 'bold',
    color: props => (
      props.isDragActive ?
        theme.palette.secondary.main :
        theme.palette.primary.main
    ),
  }
}))

export function Uploader({onDrop, message}) {
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  const classes = useStyles({isDragActive})
  const renderMessage = () => {
    if (message) return message
    if (isDragActive) return (<p>Drag and drop files here</p>)
    return (<p>Drag and drop files here</p>)
  }
  
  return (
    <div {...getRootProps()} className={classes.dashedArea}>
      <input {...getInputProps()} />
      {renderMessage()}
    </div>
  )
}