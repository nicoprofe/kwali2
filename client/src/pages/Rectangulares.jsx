import React from 'react'
import Producto_Rectangular from '../components/Producto_Rectangular'
import { useMediaQuery } from 'react-responsive'

export default function Rectangulares() {
  const isDesktop = useMediaQuery({ minWidth: 993 })
  return (
    <div>
      <Producto_Rectangular
      imgSrc="/images/productos/ejemplo-etiqueta rectangular.jpg"
      product="Etiquetas rectangulares"
      description={
        <>
            Etiquetas en rollo cortadas en forma rectangular, perfectas {isDesktop && <div/>}
            para colocar en tus envases, cajas, etc. 
        </>
      }/>
    </div>
  )
}
