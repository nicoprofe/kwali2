import React from 'react'
import Producto_Redonda_Cuadrada from '../components/Producto_Rendonda_Cuadrada'
import { useMediaQuery } from 'react-responsive'

export default function Cuadradas() {
  const isDesktop = useMediaQuery({ minWidth: 993 })
  return (
    <div>
      <Producto_Redonda_Cuadrada
      imgSrc="/images/productos/ejemplo-etiquetas cuadradas.jpg"
      product="Etiquetas cuadradas"
      description={
        <>
            Etiquetas en rollo cortadas en forma cuadrada, perfectas {isDesktop && <div/>}
            para colocar en tus envases, cajas, etc.
        </>
      }/>
    </div>
  )
}
