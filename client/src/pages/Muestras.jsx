import React, { useState } from 'react'
import Producto_Muestras from '../components/Producto_Muestras'



export default function Muestras() {
  return (
     <div>
     <Producto_Muestras
     imgSrc="/images/productos/set ejemplo.png"
     product="Muestras"
     description={
       <>
            Conoce la calidad de nuestros materiales con tus <br/> 
            propia manos con este paquete de muestras de los <br/>
            distintos productos que manejamos, con diseños <br />
            originales de Kwali. Sin necesidad de mandar un <br />
            diseño.
       </>
     }/>

   </div>
  )
}
