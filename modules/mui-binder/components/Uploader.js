import React from 'react'
import {useDropzone} from 'react-dropzone'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  dashedArea: {
    borderRadius: 10,
    transition: '0.15s',
    width: '100%',
    padding: '32px 0',
    boxSizing: 'border-box',
    textAlign: 'center',
    border: props => (
      props.isDragActive ?
        `3px solid ${theme.palette.secondary.main}` :
        `3px dashed ${theme.palette.primary.main}`
    ),
    fontSize: 24,
    fontWeight: 'bold',
    color: props => (
      props.isDragActive ?
        theme.palette.secondary.main :
        theme.palette.primary.main
    ),
  }
}))

export default ({onDrop, message}) => {
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  const classes = useStyles({isDragActive})
  const renderMessage = () => {
    if (message) return message
    if (isDragActive) return (<p>ドラッグドロップで画像を追加できます</p>)
      return (<p>ドラッグドロップで画像を追加できます</p>)
  }
  
  return (
    <div {...getRootProps()} className={classes.dashedArea}>
      <input {...getInputProps()} />
      {renderMessage()}
    </div>
  )
}