import React from 'react'
import Producto_Sticker_Piso from '../components/Producto_Sticker_Piso'

export default function StickersParaPiso() {
  return (
    <div>
      <Producto_Sticker_Piso
      imgSrc='/images/productos/ejemplo-piso.jpg'
      product='Stickers para piso'
      description={
        <>
          Crea señalización en tus espacios o dales vida con estos <br />
          stickers resistentes y fáciles de limpiar, antideslizantes <br />
          ideales para colocar en tus pisos.
        </>
      }/>
    </div>
  )
}
