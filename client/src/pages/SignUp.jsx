import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase'
import { style } from '../components/Styles'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import OAuth from '../components/OAuth'
import axios from 'axios'
import { useMediaQuery } from 'react-responsive'

export default function SignUp() {
    const isDesktop = useMediaQuery({ minWidth: 993})

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
            
            // Send welcome email to the newly registered user
            if(email) {
                await axios.get(`https://kwali2-server.vercel.app/send-register-emails?email=${email}`)
            }
            

            navigate("/")
            toast.success("El registro fue exitoso")


        } catch (error) {
            toast.error("Something went wrong with the registration")
        }
    }
    
  return (
    <div>
      <h1 className='text-[4.2vh] text-center font-bold mt-[4vh]'>Registrate</h1>

      <div className='flex justify-center flex-wrap items-center px-6 py-[7vh]'>

            <div className='mb-12 md:mb-0'>
                    <img 
                    className='h-[45vh]'
                    src="/images/brillosa.png" alt="iniciar sesion"
                    /> {/* className='w-full rounded-2xl' */} 
            </div>

            <div className='w-full md:w-[70vh] md:ml-[30vh]'>
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
                            className='absolute right-[2vh] top-[2.5vh] text-[2vh] cursor-pointer'
                            onClick={() => setShowPassword((prevState) => !prevState)} />
                        ) 
                        : (
                            <AiFillEye 
                            className='absolute right-[2vh] top-[2.5vh] text-[2vh] cursor-pointer'
                            onClick={() => setShowPassword((prevState) => !prevState)}/>
                        )}
                    </div>

                    {isDesktop 
                    ? <div className='flex justify-between whitespace-nowrap text-sm md:text-[2vh]'>
                    <p className='mb-[4vh]'>¿Tienes una cuenta?  
                    <Link 
                    to="/sign-in"
                    className='ml-[1vh] text-red-600 hover:text-red-700 transition duration-200 ease-in-out'>
                        Login
                    </Link>
                    </p>
                    <Link
                    to="/forgot-password"
                    className='ml-[1vh] text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>
                        Recuperar password
                    </Link>
            </div>
                    : <div className='flex flex-col text-md'>

                        <div className='flex justify-between mb-6'>
                        <p className=''>¿Tienes una cuenta?</p>
                        <Link to="/sign-in"
                        className='ml-1 text-red-600 hover:text-red-700 transition duration-200 ease-in-out'>
                            Login</Link>
                        </div>    

                        <Link to="/forgot-password" 
                        className='ml-1 mb-6 text-start text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>
                            Recuperar contraseña</Link>
                      </div>  
                    }   

                    <button 
                    type='submit'
                    className={style[0].button} >
                        Registrate
                    </button>

                    <div className='flex items-center my-[2vh]
                    before:border-t before:flex-1 before:border-gray-300
                    after:border-t after:flex-1 after:border-gray-300'>
                        <p className='text-[2vh] text-center font-semibold mx-[2vh]'>O</p>
                    </div>

                    <OAuth/>

                    
                </form>
            </div>

      </div>

    </div>
  )
}
