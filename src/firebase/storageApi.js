import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { firebaseApp } from './firebase'

const storage = getStorage(firebaseApp)
export const uploadImage = async (file, path = `images/${file.name}`) => {
  const snapshot = await uploadBytes(ref(storage, path), file)
  return getDownloadURL(snapshot.ref)
}
