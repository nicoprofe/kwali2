import React from 'react'
import Producto3 from '../components/Producto3'
import { useMediaQuery } from 'react-responsive'

export default function Espejo() {
  const isDesktop = useMediaQuery({ minWidth: 993 })
  return (
    <div>
      <Producto3
      imgSrc="/images/productos/espejo.png"
      product="Stickers espejo"
      description={
        <div>
            Stickers impresos en un vinilo estilo “metálico brillante” que crea un {isDesktop && <div/>}
             efecto espejo al reflejar la luz . Dale vida a tus diseños y llama la {isDesktop && <div/>}
              atención con nuestros stickers metálicos.

        </div>
      }/>
    </div>
  )
}
