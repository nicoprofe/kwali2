import React from 'react'
import Producto_Ovalada from '../components/Producto_Ovalada'
import { useMediaQuery } from 'react-responsive'

export default function Ovaladas() {
  const isDesktop = useMediaQuery({ minWidth: 993 })
  return (
    <div>
      <Producto_Ovalada
      imgSrc="/images/productos/ejemplo-etiquetas ovaladas.jpg"
      product="Etiquetas ovaladas"
      description={
        <>
            Etiquetas en rollo cortadas en forma ovalada, perfectas {isDesktop && <div/>}
            para colocar en tus envases, cajas, etc.
        </>
      }/>
    </div>
  )
}
