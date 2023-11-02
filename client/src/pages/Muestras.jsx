import React, { useState } from 'react'
import Producto_Muestras from '../components/Producto_Muestras'
import { useMediaQuery } from 'react-responsive'



export default function Muestras() {
  const isDesktop = useMediaQuery({ minWidth: 993 })
  return (
     <div>
     <Producto_Muestras
     imgSrc="/images/productos/set ejemplo.png"
     product="Muestras"
     description={
       <>
            Conoce la calidad de nuestros materiales con tus propias manos, {isDesktop && <div/>}
             ¡Solo paga el envío! En este paquete encontrarás una muestra de {isDesktop && <div/>}
              cada uno de nuestros productos (a excepción de imanes).

       </>
     }/>

   </div>
  )
}
