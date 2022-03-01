import React from 'react'
import {useDropzone} from 'react-dropzone'
import makeStyles from '@mui/styles/makeStyles'
import {useTranslation} from 'react-i18next'

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

export default function Uploader({onDrop, message}) {
  const {t} = useTranslation()
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  const classes = useStyles({isDragActive})
  const renderMessage = () => {
    if (message) return message
    if (isDragActive) return (<p>{t('Drag and drop files here')}</p>)
    return (<p>{t('Drag and drop files here')}</p>)
  }
  
  return (
    <div {...getRootProps()} className={classes.dashedArea}>
      <input {...getInputProps()} />
      {renderMessage()}
    </div>
  )
}