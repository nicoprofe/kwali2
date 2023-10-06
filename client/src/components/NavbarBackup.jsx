import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NavLinks from './NavLinks'
import Button from './Button'
import { FaSearch, FaCartShopping } from 'react-icons/fa'
import { BsPersonCircle, BsFillCartFill } from 'react-icons/bs'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import SidePanel from '../components/SidePanel'

const NavbarBackup = () => {

    // cart
    const [ isPanelOpen, setIsPanelOpen ] = useState(false)

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen)
    }

    const [ open, setOpen ] = useState(false)

    const [ pageState, setPageState ] = useState(<div className='text-xs'>Inicia sesión <br /> Registrate </div>)
    const location = useLocation()
    const navigate = useNavigate()


    const auth = getAuth()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setPageState("Mis Pedidos")
            } else {
                setPageState(<div className='text-xs'>Inicia sesión <br /> Registrate </div>)
            }
        })
    }, [auth])



  return (
    <nav className={ `bg-secondary-blueLight border-b-4 shadow-inner ${
        isPanelOpen ? 
        "sticky top-0" 
        : ""}`}>

        <div className='flex items-center justify-around font-medium h-[102px]'>

            <div className='z-50 p-5 md:w-auto w-full flex justify-between'>

                <Link to={"/"}>
                <img src="/images/identidad/isotipo.png" alt="logo"
                className='md:cursor-pointer h-24' />
                </Link>

                <div
                onClick={() => setOpen(!open)} 
                className='text-3xl md:hidden'>
                 <ion-icon name={`${ open ? "close" : "menu"}`}></ion-icon>
                </div>

            </div>

            <ul className='md:flex hidden items-center uppercase gap-8'>
                <NavLinks/>
                <li>
                    <Link to={"/como-ordenar"} className='py-7 px-3 inline-block uppercase'>
                        Como ordenar
                    </Link>
                </li>
                <li>
                    <Link to={"/faq"} className='py-7 px-3 inline-block uppercase'>
                        Faq
                    </Link>
                </li>
                <li>
                    <Link to={"/conocenos"} className='py-7 px-3 inline-block uppercase'>
                        Conocenos
                    </Link>
                </li>
                <li>
                    <Link to={"/promos"} className='py-7 px-3 inline-block uppercase'>
                        Promos
                    </Link>
                </li>
            </ul>
            {/* <div className='md:block hidden'>
                  <Button/>
            </div> */}
            <div className='md:flex hidden items-center justify-center space-x-3'>
                {/* <Button/> */}
                
                <FaSearch className='text-xl cursor-pointer'/>
                <BsFillCartFill 
                onClick={togglePanel}
                className='text-xl cursor-pointer'/>
                

                <div className='bg-gray-500 py-7 px-[3px] rounded'></div>

                <div
                onClick={() => navigate("/profile")} 
                className='flex items-center justify-center space-x-2 cursor-pointer'>
                    <BsPersonCircle className='text-xl'/>
                    <div>
                        {pageState}
                    {/* <p className='text-xs'>Inicia sesión</p>
                    <p className='text-xs'>Registrate</p> */}
                    </div>
                </div>

            </div>
            {/* mobile */}
            <ul className={`absolute z-20 md:hidden bg-white w-full h-full bottom-0 py-24 pl-4
            duration-500 ${open ? "left-0" : "left-[-100%]"}`}>
                {/* <li>
                    <Link to={"/"} className='py-7 px-3 inline-block'>
                        Home
                    </Link>
                </li> */}
                <NavLinks/>
                <div className='py-5'>
                    <Button/>
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
