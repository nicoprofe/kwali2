import React from 'react'
import Producto_Ovalada from '../components/Producto_Ovalada'

export default function Ovaladas() {
  return (
    <div>
      <Producto_Ovalada
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
