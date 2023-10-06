import React from 'react'
import Producto from '../components/Producto'

export default function MetalGold() {
  return (
    <div>
      <Producto
      imgSrc="/images/productos/ejemplo-metalgold.png"
      product="Stickers metal gold"
      description={
        <>
            Sticker estilo metal gold.
        </>
      }/>
    </div>
  )
}
