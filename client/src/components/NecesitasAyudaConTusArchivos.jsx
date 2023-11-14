import React from 'react'
import { Link } from 'react-router-dom'

export default function NecesitasAyudaConTusArchivos() {
  return (
    <div className='relative w-full md:h-[32vh] overflow-hidden flex items-center justify-center'>

        <div className='absolute flex items-center justify-center space-x-4 md:space-x-[20vh]'>

            <div className='flex flex-col items-center space-y-3 md:space-y-[6vh] pt-2 md:pt-0 pb-2 md:pb-0'>
                <p className='text-lg md:text-[7vh] font-extrabold text-gray-900 md:font-outline-2'>¿Necesitas ayuda con tu archivo?</p>
                <Link to={'/plantillas-editables'}
                className='text-white whitespace-nowrap text-sm md:text-[3.5vh] font-semibold 
                px-3 md:px-[4vh] py-1 md:py-[2vh] bg-secondary-green hover:bg-lime-500 active:bg-lime-600
                transition duration-150 ease-in-out '>Descarga nuestras plantillas editables</Link>
            </div>
            <div>
              <img className='h-12 md:h-[20vh]' src="/images/transparentes/icono archivos-15.png" alt="" />
            </div>
        </div>

         <img src="/images/identidad/fondo azul-banner.png" alt="" />

      </div>
  )
}
