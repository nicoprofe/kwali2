import React from 'react'
import { Link } from 'react-router-dom'

export default function Promos() {
  return (
    <div className='h-full'>
      <div className='flex flex-col items-center justify-center'>

        <h1 className='text-2xl text-center md:text-[6vh] font-semibold text-gray-900 mt-[5vh] mb-[5vh]' >Conoce todas nuestras promociones</h1>

        <div className='bg-secondary-blueLight py-[5vh] w-full flex flex-col items-center justify-center border-2 border-gray-300 '>
          <img src="" alt="" />
          <p className='text-2xl md:text-[5vh] text-center font-extrabold font-outline-2 '>Envíos gratis a partir de $999</p>
        </div>

        <div className='bg-white flex-wrap md:flex items-center justify-center '>
          <img
          className='h-96 md:h-[100vh]' 
          src="/images/productos/ejemplo-watertape.jpg" alt="water activated tape" />
          <div className='flex flex-col items-center justify-center space-y-[3vh] 2xl:space-y-[6vh] mb-6 md:mb-0'>

            <h1 className='text-4xl md:text-[6vh] text-center font-bold uppercase'>Water activated tape</h1>

            <div className='flex flex-col items-start justify-center space-y-[1vh] 2xl:space-y-[4vh] 2xl:translate-y-[4vh]'>
            <h2 className='text-3xl md:text-[5vh] font-semibold'>15% de descuento </h2>
            <p className='text-3xl md:text-[5vh] font-semibold' >utilizando el código</p> 
            <p className='text-secondary-green font-semibold text-[5vh] md:-translate-y-[1vh] 2xl:-translate-y-[3vh]'>kwalimx</p>
            </div>

            <p className='text-gray-900 text-[2vh] font-semibold '>
              Promoción válida durante el mes de agosto de 2023
            </p>

            <Link to='/water-activated-tape'>
            <button 
            className='bg-secondary-green hover:bg-lime-400 active:bg-lime-600 px-[2vh] py-[1vh] 
            text-white text-[3vh] font-medium rounded-md transition duration-200 ease-in-out'
            >Ir a comprar</button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
