import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore'
import { firebaseApp } from './firebase'

const db = getFirestore(firebaseApp)
const products = collection(db, 'products')
export const getProducts = async () => (await getDocs(products)).docs.map((item) => ({ id: item.id, ...item.data() }))
export const getProduct = async (id) => { const item = await getDoc(doc(db, 'products', id)); return item.exists() ? { id: item.id, ...item.data() } : null }
export const addProduct = (data) => addDoc(products, data)
export const updateProduct = (id, data) => updateDoc(doc(db, 'products', id), data)
export const deleteProduct = (id) => deleteDoc(doc(db, 'products', id))
