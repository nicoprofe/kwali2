import React from 'react'
import Producto2 from '../components/Producto2'

export default function Ovaladas() {
  return (
    <div>
      <Producto2
      imgSrc="/images/productos/ejemplo-etiquetas ovaladas.jpg"
      product="Etiquetas ovaladas"
      description={
        <>
            Etiquetas en rollo cortadas en forma ovalada, perfectas <br/>
            para colocar en tus envases, cajas, etc.
        </>
      }/>
    </div>
  )
}
