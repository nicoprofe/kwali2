import React from 'react'
import { TbTruckDelivery } from 'react-icons/tb'
import { Link } from 'react-router-dom'


export default function Home() {
  return (
    <div className='items-center justify-center bg-white mb-6 h-full md:px-0'>

      {/* <img className='w-full' src="/images/identidad/elementos web-17.png" alt="" /> */}

      <div className='flex items-center justify-center mt-24 '>
        <img
        className='absolute top-28 md:w-[1100px]' 
        src="/images/transparentes/texto_losmejoresstickers-16.png" alt="" />
      </div>

      {/* <h1 className='px-3 md:px-0 text-center mt-24 text-primary-blueDark mt-26 text-4xl md:text-5xl uppercase font-montserrat font-extrabold font-outline-2'>
        Tus calcomanías a un click de distancia</h1> */}

      <p className='text-center mt-56 text-4xl font-bold text-gray-800 '>Productos completamente personalizados</p>  
      
      <div className='mt-7 flex items-center justify-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

          <div className='flex flex-col items-center justify-center'>
            <img className='z-10 h-[300px]' src="/images/brillosa.png" alt="productos" />
            <p className='uppercase text-2xl text-gray-700 font-bold '>Stickers</p>
            <div className='absolute bg-secondary-green rounded-full p-32'/>
          </div>
          <div className='flex flex-col items-center justify-center'>
          <img className='z-10 h-[300px]' src="/images/iman.png" alt="productos" />
          <p className='uppercase text-2xl text-gray-700 font-bold '>Magneticos</p>
          <div className='absolute bg-secondary-green rounded-full p-32'/>
          </div>
          <div className='flex flex-col items-center justify-center'>
          <img className='z-10 h-[300px]' src="/images/piso2-10 1.png" alt="productos" />
          <p className='uppercase text-2xl text-gray-700 font-bold '>Para piso</p>
          <div className='absolute bg-secondary-green rounded-full p-32'/>
          </div>
        </div>

        


      </div>
      <div className='mb-14'></div>

      <div className='bg-secondary-blueLight flex flex-col space-y-14'>
      <p className='mt-14 text-center text-5xl font-bold uppercase text-gray-900'>Los mejores stickers</p>
      {/* <img className='' src="/images/transparentes/texto_losmejoresstickers-16.png" alt="" /> */}
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

     

     <div className=' bg-white flex flex-wrap items-center justify-center 
                        space-x-0 md:space-x-40 mt-14 md:mt-0'>

        <div className='mb-14 flex flex-col items-center justify-center space-y-6'>
          <p className='text-center text-5xl font-bold text-gray-900'>¿Aún no estás <br /> convencido?</p>
          <Link to={"/muestras"}>
            <button className='px-3 py-2 font-semibold bg-secondary-blueLight hover:bg-sky-200 active:bg-sky-400
            text-gray-900 active:text-white'>
              Pide tus muestras
            </button>
          </Link>
        </div>
        
        <div className='flex flex-col items-center justify-center'>
          <img className='h-[600px]' src="./images/KWALIHOLA-10 1.png" alt="muestras" />
          <img className='absolute h-[195px] ml-96 mb-9' src="./images/MUESTRAS MOCKUP-04 1.png" alt="muestras" />
        </div>
      
     </div>
    </div>
  )
}
