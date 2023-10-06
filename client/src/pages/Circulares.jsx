import React from 'react'
import Producto2 from '../components/Producto2'

export default function Circulares() {
  return (
    <div>
      <Producto2
      imgSrc="/images/productos/ejemplo-etiquetas circulares.jpg"
      product="Etiquetas circulares"
      description={
        <>
            Etiquetas en rollo cortadas en forma cuadrada, perfectas <br/>
            para colocar en tus envases, cajas, etc.
        </>
      }/>
    </div>
  )
}
