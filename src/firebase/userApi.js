import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { firebaseApp } from './firebase'

const db = getFirestore(firebaseApp)
export const getUser = async (id) => { const item = await getDoc(doc(db, 'users', id)); return item.exists() ? item.data() : null }
export const updateUser = (id, data) => setDoc(doc(db, 'users', id), data, { merge: true })
