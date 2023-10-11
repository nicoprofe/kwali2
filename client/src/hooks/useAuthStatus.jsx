import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'

export function useAuthStatus() {
    const [ loggedIn, setLoggedIn ] = useState(false)
    const [ isAdmin, setIsAdmin ] = useState(false)
    const [ checkStatus, setCheckStatus ] = useState(true)

    useEffect(() => {
        const auth = getAuth()

        const fetchData = async () => {
            onAuthStateChanged(auth, async (user) => {
                if(user) {
                    setLoggedIn(true)

                    const userDoc = doc(db, "users", user.uid)
                    const docSnapshot = await getDoc(userDoc)

                    if(docSnapshot.exists()) {
                        const userData = docSnapshot.data()
                        setIsAdmin(userData.role === "admin")
                    } else {
                        setIsAdmin(false)
                    }
                    
                } else {
                    setIsAdmin(false)
                }
                setCheckStatus(false)
            })
        }
        fetchData()


        
    }, [])

  return { loggedIn, isAdmin, checkStatus}
}
