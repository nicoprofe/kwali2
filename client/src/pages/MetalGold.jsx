import React from 'react'
import Producto3 from '../components/Producto3'

export default function MetalGold() {
  return (
    <div>
      <Producto3
      imgSrc="/images/productos/gold.png"
      product="Stickers metal gold"
      description={
        <>
            Stickers impresos en un vinilo estilo “oro” que crea un efecto metálico. <br />
             Dale vida a tus diseños y llama la atención con nuestros stickers metálicos.
        </>
      }/>
    </div>
  )
}
