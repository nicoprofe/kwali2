import React from 'react'
import Producto_Imanes from '../components/Producto_Imanes'
import { useMediaQuery } from 'react-responsive'

export default function Imanes() {
  const isDesktop = useMediaQuery({ minWidth: 993 })
  return (
    <div>
      <Producto_Imanes
      imgSrc='/images/productos/iman.png'
      product='Imanes'
      description={
        <>
            Promociona tu marca con nuestros imanes cortados en la {isDesktop && <div/>}
            forma de tu diseño, fáciles de adherir a superficies metálicas {isDesktop && <div/>}
            como autos, refrigeradores, etc.
        </>
      }/>
    </div>
  )
}
