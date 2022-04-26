import {Fragment, useState, useEffect, useMemo, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
import makeStyles from '@mui/styles/makeStyles'
import {Grid} from '@mui/material'
import {
  List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, 
  Divider, Typography,
} from '@mui/material'
import CircularProgressWithLabel from 'components/CircularProgressWithLabel'
import {useTranslation} from 'react-i18next'
import useUpdater from 'modules/rvadmin/core/useUpdater'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const uploadWithProgress = (url, opts={}, onProgress) => {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest()
    xhr.open(opts.method || 'get', url)
    for (const k in opts.headers||{})
      xhr.setRequestHeader(k, opts.headers[k])
    xhr.onload = e => res(e.target.responseText)
    xhr.onerror = rej;
    if (xhr.upload && onProgress)
      xhr.upload.onprogress = onProgress
    xhr.send(opts.body)
  })
}

const useUploadLine = ({update, baseQuery, onUploaded}) => {
  const {api, handleApiError, enqueuePermanentError, enqueueSnackbar} = useSession()
  const [info, setInfo] = useState(null)
  const [progress, setProgress] = useState(0)
  const onProgress = data => {
    console.log('progress', data, data.loaded/data.total)
    setProgress(99 * (data.loaded/data.total))
    update()
  }
  const [completed, setCompleted] = useState(false)
  const [uploadedObject, setUploadedObject] = useState()
  const handleCompleted = (data) => {
    onUploaded(data)
    setCompleted(true)
    setUploadedObject(data)
    update()
  }

  const startUpload = (file) => {
    const upload_params = {
      filename: file.name,
      content_type: file.type,
    }
    setInfo(upload_params)
    api.fetch(`/documents/new`, {
      params: upload_params
    }).then(response=>{
      console.log(response)
      const {url, fields, key} = response.data
      const fd = new FormData()
      for (const [k1, value] of Object.entries(fields)) {
        fd.append(k1, value)
      }
      fd.append("file", file)
      uploadWithProgress(url, {
        method: 'POST',
        headers: {"accept": "multipart/form-data"},
        body: fd
      }, onProgress).then(response => {
        console.log(response)
        setTimeout(()=>{
          api.fetch(`/documents`, {
            method: 'POST', 
            body: {
              ...upload_params,
              key: key,
              channel: baseQuery.channel,
            }
          }).then(response=>{
            handleCompleted(response.data)
            // setItems(x=>[response.data, ...x])
            // onUploaded(response.data)
            // setCompleted(true)
            // setUploadedObject(response.data)
            // update()
          }).catch(handleApiError)
        }, 1000)
      }).catch(handleApiError)
    }).catch(handleApiError)
  }

  return {
    info: info || {}, 
    progress, completed, startUpload, uploadedObject,
    isUsing: ()=>!!info,
  }
}

export const useUploader = ({baseQuery, onUploaded}) => {
  // const [loading, setLoading] = useState(false)
  // const [items, setItems] = useState([])
  const {enqueuePermanentError, enqueueSnackbar} = useSession()
  const [lastUpdatedAt, update] = useUpdater()

  const lines = [
    useUploadLine({update, baseQuery, onUploaded}), useUploadLine({update, baseQuery, onUploaded}), useUploadLine({update, baseQuery, onUploaded}),
    useUploadLine({update, baseQuery, onUploaded}), useUploadLine({update, baseQuery, onUploaded}), useUploadLine({update, baseQuery, onUploaded}),
    useUploadLine({update, baseQuery, onUploaded}), useUploadLine({update, baseQuery, onUploaded}), useUploadLine({update, baseQuery, onUploaded}), useUploadLine({update, baseQuery, onUploaded}),
  ]
  const linesAvailable = useMemo(()=>lines.filter(x=>!x.isUsing()), [lastUpdatedAt])
  const linesInUse = useMemo(()=>lines.filter(x=>x.isUsing()), [lastUpdatedAt])
  
  const onDrop = useCallback((files) => {
    if (files.length > linesAvailable.length) {
      enqueuePermanentError(`一度にアップロードできるのは、 ${lines.length} 件までです。`)
      return
    }
    const arrs = files.map((x,i)=>[x, linesAvailable[i]])
    arrs.forEach(arr=>{
      const [file, line] = arr
      line.startUpload(file)
    })
    update()

    // files.forEach(file=>{
    //   startUpload(file)
    // })
    // files.forEach(file => {
    //   const formData = buildUploadFormData(file, baseQuery)
    //   .then(formData => {
    //     apiRaw.fetch('/assets/upload', {
    //       method: 'POST',
    //       body: formData,
    //     }).then(res=>res.json()).then(response=>{
    //       onUploaded(response.data)
    //     })
    //   })
    // })
  }, [linesAvailable])

  

  const render = (
    <Grid container spacing={2}>
      <Grid item xs={12}><Uploader onDrop={onDrop} /></Grid>
      <Grid item xs={12}>
        {linesInUse.length > 0 && <Typography variant="body1">アップロードが完了するまでこのページから離れないでください</Typography>}
      </Grid>
      <Grid item xs={12}>
        <List>
          {linesInUse.map((x,i)=>
            (<Fragment key={i}><Line {...x} /><Divider variant="inset" component="li" /></Fragment>)
          )}
        </List>
      </Grid>
    </Grid>
  )

  return {
    // loading, items, setItems,
    onDrop, render
  }
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
  const {t} = useTranslation()
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  const classes = useStyles({isDragActive})
  const renderMessage = () => {
    if (message) return message
    return (<p>{t('Drag and drop files here')}</p>)
  }
  
  return (
    <div {...getRootProps()} className={classes.dashedArea}>
      <input {...getInputProps()} />
      {renderMessage()}
    </div>
  )
}

const Line = ({info, progress, completed, uploadedObject}) => (
  <ListItem>
    <ListItemAvatar>
      <CircularProgressWithLabel value={completed ? 100 : progress} />
    </ListItemAvatar>
    <ListItemText 
      primary={info.filename} 
      secondary={(
        <Fragment>
          <Typography>{info.content_type}</Typography>
          {/* uploadedObject && <Typography>
            <Link href={`/isp_excels/${uploadedObject.id}`}><a>{`/isp_excels/${uploadedObject.id}`}</a></Link>
          </Typography> */}
        </Fragment>
      )} />
    <ListItemSecondaryAction>
      {completed && <CheckCircleIcon color="primary" />}
    </ListItemSecondaryAction>
  </ListItem>
)