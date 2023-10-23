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
            Conoce la calidad de nuestros materiales con tus propias manos, <br />
             ¡Solo paga el envío! En este paquete encontrarás una muestra de <br />
              cada uno de nuestros productos (a excepción de imanes).

       </>
     }/>

   </div>
  )
}
