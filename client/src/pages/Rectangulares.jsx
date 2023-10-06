import React from 'react'
import Producto2 from '../components/Producto2'

export default function Rectangulares() {
  return (
    <div>
      <Producto2
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
