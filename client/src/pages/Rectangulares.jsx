import React from 'react'
import Producto_Rectangular from '../components/Producto_Rectangular'

export default function Rectangulares() {
  return (
    <div>
      <Producto_Rectangular
      imgSrc="/images/productos/ejemplo-etiqueta rectangular.jpg"
      product="Etiquetas rectangulares"
      description={
        <>
            Etiquetas en rollo cortadas en forma rectangular, perfectas <br/>
            para colocar en tus envases, cajas, etc. 
        </>
      }/>
    </div>
  )
}
