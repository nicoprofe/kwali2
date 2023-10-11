import React from 'react'
import Producto3 from '../components/Producto3'

export default function MetalGold() {
  return (
    <div>
      <Producto3
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
