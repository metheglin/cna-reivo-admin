import {
  getFirestore,
  collection, getDocs, query, where, documentId, onSnapshot,
} from "firebase/firestore"
import decode from 'jwt-decode'

export function initializeBurningChat({app, auth, token}) {
  const db = getFirestore(app)
  console.log('token in burnignchat', token)
  const payload = decode(token)
  const defaultRoomIds = Object.keys(payload.permissions)
  const roomIds = defaultRoomIds.includes('all') ? null : defaultRoomIds
  // console.log('payload', payload)
  const rooms = newRooms({db, payload, roomIds})
  const unreadRooms = newUnreadRooms({db, payload})

  return {
    db, rooms, unreadRooms,
  }
}

const snapShotToArray = snapshot => snapshot.docs.map(x=>({id: x.id, ...x.data()}))

function newRooms({db, roomIds}) {
  const roomsDb = collection(db, "rooms")
  const q = roomIds === null ?
    query(roomsDb) :
    query(roomsDb, where(documentId(), "in", roomIds))
  return {
    q,
    getDocs() {return getDocs(q).then(snapshot=>snapShotToArray(snapshot))},
    onSnapshot(callback) {
      return onSnapshot(q, (snapshot)=>callback(snapShotToArray(snapshot)))
    },
  }
}

function newUnreadRooms({db, payload}) {
  const {sub} = payload
  const q = query(collection(db, `unreads/${sub}/rooms`))

  const snapshotNormalized = (snapshot) => {
    const unreadRoomIds = snapShotToArray(snapshot).map(x=>x.id)
    // console.log('unreadRoomIds', unreadRoomIds)
    if (unreadRoomIds.length <= 0) {
      return new Promise((resolve, reject)=>resolve([]))
    }
    const rooms = newRooms({db, roomIds: unreadRoomIds})
    return rooms.getDocs()
  }

  return {
    q,
    getDocs() {return getDocs(q).then(snapshot=>snapshotNormalized(snapshot))},
    onSnapshot(callback) {
      return onSnapshot(q, (snapshot)=>{
        snapshotNormalized(snapshot).then(snapshot2=>{
          callback(snapshot2)
        })
      })
    },
  }
}