
## Setting up

### Install firebase

```
yarn add firebase
  # Check if firebase installed greater than v9
```

### Integrate BurningChatProvider

Change component you want to integrate (ex: `pages/_app.js`).

```diff
+import BurningChatProvider from 'modules/burning-chat/BurningChatProvider'

           <SessionProvider>
-            <Component {...pageProps} />
+            <BurningChatProvider firebaseConfig={{
+                apiKey: "AIzaSyDQ6WPNh7Yi5anYUJUww2JsfytVLTAwJU8",
+                authDomain: "salut-staging.firebaseapp.com",
+                projectId: "salut-staging",
+                storageBucket: "salut-staging.appspot.com",
+                messagingSenderId: "647615132124",
+                appId: "1:647615132124:web:99ff523bc181fa98b69f19",
+                measurementId: "G-97DSZLQWBD"
+              }}>
+              <Component {...pageProps} />
+            </BurningChatProvider>
           </SessionProvider>
```

### Use like this in virtual pages

```javascript
import {useBurningChat} from 'modules/burning-chat/BurningChatProvider'

const {chat} = useBurningChat()
const [rooms, setRooms] = useState()
const [unreadRooms, setUnreadRooms] = useState()

const Page = () => {
  useEffect(()=>{
    chat.rooms.onSnapshot(rooms=>setRooms(rooms))
    chat.unreadRooms.onSnapshot(rooms=>setUnreadRooms(rooms))
  }, [chat])
}
```
