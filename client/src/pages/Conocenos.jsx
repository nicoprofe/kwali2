import React from 'react'
import PorqueSomosLosMejores from '../components/PorqueSomosLosMejores'
import { useMediaQuery } from 'react-responsive'

export default function Conocenos() {
  const isDesktop = useMediaQuery({ minWidth: 993})
  return (
    <div className='h-full'>
      <div className='flex flex-col items-center justify-center h-[800px] lg:mb-16 xl:mb-40 2xl:mb-96'>

      <div className='w-full md:-translate-y-[97px] flex flex-col items-center justify-center'>
        <img src="/images/identidad/elementos web-17.png" alt="" />  
        <img 
        className= {`absolute ${isDesktop ? 'mb-72 md:w-1/3' : 'top-20  translate-y-5  mb-72 w-3/4' } `}
        src="/images/transparentes/textos_holasomoskwali.png" alt="conocenos" />

        <div className=''>
          <p className='text-md font-medium pl-6 md:pl-0 pr-6 md:pr-0'>Nuestro objetivo es lograr que tu experiencia de compra sea tan sencilla y cómoda como nunca antes. En {isDesktop ? <br /> : ''}
            Kwali nos enorgullecemos de lo que hacemos y por eso queremos asegurarte que nuestros productos son {isDesktop ? <br /> : ''}
            hechos con la mejor calidad. Con nuestro servicio en linea no tienes que salir de tu casa o hacer largas filas {isDesktop ? <br /> : ''}
            para obtener productos de calidad profesional.</p>
        </div>

          <img
          className='w-3/4 md:w-1/3 mt-16 mb-16 ' 
          src="/images/transparentes/texto_experienciakwali.png" alt="experiencia" />

      <p className='text-md font-medium pl-6 md:pl-0 pr-6 md:pr-0'>
        En Kwali nos aseguraremos de que tus productos salgan justo como los necesitas. Contamos con un equipo {isDesktop ? <br /> : ''}
        de diseño que revisará tus archivos y te ayudará en cada paso necesario. En caso de contar con alguna duda o {isDesktop ? <br /> : ''}
        no encontrar lo que buscas, puedes comunicarte con nosotros y nos encargaremos de darte una solución. {isDesktop ? <br /> : ''}{isDesktop ? <br /> : ''}
        Recuerda que nuestras pruebas de impresión digitales no tienen costo alguna y que nunca imprimimos ningún {isDesktop ? <br /> : ''}
        diseño sin que antes hayas aprobado nuestro trabajo, esto para asegurar tu satisfacción.
      </p>

      <img
      className={`absolute -z-10 ${isDesktop ? 'md:top-[60%] xl:top-[65%] 2xl:top-[70%]  left-[75%] xl:left-[71%] md:h-96' : 'h-40 right-[10%] top-[48%]'} `} 
      src="/images/mascota/kwali-corazon.png" alt="mascota" />
          
      </div>

      

     

     

      

      </div>

      <div className='bg-secondary-blueLight w-full flex flex-wrap items-center justify-center mt-20 md:mt-0 py-16 md:space-x-12'>
        <div>
            <img 
            className='h-96'
            src="/images/productos/ejemplo-brillante.png" alt="stickers" />
        </div>
        <div className='flex flex-col items-center justify-center space-y-12 mb-6'>
            <img 
            className='h-12 md:h-16'
            src="/images/transparentes/textos_nuestrosstickers.png" alt="stickers" />
            <p className='text-start md:text-center font-medium pl-6 md:pl-0 pr-6 md:pr-0 '>Para hacer tus stickers Kwali utilizamos papel de impresión gráfico 3M<sup>TM &nbsp;</sup>Schotch<sup>TM</sup> {isDesktop ? <br /> : ''}
            con adhesivo Comply<sup>TM</sup> IJ35G-10 y IG35G-20 lo que logra obtener un adhesivo permanente {isDesktop ? <br /> : ''}
            con laminado invisible.</p>
            <h2 className='text-2xl font-bold '>Todo lo que necesitas</h2>
            <p className='text-start md:text-center font-medium pl-6 md:pl-0 pr-6 md:pr-0'>Contamos con una amplia variedad de productos y acabados para que tus diseños luzcan {isDesktop ? <br /> : ''}
            justo como lo necesitas, desde cortes Kiss-Cut y Die-Cut, efectos desde mate hasta {isDesktop ? <br /> : ''}
            holográficos, cintas protectoras para tus empaques y mucho más.</p>
        </div>
      </div>

      <PorqueSomosLosMejores/>

    </div>

    
  )
}
