import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'


export default function Home() {
  const navigate = useNavigate()
  const isDesktop = useMediaQuery({minWidth: 993 })

  return (
    <div className='items-center justify-center bg-white '>


      <div className='w-full md:-translate-y-[15vh] flex flex-col items-center justify-center'>
        <img 
        className=' ' 
        src="/images/identidad/elementos web-17.png" alt="" /> 
        <img 
        className='absolute top-[18vh] w-[98%] md:w-[90%]'
        src="/images/identidad/elementos web-18.png" alt="" />
      </div>
      

      {/* <div className='flex items-center justify-center mt-24 '>
         <img
        className='absolute top-28 md:w-[1100px]' 
        src="/images/transparentes/texto_losmejoresstickers-16.png" alt="" /> 
      </div> */}

      {/* <h1 className='px-3 md:px-0 text-center mt-24 text-primary-blueDark mt-26 text-4xl md:text-5xl uppercase font-montserrat font-extrabold font-outline-2'>
        Tus calcomanías a un click de distancia</h1> */}

      <p className='text-center mt-0 text-2xl md:text-[5vh] font-bold text-gray-800 md:-translate-y-[17vh] '>
        Productos completamente personalizados</p>  
      
      <div className='mt-[4vh] flex items-center justify-center md:-translate-y-[17vh] '>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

          <div
          onClick={() => navigate('/stickers')}
           className='flex flex-col items-center justify-center cursor-pointer'>
            <img className='z-10 h-[42vh]' src="/images/brillosa.png" alt="productos" />
            <p className='uppercase text-[3.5vh] text-gray-700 font-bold '>Stickers</p>
            <div className='absolute bg-secondary-green rounded-full p-[18vh]'/>
          </div>
          <div
          onClick={() => navigate('/imanes')}
           className='flex flex-col items-center justify-center cursor-pointer'>
          <img className='z-10 h-[42vh]' src="/images/iman.png" alt="productos" />
          <p className='uppercase text-[3.5vh] text-gray-700 font-bold '>Magneticos</p>
          <div className='absolute bg-secondary-green rounded-full p-[18vh]'/>
          </div>
          <div
          onClick={() => navigate('/stickers-para-piso')}
           className='flex flex-col items-center justify-center cursor-pointer'>
          <img className='z-10 h-[42vh]' src="/images/piso2-10 1.png" alt="productos" />
          <p className='uppercase text-[3.5vh] text-gray-700 font-bold '>Para piso</p>
          <div className='absolute bg-secondary-green rounded-full p-[18vh]'/>
          </div>
        </div>

        


      </div>
      <div className='mb-44 md:mb-[10vh]'></div>

      <div className='bg-secondary-blueLight flex flex-col items-center justify-center space-y-[8vh]  -translate-y-[17vh]'>
      <p className='mt-[9vh] text-center text-3xl md:text-[6.7vh] font-bold uppercase text-gray-900'>Los mejores {isDesktop ? '' : <br />} stickers</p>
      {/* <img className='' src="/images/transparentes/texto_losmejoresstickers-16.png" alt="" /> */}
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
                  <img className='h-[20vh]' src="/images/iconos/icono-paginaweb.png" alt="Impresión" />
                  <p className='m-[5vh] md:m-[10vh] text-[3.2vh] font-semibold text-center'>Pruebas de impresión<br />digitales sin costo.</p>
                </div>

              </div>  
      </div>

     

     <div 
     className='flex flex-wrap h-[70vh] md:h-[75vh] items-center justify-center 
     space-x-0 md:space-x-[22vh] mt-0 md:mt-0  -translate-y-[22vh]'>

        <div className='mb-[8vh] mt-[9vh] md:mt-0 flex flex-col items-center justify-center space-y-6 md:space-y-[11vh]'>
          <p className='text-center text-3xl  md:text-[8vh] md:leading-[8vh] font-bold text-gray-900'>¿Aún no estás <br /> convencido?</p>
          <Link to={"/muestras"}>
            <button className='px-3 md:px-[5vh] py-[2vh] text-2xl md:text-[4vh] font-semibold bg-secondary-blueLight hover:bg-sky-200 active:bg-sky-400
            text-gray-900 active:text-white'>
              Pide tus muestras
            </button>
          </Link>
        </div>
        
        <div className='flex flex-col items-center justify-center -translate-x-20 md:translate-x-0 '>
          <img className='h-[100%] md:h-[110vh]' src="./images/KWALIHOLA-10 1.png" alt="muestras" />
          <img className='absolute h-[25vh] md:h-[35vh] ml-[50vh] md:ml-[70vh] mb-0' src="./images/MUESTRAS MOCKUP-04 1.png" alt="muestras" />
        </div>
      
     </div>
    </div>
  )
}
