import React from 'react'
import { Link } from 'react-router-dom'

export default function NecesitasAyudaConTusArchivos() {
  return (
    <div className='w-full md:h-52 overflow-hidden flex items-center justify-center'>

        <div className='absolute flex items-center justify-center space-x-8 md:space-x-36'>

            <div className='flex flex-col items-center space-y-6'>
                <p className='text-xl md:text-5xl font-extrabold text-gray-900 md:font-outline-2'>¿Necesitas ayuda con tu archivo?</p>
                <Link to={'/plantillas-editables'}
                className='text-white text-sm whitespace-nowrap md:text-2xl font-semibold 
                px-3 md:px-9 py-2 bg-secondary-green hover:bg-lime-500 active:bg-lime-600
                transition duration-150 ease-in-out '>Descarga nuestras plantillas editables</Link>
            </div>
            <div>
              <img className='h-12 md:h-36' src="/images/transparentes/icono archivos-15.png" alt="" />
            </div>
        </div>

         <img src="/images/identidad/fondo azul-banner.png" alt="" />

      </div>
  )
}
