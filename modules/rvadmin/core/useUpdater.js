import {useState} from 'react'

export default function useUpdater() {
  const [lastUpdatedAt, setLastUpdatedAt] = useState()
  const update = () => setLastUpdatedAt(Date.now())
  return [lastUpdatedAt, update]
}