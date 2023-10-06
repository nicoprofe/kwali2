import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'
import { style } from '../components/Styles'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const [ email, setEmail ] = useState("")

    function handleChange(e) {
        setEmail(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)
            toast.success("El email para resetear el password ha sido envidado")
        } catch (error) {
            toast.error("Email no reconocido")
        }
    }


  return (
    <div>
      <h1 className='text-3xl text-center font-bold mt-6'>Recuperar Password</h1>

        <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>

            <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
                <img src="./images/brillosa mockup-07 2.png" alt="iniciar sesion"
                /> {/* className='w-full rounded-2xl' */} 
            </div>

            <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
                <form onSubmit={handleSubmit}>

                <input 
                    type="email"
                    id='email'
                    value={email}
                    placeholder='Email'
                    onChange={handleChange}
                    className={style[0].input}/>

                <div className='flex justify-between whitespace-nowrap text-sm sm:text-[15px]'>
                        <p className='mb-6'> ¿No tienes una cuenta?  
                        <Link 
                        to="/sign-up"
                        className='ml-1 text-red-600 hover:text-red-700 transition duration-200 ease-in-out'>
                            Registrate
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
                        Recuperar password
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
