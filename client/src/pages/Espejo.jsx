import React from 'react'
import Producto3 from '../components/Producto3'

export default function Espejo() {
  return (
    <div>
      <Producto3
      imgSrc="/images/productos/espejo.png"
      product="Stickers espejo"
      description={
        <>
            Stickers impresos en un vinilo estilo “metálico brillante” que crea un <br />
             efecto espejo al reflejar la luz . Dale vida a tus diseños y llama la <br />
              atención con nuestros stickers metálicos.

        </>
      }/>
    </div>
  )
}
