import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore'
import { firebaseApp } from './firebase'

const db = getFirestore(firebaseApp)
const notices = collection(db, 'notices')
export const getNotices = async () => (await getDocs(notices)).docs.map((item) => ({ id: item.id, ...item.data() }))
export const addNotice = (data) => addDoc(notices, data)
export const updateNotice = (id, data) => updateDoc(doc(db, 'notices', id), data)
export const deleteNotice = (id) => deleteDoc(doc(db, 'notices', id))
