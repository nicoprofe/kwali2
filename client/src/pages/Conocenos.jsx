import React from 'react'
import PorqueSomosLosMejores from '../components/PorqueSomosLosMejores'
import { useMediaQuery } from 'react-responsive'

export default function Conocenos() {
  const isDesktop = useMediaQuery({ minWidth: 993})
  return (
    <div className='h-full'>
      <div className='flex flex-col items-center justify-center h-[130vh] md:h-[112vh] mb-[8vh]'>

      <div className='w-full translate-y-[7vh] md:-translate-y-[13.5vh] flex flex-col items-center justify-center'>
        <img src="/images/identidad/elementos web-17.png" alt="" />  
        <img 
        className= {`absolute ${isDesktop ? 'mb-[40vh] h-[11vh]' : 'top-20 -translate-y-5 mb-72 h-[5vh]' } `}
        src="/images/transparentes/textos_holasomoskwali.png" alt="conocenos" />

        <div className=''>
          <p className='text-[2.4vh] font-medium pl-6 md:pl-0 pr-6 md:pr-0 mt-10 md:mt-0'>Nuestro objetivo es lograr que tu experiencia de compra sea tan sencilla y cómoda como nunca antes. En {isDesktop ? <br /> : ''}
            Kwali nos enorgullecemos de lo que hacemos y por eso queremos asegurarte que nuestros productos son {isDesktop ? <br /> : ''}
            hechos con la mejor calidad. Con nuestro servicio en linea no tienes que salir de tu casa o hacer largas filas {isDesktop ? <br /> : ''}
            para obtener productos de calidad profesional.</p>
        </div>

          <img
          className='h-[5vh] md:h-[11vh] mt-[8vh] mb-[8vh] ' 
          src="/images/transparentes/texto_experienciakwali.png" alt="experiencia" />

      <p className='text-[2.4vh] font-medium pl-6 md:pl-0 pr-6 md:pr-0'>
        En Kwali nos aseguraremos de que tus productos salgan justo como los necesitas. Contamos con un equipo {isDesktop ? <br /> : ''}
        de diseño que revisará tus archivos y te ayudará en cada paso necesario. En caso de contar con alguna duda o {isDesktop ? <br /> : ''}
        no encontrar lo que buscas, puedes comunicarte con nosotros y nos encargaremos de darte una solución. {isDesktop ? <br /> : ''}{isDesktop ? <br /> : ''}
        Recuerda que nuestras pruebas de impresión digitales no tienen costo alguna y que nunca imprimimos ningún {isDesktop ? <br /> : ''}
        diseño sin que antes hayas aprobado nuestro trabajo, esto para asegurar tu satisfacción.
      </p>

      <img
      className={`absolute -z-10 ${isDesktop ? 'top-[82vh] -right-[4vh] h-[45vh]' : 'h-[20vh] right-[9%] top-[42%]'} `} 
      src="/images/mascota/kwali-corazon.png" alt="mascota" />
          
      </div>

      

     

     

      

      </div>

      <div className='bg-secondary-blueLight w-full flex flex-wrap items-center justify-center mt-[25vh] md:mt-0 py-[7vh] md:space-x-[6vh]'>
        <div>
            <img 
            className='h-[55vh]'
            src="/images/productos/ejemplo-brillante.png" alt="stickers" />
        </div>
        <div className='flex flex-col items-center justify-center space-y-12 mb-6'>
            <img 
            className='h-[5vh] md:h-[11vh]'
            src="/images/transparentes/textos_nuestrosstickers.png" alt="stickers" />
            <p className='text-[2.4vh] text-center font-medium pl-6 md:pl-0 pr-6 md:pr-0 '>Para hacer tus stickers Kwali utilizamos papel de impresión gráfico 3M<sup>TM &nbsp;</sup>Schotch<sup>TM</sup> {isDesktop ? <br /> : ''}
            con adhesivo Comply<sup>TM</sup> IJ35G-10 y IG35G-20 lo que logra obtener un adhesivo permanente {isDesktop ? <br /> : ''}
            con laminado invisible.</p>
            <h2 className='text-[3vh] md:text-[5vh] font-bold '>Todo lo que necesitas</h2>
            <p className='text-[2.4vh] text-center font-medium pl-6 md:pl-0 pr-6 md:pr-0'>Contamos con una amplia variedad de productos y acabados para que tus diseños luzcan {isDesktop ? <br /> : ''}
            justo como lo necesitas, desde cortes Kiss-Cut y Die-Cut, efectos desde mate hasta {isDesktop ? <br /> : ''}
            holográficos, cintas protectoras para tus empaques y mucho más.</p>
        </div>
      </div>

      <PorqueSomosLosMejores/>

    </div>

    
  )
}
