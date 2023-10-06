import React from 'react'
import { Link } from 'react-router-dom'

export default function Promos() {
  return (
    <div className='h-full'>
      <div className='flex flex-col items-center justify-center'>

        <h1 className='text-5xl font-semibold text-gray-900 mt-6 mb-6' >Conoce todas nuestras promociones</h1>

        <div className='bg-secondary-blueLight py-8 w-full flex flex-col items-center justify-center border-2 border-gray-300 '>
          <img src="" alt="" />
          <p className='text-3xl font-extrabold font-outline-2 '>Envíos gratis a partir de $999</p>
        </div>

        <div className='bg-white flex items-center justify-center '>
          <img
          className='h-[700px]' 
          src="/images/productos/ejemplo-watertape.jpg" alt="water activated tape" />
          <div className='flex flex-col items-center justify-center space-y-6'>
            <h1 className='text-5xl font-bold uppercase'>Water activated tape</h1>
            <h2 className='text-4xl font-semibold'>15% de descuento <br />
            utilizando el código <br />
            <span className='text-secondary-green font-semibold text-4xl'>kwalimx</span></h2>
            <p className='text-gray-900 text-sm font-semibold'>Promoción válida durante el mes de agosto de 2023</p>
            <Link to='/water-activated-tape'>
            <button 
            className='bg-secondary-green hover:bg-lime-400 active:bg-lime-600 px-8 py-2 
            text-white text-xl font-medium rounded-md transition duration-200 ease-in-out'
            >Ir a comprar</button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
