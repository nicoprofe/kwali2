import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { toast } from 'react-toastify'
import { FcGoogle } from 'react-icons/fc'


export default function OAuth() {
    const navigate = useNavigate()

    async function handleGoogleClick() {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            console.log(user)

            // chek if user exists
            const docRef = doc(db, "users", user.uid)
            const docSnap = await getDoc(docRef)

            if(!docSnap.exists()) {
                setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }

            navigate("/")

        } catch (error) {
            toast.error("Could not authorize with Google")
        }
    }
  return (
    <button 
    type='button'
    onClick={handleGoogleClick}
    className='flex items-center justify-center w-full
    bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900
    shadow-md hover:shadow-lg acitve:shadow-lg transition duration-150 ease-in-out rounded-md'>
        <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
        Continuar con Google
    </button>
  )
}
