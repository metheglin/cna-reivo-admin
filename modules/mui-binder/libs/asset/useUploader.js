import {useState,useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
import { makeStyles } from '@material-ui/core/styles'

const buildUploadFormData = (file, params={}) => {
  return new Promise((resolve)=>{
    const formData = new FormData()
    formData.append("file", file)
    Object.keys(params).forEach(k=>{
      formData.append(k, params[k])
    })
    resolve(formData)
  })
}

export const useUploader = ({baseQuery, onUploaded}) => {
  const {apiRaw} = useSession()
  const onDrop = (files) => {
    files.forEach(file => {
      const formData = buildUploadFormData(file, baseQuery)
      .then(formData => {
        apiRaw.fetch('/assets/upload', {
          method: 'POST',
          body: formData,
        }).then(res=>res.json()).then(response=>{
          onUploaded(response.data)
        })
      })
    })
  }

  const render = (<Uploader onDrop={onDrop} />)

  return {onDrop, render}
}

export default useUploader

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