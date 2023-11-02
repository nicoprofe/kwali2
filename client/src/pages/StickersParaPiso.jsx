import React from 'react'
import Producto_Sticker_Piso from '../components/Producto_Sticker_Piso'
import { useMediaQuery } from 'react-responsive'

export default function StickersParaPiso() {
  const isDesktop = useMediaQuery({ minWidth: 993 })
  return (
    <div>
      <Producto_Sticker_Piso
      imgSrc='/images/productos/ejemplo-piso.jpg'
      product='Stickers para piso'
      description={
        <>
          Crea señalización en tus espacios o dales vida con estos {isDesktop && <div/>}
          stickers resistentes y fáciles de limpiar, antideslizantes {isDesktop && <div/>}
          ideales para colocar en tus pisos.
        </>
      }/>
    </div>
  )
}
