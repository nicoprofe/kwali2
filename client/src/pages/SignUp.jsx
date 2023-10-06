import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase'
import { style } from '../components/Styles'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import OAuth from '../components/OAuth'

export default function SignUp() {
    const navigate = useNavigate()

    const [ showPassword, setShowPassword ] = useState(false)

    const [ formData, setFormData ] = useState({
        name: "",
        email: "",
        password: "",
    })

    const { name, email, password } = formData

    function handleChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const auth = getAuth()
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            updateProfile(auth.currentUser, {
                displayName: name
            })

            const user = userCredential.user
            console.log(user)

            // defines user's role
            const userRole = "guest"

            // delete password for firestore database
            const formDataCopy = {...formData}
            delete formDataCopy.password

            // add time stamp
            formDataCopy.timestamp = serverTimestamp()

            // create collection and navigate to home also create the user document with role in Firestore
            const userDocRef = doc(db, "users", user.uid)
            await setDoc(userDocRef, {
                ...formDataCopy,
                role: userRole, // Add the role field with "guest" value here
            })
            
            navigate("/")
            toast.success("El registro fue exitoso")


        } catch (error) {
            toast.error("Something went wrong with the registration")
        }
    }
    
  return (
    <div>
      <h1 className='text-3xl text-center font-bold mt-6'>Registrate</h1>

      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>

      <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
                    <img src="/images/brillosa.png" alt="iniciar sesion"
                    /> {/* className='w-full rounded-2xl' */} 
                </div>

            <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text"
                    id='name'
                    value={name}
                    placeholder='Nombre Completo'
                    onChange={handleChange}
                    className={style[0].input}/>

                    <input 
                    type="email"
                    id='email'
                    value={email}
                    placeholder='Email'
                    onChange={handleChange}
                    className={style[0].input}/>

                    <div className='relative mb-2'>
                        <input 
                        type={showPassword ? "text" : "password"}
                        id='password'
                        value={password}
                        placeholder='Password'
                        onChange={handleChange}
                        className={style[0].input}/>
                        {showPassword 
                        ? (
                            <AiFillEyeInvisible 
                            className='absolute right-3 top-3 text-l cursor-pointer'
                            onClick={() => setShowPassword((prevState) => !prevState)} />
                        ) 
                        : (
                            <AiFillEye 
                            className='absolute right-3 top-3 text-l cursor-pointer'
                            onClick={() => setShowPassword((prevState) => !prevState)}/>
                        )}
                    </div>

                    <div className='flex justify-between whitespace-nowrap text-sm sm:text-[15px]'>
                        <p className='mb-6'> ¿Tienes una cuenta?  
                        <Link 
                        to="/sign-in"
                        className='ml-1 text-red-600 hover:text-red-700 transition duration-200 ease-in-out'>
                            Login
                        </Link>
                        </p>
                        <Link 
                        to="/forgot-password"
                        className='ml-1 text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>
                            Recuperar password
                        </Link>
                    </div>    

                    <button 
                    type='submit'
                    className={style[0].button} >
                        Registrate
                    </button>

                    <div className='flex items-center my-4
                    before:border-t before:flex-1 before:border-gray-300
                    after:border-t after:flex-1 after:border-gray-300'>
                        <p className='text-center font-semibold mx-4'>O</p>
                    </div>

                    <OAuth/>

                    
                </form>
            </div>






      </div>

    </div>
  )
}
