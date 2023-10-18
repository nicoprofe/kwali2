import React from 'react'
import { Link } from 'react-router-dom'

export default function Productos() {
  return (
    <div className='h-full'>
      <h1 className=' text-gray-900 font-semibold uppercase text-3xl text-center mt-6 mb-6'>Conoce todos nuestros productos</h1>

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
          <Link to='/stickers-para-piso'>
            <img className='h-64 mx-auto' src="/images/productos/ejemplo-piso.jpg" alt="" />
            <p className='text-center uppercase font-semibold text-xl'>Stickers <br /> para piso</p>
          </Link>
          </div>
          <div className='mt-14'>
          <Link to='/imanes' className='mt-14'>
            <img className='h-64 mx-auto' src="/images/productos/ejemplo-iman.png" alt="" />
            <p className='text-center uppercase font-semibold text-xl mt-4'>Magnéticos</p>
          </Link>
          </div>
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
          <div className='mt-14'>
          <Link to='/water-activated-tape' className='mt-14'>
            <img className='h-64 mx-auto' src="/images/productos/ejemplo-watertape.jpg" alt="" />
            <p className='text-center uppercase font-semibold text-xl mt-6'>Water activated tape</p>
          </Link>
          </div>
          <div className='mt-14'>
          <Link to='/planillas-de-stickers' className='mt-14'>
            <img className='h-64 mx-auto' src="/images/productos/ejemplo_planilla stickers.png" alt="" />
            <p className='text-center uppercase font-semibold text-xl mt-6'>Planillas de stickers</p>
          </Link>
          </div>
          <div className='mt-14'>
          <Link to='/muestras' className='mt-14'>
            <img className='h-64 mx-auto' src="/images/productos/ejemplo-muestras.png" alt="" />
            <p className='text-center uppercase font-semibold text-xl mt-6'>Muestras</p>
          </Link>
          </div>
      </div>
    
    </div>
  )
}
