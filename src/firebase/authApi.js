import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { firebaseApp } from './firebase'

const auth = getAuth(firebaseApp)
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
export const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password)
export const logout = () => signOut(auth)
export { auth }
