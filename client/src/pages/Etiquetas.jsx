import React from 'react'
import { Link } from 'react-router-dom'

export default function Etiquetas() {
  return (
    <div className='h-full'>
      <h1 className=' text-gray-900 font-semibold uppercase text-3xl text-center mt-6 mb-6'>Conoce todas nuestras etiquetas</h1>

      <div className='bg-secondary-green'>
        <p className='text-2xl text-gray-900 font-semibold uppercase text-center py-3'>Envíos gratis a partir de $999 o más</p>
      </div>

      <div className='sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 mb-10'>
         
         <div className='mt-14'>
          <Link to='/etiquetas/circulares'>
            <img className='h-64 mx-auto' src="/images/productos/ejemplo-etiquetas circulares.jpg" alt="" />
            <p className='text-center uppercase font-semibold text-xl mt-6'>Etiquetas redondas</p>
          </Link>
          </div>
          <div className='mt-14'>
          <Link to='/etiquetas/ovaladas' className='mt-14'>
            <img className='h-64 mx-auto' src="/images/productos/ejemplo-etiquetas ovaladas.jpg" alt="" />
            <p className='text-center uppercase font-semibold text-xl mt-6'>Etiquetas ovaladas</p>
          </Link>
          </div>
          <div className='mt-14'>
          <Link to='/etiquetas/cuadradas' className='mt-14'>
            <img className='h-64 mx-auto' src="/images/productos/ejemplo-etiquetas cuadradas.jpg" alt="" />
            <p className='text-center uppercase font-semibold text-xl mt-6'>Etiquetas cuadradas</p>
          </Link>
          </div>
          <div className='mt-14'>
          <Link to='etiquetas/rectangulares' className='mt-14'>
            <img className='h-64 mx-auto' src="/images/productos/ejemplo-etiqueta rectangular.jpg" alt="" />
            <p className='text-center uppercase font-semibold text-xl mt-6'>Etiquetas rectangulares</p>
          </Link>
          </div>
      </div>
    
    </div>
  )
}
