import React from 'react'
import Producto from '../components/Producto'

export default function MetalSilver() {
  return (
    <div>
      <Producto
      imgSrc="/images/productos/ejemplo-metalsilver.png"
      product="Stickers metal silver"
      description={
        <>
            Stickers estilo metal silver. 
        </>
      }/>
    </div>
  )
}
