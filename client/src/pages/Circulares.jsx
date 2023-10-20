import React from 'react'
import Producto_Redonda_Cuadrada from '../components/Producto_Rendonda_Cuadrada'

export default function Circulares() {
  return (
    <div>
      <Producto_Redonda_Cuadrada
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
