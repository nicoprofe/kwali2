import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaCartShopping } from 'react-icons/fa'
import { BsPersonCircle, BsFillCartFill } from 'react-icons/bs'

export default function Header() {
  return (
    <div>
      <header className='bg-secondary-blueLight h-28 flex flex-row items-center justify-between px-5 border-b shadow-4xl stiky z-50 top-0'>
        <div>
          <img className='h-20 cursor-pointer' src="./images/iman-11 1.png" alt="" />
        </div>
        <div>
          <ul className='space-x-20 font-semibold uppercase'>
           
              <Link>productos</Link>
              <Link>como ordenar</Link>
              <Link>faq</Link>
              <Link>conocenos</Link>
              <Link>contacto</Link>
              <Link>promos</Link>
              

             
          </ul>
        </div>

        <div className='flex items-center justify-center space-x-2'>
            <FaSearch className='text-xl'/>
            <BsFillCartFill className='text-xl'/>
            <div className='bg-gray-500 py-7 px-[3px] rounded'></div>
            <div className='flex items-center justify-center space-x-2'>
                <BsPersonCircle className='text-xl'/>
                <div>
                  <p className='text-xs'>Inicia sesión</p>
                  <p className='text-xs'>Registrate</p>
                </div>
            </div>
            
        </div>
       
      </header>
    </div>
  )
}
