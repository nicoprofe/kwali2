import React from 'react'
import PorqueSomosLosMejores from '../components/PorqueSomosLosMejores'

export default function Conocenos() {
  return (
    <div className='h-full'>
      <div className='flex flex-col items-center justify-center h-[800px] mb-16'>

      <div className='w-full -translate-y-[97px] flex flex-col items-center justify-center'>
        <img src="/images/identidad/elementos web-17.png" alt="" />  
        <img 
        className='absolute mb-72 w-3/4 md:w-1/3'
        src="/images/transparentes/textos_holasomoskwali.png" alt="conocenos" />

        <p className='text-md font-medium '>Nuestro objetivo es lograr que tu experiencia de compra sea tan sencilla y cómoda como nunca antes. En <br />
          Kwali nos enorgullecemos de lo que hacemos y por eso queremos asegurarte que nuestros productos son <br />
          hechos con la mejor calidad. Con nuestro servicio en linea no tienes que salir de tu casa o hacer largas filas <br />
          para obtener productos de calidad profesional.</p>

          <img
          className='w-3/4 md:w-1/3 mt-16 mb-16 ' 
          src="/images/transparentes/texto_experienciakwali.png" alt="experiencia" />

      <p className='text-md font-medium'>
        En Kwali nos aseguraremos de que tus productos salgan justo como los necesitas. Contamos con un equipo <br />
        de diseño que revisará tus archivos y te ayudará en cada paso necesario. En caso de contar con alguna duda o <br />
        no encontrar lo que buscas, puedes comunicarte con nosotros y nos encargaremos de darte una solución. <br /><br />
        Recuerda que nuestras pruebas de impresión digitales no tienen costo alguna y que nunca imprimimos ningún <br />
        diseño sin que antes hayas aprobado nuestro trabajo, esto para asegurar tu satisfacción.
      </p>

      <img
      className='absolute -z-10 -translate-y-3 md:translate-y-28 md:top-[460px] -right-14 md:right-10 h-60 md:h-96' 
      src="/images/mascota/kwali-corazon.png" alt="mascota" />
          
      </div>

      

     

     

      

      </div>

      <div className='bg-secondary-blueLight w-full flex flex-wrap items-center justify-center px-6 py-16 md:px-0 md:space-x-12'>
        <div>
            <img 
            className='h-96'
            src="/images/productos/ejemplo-brillante.png" alt="stickers" />
        </div>
        <div className='flex flex-col items-center justify-center space-y-12 mb-6'>
            <img 
            className='h-16'
            src="/images/transparentes/textos_nuestrosstickers.png" alt="stickers" />
            <p className='text-start md:text-center font-medium'>Para hacer tus stickers Kwali utilizamos papel de impresión gráfico 3M<sup>TM &nbsp;</sup>Schotch<sup>TM</sup> <br />
            con adhesivo Comply<sup>TM</sup> IJ35G-10 y IG35G-20 lo que logra obtener un adhesivo permanente <br />
            con laminado invisible.</p>
            <h2 className='text-2xl font-bold '>Todo lo que necesitas</h2>
            <p className='text-start md:text-center font-medium'>Contamos con una amplia variedad de productos y acabados para que tus diseños luzcan <br />
            justo como lo necesitas, desde cortes Kiss-Cut y Die-Cut, efectos desde mate hasta <br />
            holográficos, cintas protectoras para tus empaques y mucho más.</p>
        </div>
      </div>

      <PorqueSomosLosMejores/>

    </div>

    
  )
}
