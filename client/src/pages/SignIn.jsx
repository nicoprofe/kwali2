import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { style } from "../components/Styles"
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import OAuth from "../components/OAuth"
import { useMediaQuery } from 'react-responsive'


export default function SignIn() {
    const isDesktop = useMediaQuery({ minWidth: 993})

    const navigate = useNavigate()

    const [ showPassword, setShowPassword ] = useState(false)

    const [ formData, setFormData ] = useState({
        email: "",
        password: "",
    })
    
    const { email, password } = formData

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
            const userCredential = await signInWithEmailAndPassword(auth, email, password) 
                if(userCredential.user) {
                    navigate("/")
                }
            

        } catch (error) {
           toast.error("Debemos corregir algun dato") 
        }

    }

  return (
        <div>
            <h1 className='text-3xl text-center font-bold mt-6'>Iniciar Sesión</h1>

            <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>

                <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
                    <img src="/images/brillosa.png" alt="iniciar sesion"
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

                {isDesktop 
                ? <div className='flex justify-between whitespace-nowrap text-sm sm:text-[15px]'>
                        <p className='mb-6'>¿No tienes una cuenta?  
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
                  : <div className='flex flex-col text-md lg:text-lg'>

                        <div className='flex justify-between mb-6'>
                        <p className=''>¿No tienes una cuenta?</p>
                        <Link to="/sign-up"
                        className='ml-1 text-red-600 hover:text-red-700 transition duration-200 ease-in-out'>
                            Registrate</Link>
                        </div>    

                        <Link to="/forgot-password" 
                        className='ml-1 mb-6 text-start text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>
                            Recuperar password</Link>
                   </div>    
              } 

                    <button 
                    type='submit'
                    className={style[0].button} >
                        Iniciar Sesión
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
