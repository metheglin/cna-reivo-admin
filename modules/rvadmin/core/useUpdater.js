import {useState} from 'react'

export default ()=>{
  const [lastUpdatedAt, setLastUpdatedAt] = useState()
  const update = () => setLastUpdatedAt(Date.now())
  return [lastUpdatedAt, update]
}