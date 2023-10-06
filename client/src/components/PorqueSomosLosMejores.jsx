import React from 'react'

export default function PorqueSomosLosMejores() {
  return (
    <div className='bg-white flex flex-col items-center justify-center space-y-14'>
      {/* <p className='mt-14 text-center text-5xl font-bold uppercase text-gray-900'>Los mejores stickers</p> */}
      <img className='w-[95%] md:w-1/2 mt-14' src="/images/transparentes/texto_porquesomoslosmejores.png" alt="" />
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                <div className='flex flex-col items-center justify-center'>
                  <img className='h-36' src="/images/iconos/icono-envios.png" alt="Delivery" />
                  <p className='m-14 text-2xl font-semibold text-center'>Envios a todo el país.<br />Obtén tus productos<br />desde casa.</p>
                </div>

                <div className='flex flex-col items-center justify-center' >
                  <img className='h-36' src="/images/iconos/icono-numero1.png" alt="Materiales" />
                  <p className='m-14 text-2xl font-semibold text-center'>Materiales de excelente<br />calidad.</p>
                </div>

                 <div className='flex flex-col items-center justify-center' >
                  <img className='h-36 ' src="/images/iconos/icono-paginaweb.png" alt="Impresión" />
                  <p className='m-14 text-2xl font-semibold text-center'>Pruebas de impresión<br />digitales sin costo.</p>
                </div>

              </div>  
      </div>
  )
}
