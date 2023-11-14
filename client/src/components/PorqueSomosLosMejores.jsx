import React from 'react'
import { useMediaQuery } from 'react-responsive'

export default function PorqueSomosLosMejores() {
  const isDesktop = useMediaQuery({ minWidth: 993})
  return (
    <div className='bg-white flex flex-col items-center justify-center space-y-[8vh]'>
      {/* <p className='mt-14 text-center text-5xl font-bold uppercase text-gray-900'>Los mejores stickers</p> */}
      <img className='w-[98%] md:w-1/2 mt-[8vh]' src="/images/transparentes/texto_porquesomoslosmejores.png" alt="" />
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                <div className='flex flex-col items-center justify-center'>
                  <img className='h-[20vh]' src="/images/iconos/icono-envios.png" alt="Delivery" />
                  <p className='m-[5vh] md:m-[7vh] text-[3.2vh] font-semibold text-center'>Envios a todo el país.<br />Obtén tus productos<br />desde casa.</p>
                </div>

                <div className='flex flex-col items-center justify-center' >
                  <img className='h-[20vh]' src="/images/iconos/icono-numero1.png" alt="Materiales" />
                  <p className='m-[5vh] md:m-[10vh] text-[3.2vh] font-semibold text-center'>Materiales de excelente<br />calidad.</p>
                </div>

                 <div className='flex flex-col items-center justify-center' >
                  <img className='h-[20vh] ' src="/images/iconos/icono-paginaweb.png" alt="Impresión" />
                  <p className='m-[5vh] md:m-[10vh] text-[3.2vh] font-semibold text-center'>Pruebas de impresión<br />digitales sin costo.</p>
                </div>

              </div>  
      </div>
  )
}
