import React from 'react'
import Producto from '../components/Producto'

export default function Espejo() {
  return (
    <div>
      <Producto
      imgSrc="/images/productos/ejemplo-espejo.png"
      product="Stickers espejo"
      description={
        <>
            Stickers impresos estilo espejo.
        </>
      }/>
    </div>
  )
}
