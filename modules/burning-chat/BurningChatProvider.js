import {createContext, useContext, useEffect, useState} from 'react'
import {CircularProgress} from '@material-ui/core'
import { initializeApp } from "firebase/app"
import { getAuth, signInWithCustomToken, onAuthStateChanged } from "firebase/auth"
import {initializeBurningChat} from 'modules/burning-chat'
import {useSession} from 'modules/rvadmin/core/SessionProvider'

const BurningChatContext = createContext({})

export default function BurningChatProvider({firebaseConfig, children}) {
  const {api} = useSession()
  const [chat, setChat] = useState()

  const fetchFirebaseToken = () => {
    return api.fetch(`/chat_room_doors/sessions`, {method: 'POST'}).then(response=>{
      const access_token = response.data.access_token
      const timestamp = Date.now()
      localStorage.setItem("firebaseAuth", JSON.stringify({access_token, timestamp}))
      return access_token
    })
  }

  const getFirebaseAuthInStorage = () => {
    const data = localStorage.getItem("firebaseAuth") || '{}'
    return JSON.parse(data)
  }

  const getFirebaseToken = () => {
    const {access_token, timestamp} = getFirebaseAuthInStorage()
    if (!access_token || !timestamp) return fetchFirebaseToken()
    if (timestamp + (30*60*1000) < Date.now()) return fetchFirebaseToken()
    return new Promise((resolve, reject)=>resolve(access_token))
  }

  const initializeChat = (firebaseConfig, onSuccess) => {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    onAuthStateChanged(auth, user=>{
      console.log('onAuthStateChanged:user', user)
      if (!user) {
        // logout
        return
      }
      user.getIdToken().then(currentToken=>{
        console.log('Initializing burning chat')
        const chat = initializeBurningChat({app, auth, token: currentToken})
        onSuccess(chat)
      })
    })

    return {app, auth}
  }

  useEffect(()=>{
    const {app, auth} = initializeChat(firebaseConfig, (chat)=>setChat(chat))
    setInterval(()=>{
      getFirebaseToken().then(token=>{
        signInWithCustomToken(auth, token).then(userCredential=>{
          console.log('signInWithCustomToken:userCredential', userCredential)
        })
      })
    }, 1000*60*10)
  }, [])

  return (
    <BurningChatContext.Provider value={{chat}}>
      {chat ? children : <CircularProgress />}
    </BurningChatContext.Provider>
  )
}

export const useBurningChat = () => useContext(BurningChatContext)
