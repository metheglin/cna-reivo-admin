import React from 'react'
import Button from '@mui/material/Button'
import {getHandleError} from '../utils/Api'
import { SnackbarProvider, useSnackbar } from 'notistack'

export default function FlashProvider({children}) {
  const notistackRef = React.createRef()
  const onClickDismiss = key => () => { 
    notistackRef.current.closeSnackbar(key)
  }
  return (
    <SnackbarProvider 
      maxSnack={3}
      ref={notistackRef}
      action={(key)=>(
        <Button onClick={onClickDismiss(key)}>Dismiss</Button>
      )}>
      {children}
    </SnackbarProvider>
  )
}

export const useFlash = () => {
  const { enqueueSnackbar } = useSnackbar()
  const enqueuePermanentError = (message)=>enqueueSnackbar(message, {variant: 'error', persist: true})
  const handleApiError = getHandleError({messenger: enqueuePermanentError})
  
  return {
    enqueueSnackbar, enqueuePermanentError, handleApiError
  }
}
