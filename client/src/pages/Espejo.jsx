import React from 'react'
import Producto3 from '../components/Producto3'

export default function Espejo() {
  return (
    <div>
      <Producto3
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
