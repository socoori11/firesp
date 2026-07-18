import { addDoc, collection, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore'
import { firebaseApp } from './firebase'

const db = getFirestore(firebaseApp)
const orders = collection(db, 'orders')
export const getOrders = async () => (await getDocs(orders)).docs.map((item) => ({ id: item.id, ...item.data() }))
export const addOrder = (data) => addDoc(orders, data)
export const updateOrder = (id, data) => updateDoc(doc(db, 'orders', id), data)
