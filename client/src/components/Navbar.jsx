import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NavLinks from './NavLinks'
import Button from './Button'
import { FaSearch, FaCartShopping } from 'react-icons/fa'
import { BsPersonCircle, BsFillCartFill } from 'react-icons/bs'
import { RiAdminFill } from 'react-icons/ri'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'
import SidePanel from './SidePanel'
import { useCart } from '../TuPutaHermanContext'
import { createPortal } from 'react-dom'

const Navbar = () => {
    const portalRoot = document.getElementById('portal-root-navbar')

   
    // CONFIG
    const { loggedIn, isAdmin, checkStatus } = useAuthStatus()
    const auth = getAuth()
    const location = useLocation()
    const navigate = useNavigate()

    // PAGE STATE SIGNIN || SIGNOUT
    const [ pageState, setPageState ] = useState(<div className='text-[1.5vh]'>Inicia sesión <br /> Registrate </div>)
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setPageState("Mis Pedidos")
            } else {
                setPageState(<div className='text-[1.5vh]'>Inicia sesión <br /> Registrate </div>)
            }
        })
    }, [auth])
    
    // SIDE PANEL CART
    const [ isPanelOpen, setIsPanelOpen ] = useState(false)
    const [ open, setOpen ] = useState(false)

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen)
    }

    // CART ITEM COUNT
    const { cartItems, setCartItems } = useCart()

    const cartItemCount = cartItems.length 


  return (
   
        <nav className={ `z-50 bg-secondary-blueLight border-b-3 border-b-gray-400 shadow-lg ${
            isPanelOpen ? 
            "sticky top-0" 
            : ""}`}>
    
            <div className='flex items-center justify-around font-medium h-[15vh]'>
    
                <div className='z-50 px-[5vh] md:w-auto w-full flex justify-between'>
    
                    

                    <div className={`relative md:hidden flex px-2 ${cartItemCount === 0 ? 'py-2' : 'py-3'} `}>
                        <BsFillCartFill
                        onClick={() => {

                            togglePanel()
                        }} 
                        className='text-2xl'/>
                        {cartItemCount > 0 ? (
                            <>
                                <div className='absolute bg-secondary-green h-5 w-5 top-0 left-3 rounded-full flex items-center justify-center
                                text-white text-xs font-semibold '>
                                {cartItemCount === 0 ? '' : cartItemCount}
                                </div>
                            </>
                        ) 
                        : ''}

                    </div>

                    <Link to={"/"}>
                    <img src="/images/identidad/isotipo.png" alt="logo"
                    className='md:cursor-pointer h-16 md:h-[13vh]' />
                    </Link>
    
                    <div
                    onClick={() => setOpen(!open)} 
                    className='text-4xl md:hidden'>
                     <ion-icon name={`${ open ? "close" : "menu"}`}></ion-icon>
                    </div>
    
                </div>
    
                <ul className='md:flex hidden items-center uppercase gap-[5vh]'>
                    <NavLinks/>
                    <li>
                        <Link to={"/como-ordenar"} className='py-[5vh] px-[2vh] text-[2.3vh] inline-block uppercase'>
                            Como ordenar
                        </Link>
                    </li>
                    <li>
                        <Link to={"/faq"} className='py-[5vh] px-[2vh] text-[2.3vh] inline-block uppercase'>
                            Faq
                        </Link>
                    </li>
                    <li>
                        <Link to={"/conocenos"} className='py-[5vh] px-[2vh] text-[2.3vh] inline-block uppercase'>
                            Conocenos
                        </Link>
                    </li>
                    <li>
                        <Link to={"/contacto"} className='py-[5vh] px-[2vh] text-[2.3vh] inline-block uppercase'>
                            Contacto
                        </Link>
                    </li>
                    <li>
                        <Link to={"/promos"} className='py-[5vh] px-[2vh] text-[2.3vh] inline-block uppercase'>
                            Promos
                        </Link>
                    </li>
                </ul>
             
                <div className='md:flex hidden items-center justify-center space-x-[1.5vh]'>
                    {/* <Button/> */}
    
                    {loggedIn && (
                        <>
                            {isAdmin && (
                                <>
                                    <Link to={"/admin"}>
                                        <RiAdminFill
                                        className='text-2xl cursor-pointer'/>
                                    </Link>
                                </>
                            )}
                        </>
                    )}
                    
                    <FaSearch className='text-[2.7vh] cursor-pointer'/>
                        <div className='flex relative'>
                            <BsFillCartFill 
                            onClick={togglePanel}
                            className='text-[2.7vh] cursor-pointer'/>
                            {cartItemCount > 0 ? (
                                <>
                                    <div className='absolute top-0 right-0 -mt-4 bg-secondary-green rounded-full w-5 h-5
                                    text-white text-xs font-semibold flex items-center justify-center'>
                                      {cartItemCount === 0 ? "" : cartItemCount}
                                    </div>
                                </>
                            ) : "" }
                            
                        </div>
                    
    
                    <div className='bg-gray-500 py-[4vh] px-[0.3vh] rounded'></div>
    
                    <div
                    onClick={() => navigate("/profile")} 
                    className='flex items-center justify-center space-x-[1vh] cursor-pointer'>
                        <BsPersonCircle className='text-[2.7vh]'/>
                        <div>
                            {pageState}
                        </div>
                    </div>
    
                </div>
                {/* mobile */}
                <ul className={`fixed z-20  md:hidden bg-white w-full h-full bottom-0 py-24 pl-4
                duration-500 ${open ? "left-0" : "left-[-100%]"}`}>
                  
                    <NavLinks toggleHamburguer={() => setOpen(!open)}/>

                    <li 
                    onClick={() => {
                        setOpen(!open)
                        navigate('/como-ordenar')
                    }}
                    className='px-3 mb-7'>
                        Como Ordenar
                    </li>
                    <li 
                    onClick={() => {
                        setOpen(!open)
                        navigate('/faq')
                    }}
                    className='px-3 mb-7'>
                        Faq
                    </li>
                    <li 
                    onClick={() => {
                        setOpen(!open)
                        navigate('/conocenos')
                    }}
                    className='px-3 mb-7'>
                        Conocenos
                    </li>
                    <li 
                    onClick={() => {
                        setOpen(!open)
                        navigate('/contacto')
                    }}
                    className='px-3 mb-7'>
                        Contacto
                    </li>
                    <li 
                    onClick={() => {
                        setOpen(!open)
                        navigate('/promos')
                    }}
                    className='px-3 mb-7'>
                        Promos
                    </li>
                    
                    <div className='p-3'>
                        {/* <Button/> */}
                        {loggedIn && (
                        <>
                            {isAdmin && (
                                <>
                                    <Link
                                    onClick={() => setOpen(!open)} 
                                    to={"/admin"}>
                                        <RiAdminFill
                                        className='text-2xl cursor-pointer'/>
                                    </Link>
                                </>
                            )}
                        </>
                    )}
                    </div>

                    <div className='p-3'>
                        <FaSearch className='text-xl'/>
                    </div>

                    <div className='p-3 '>
                        <button
                        onClick={() => {
                            setOpen(!open)
                            navigate("/profile")
                        }} 
                        className='flex items-center justify-center space-x-2 cursor-pointer'>
                            <BsPersonCircle 
                            className='text-[3vh]'/>
                            <div>
                                {pageState}
                            </div>
                        </button>
                    </div>
                </ul>
            </div>
    
            <div>
                <SidePanel
                isPanelOpen={isPanelOpen}/>
            </div>
            
        </nav>
    )
   

}

export default Navbar
