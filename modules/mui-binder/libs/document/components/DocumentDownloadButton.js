import {useState} from 'react'
import {
  IconButton, CircularProgress,
} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import {useSession} from 'modules/rvadmin/core/SessionProvider'

export default function DocumentDownloadButton({id}) {
  const {api} = useSession()
  const [loading, setLoading] = useState(false)

  const onClick = () => {
    api.fetch(`/documents/${id}/download_url`, {method: 'POST'}).then(res=>{
      const url = res.data
      // console.log('url',url)
      fetch(url).then(r=>r.blob()).then(res=>{
        const uri = URL.createObjectURL(res)
        const link = document.createElement("a")
        link.href = uri
        link.target = '_blank'
        link.click()
      })

      setLoading(false)
    }).catch(error=>setLoading(false))
  }

  return loading ?
    <CircularProgress /> :
    (<IconButton onClick={onClick}><DownloadIcon /></IconButton>)
}