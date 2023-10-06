import React from 'react'
import { Link } from 'react-router-dom'

export default function Stickers() {
  return (
    <div className='h-full'>
      <h1 className=' text-gray-900 font-semibold uppercase text-3xl text-center mt-6 mb-6'>Conoce todos nuestros stickers</h1>

      <div className='bg-secondary-green'>
        <p className='text-2xl text-gray-900 font-semibold uppercase text-center py-3'>Envíos gratis a partir de $999 o más</p>
      </div>

      <div className='sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 mb-10'>
      <Link to='/stickers/mate'>
            <img className='h-64 mx-auto' src="/images/productos/ejemplo-matte.png" alt="" />
            <p className='text-center uppercase font-semibold text-xl'>Stickers <br /> mate</p>
          </Link>
          <Link to='/stickers/holograficos'>
            <img className='h-64 mx-auto' src="/images/productos/ejemplo-holografico.png" alt="" />
            <p className='text-center uppercase font-semibold text-xl'>Stickers <br /> holográficos</p>
          </Link>
          <Link to='/stickers/brillantes'>
            <img className='h-64 mx-auto' src="/images/productos/ejemplo-brillante.png" alt="" />
            <p className='text-center uppercase font-semibold text-xl'>Stickers <br /> brillantes</p>
          </Link>
          <Link to='/stickers/transparentes'>
            <img className='h-64 mx-auto' src="/images/productos/ejemplo-transparente.png" alt="" />
            <p className='text-center uppercase font-semibold text-xl'>Stickers <br /> transparentes</p>
          </Link>
          <Link to='/stickers/espejo'>
            <img className='h-64 mx-auto' src="/images/productos/ejemplo-espejo.png" alt="" />
            <p className='text-center uppercase font-semibold text-xl'>Stickers <br /> espejo</p>
          </Link>
          <Link to='/stickers/metal-silver'>
            <img className='h-64 mx-auto' src="/images/productos/ejemplo-metalsilver.png" alt="" />
            <p className='text-center uppercase font-semibold text-xl'>Stickers <br /> metal silver</p>
          </Link>
          <Link to='/stickers/metal-gold'>
            <img className='h-64 mx-auto' src="/images/productos/ejemplo-metalgold.png" alt="" />
            <p className='text-center uppercase font-semibold text-xl'>Stickers <br /> metal gold</p>
          </Link>
          <div className='mt-14 md:mt-0'>
          <Link to='/stickers-de-piso'>
            <img className='h-64 mx-auto' src="/images/productos/ejemplo-piso.jpg" alt="" />
            <p className='text-center uppercase font-semibold text-xl'>Stickers <br /> para piso</p>
          </Link>
          </div>

      </div>
    
    </div>
  )
}

