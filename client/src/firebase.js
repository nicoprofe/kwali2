import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'



const firebaseConfig = {
  apiKey: "AIzaSyBW88LN2_bAKeVOw7fy2uDbETNfRWgAkv4",
  authDomain: "kwali-7d85d.firebaseapp.com",
  projectId: "kwali-7d85d",
  storageBucket: "kwali-7d85d.appspot.com",
  messagingSenderId: "135464090431",
  appId: "1:135464090431:web:9cd96a38ea46e246faf18a",
}

initializeApp(firebaseConfig)
export const db = getFirestore()
export const storage = getStorage()