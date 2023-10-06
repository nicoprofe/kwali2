import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState, useEffect } from 'react'
import { db, storage } from '../firebase'
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'


const initialState = {
    name: '',
    email: '',
    info: '',
    contact: '',
}

export default function AddEditUserBackup() {
    const [ data, setData ] = useState(initialState)
    const { name, email, info, contact } = data
    const [ file, setFile ] = useState(null)
    const [ progress, setProgress ] = useState(null)
    const [ errors, setErrors ] = useState({})
    const [ isSubmit, setIsSubmit ] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    

    useEffect(() => {
        id && getSingleUser()
    }, [id])

    const getSingleUser = async () => {
        const docRef = doc(db, 'crudusers', id)
        const snapshot = await getDoc(docRef)
        if(snapshot.exists()) {
            setData({ ...snapshot.data() })
        }
    }

    const handleChange = (e) => {
        setData({...data, [e.target.placeholder]: e.target.value})
    }

    const validate = () => {
        let errors = {}
        if(!name) {
            errors.name = 'Name is required'
        }
        if(!email) {
            errors.email = 'Email is required'
        }
        if(!info) {
            errors.info = 'Info is required'
        }
        if(!contact) {
            errors.contact = 'Contact is required'
        }
        return errors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // let errors = validate()
        // if(Object.keys(errors).length) return setErrors(errors)
        // After uploading to Firestore
        setIsSubmit(true)
        if(!id) {
           try {
                await addDoc(collection(db, 'crudusers'), {
                    ...data,
                    timestamp: serverTimestamp()
                })
           } catch (error) {
                console.log(error)
           }
        } else {
            await updateDoc(doc(db, 'crudusers', id), {
                ...data,
                timestamp: serverTimestamp()
            })
        }
        navigate('/')
    }

    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name
            const storageRef = ref(storage, file.name)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on('state_changed',(snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progress)
                switch (snapshot.state) {
                    case 'pause':
                        console.log('Upload is paused')
                        break
                    case 'running':
                        console.log('Upload is running')    
                    default:
                        break    
                }
            }, 
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setData((prev) => ({...prev, img: downloadUrl}))
                })
              }
            )
        }
        file && uploadFile()
    }, [file])


  return (
    <div>
       <ul className='sm:grid sem:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        <li>
            {isSubmit ? (<></>) : (
                <>
                <h1>{id ? 'Update User' : 'Add User'}</h1>
                    <form onSubmit={handleSubmit}>
                        <input 
                        value={name}
                        error={errors.name ? { content: errors.name} : null }
                        onChange={handleChange} 
                        type="text" 
                        placeholder='name' />

                        <input 
                        value={email}
                        error={errors.email ? { content: errors.email} : null }
                        onChange={handleChange} 
                        type="text" 
                        placeholder='email' />

                        <textarea 
                        value={info}
                        error={errors.info ? { content: errors.info} : null }
                        onChange={handleChange} 
                        type="text" 
                        placeholder='info' />

                        <input 
                        value={contact}
                        error={errors.contact ? { content: errors.contact} : null }
                        onChange={handleChange} 
                        type="text" 
                        placeholder='contact' />

                        <input 
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}/>

                        <button
                        disabled={progress !== null && progress < 100 }
                        className='bg-teal-600 rounded text-white px-4 py-2'
                        type="submit">Send</button>
                    </form>
                </>
            )}
        </li>
       </ul>
    </div>
  )
}
