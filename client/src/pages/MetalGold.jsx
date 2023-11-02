import React from 'react'
import Producto3 from '../components/Producto3'
import { useMediaQuery } from 'react-responsive'

export default function MetalGold() {
  const isDesktop = useMediaQuery({ minWidth: 993 })
  return (
    <div>
      <Producto3
      imgSrc="/images/productos/gold.png"
      product="Stickers metal gold"
      description={
        <>
            Stickers impresos en un vinilo estilo “oro” que crea un efecto metálico. {isDesktop && <div/>}
             Dale vida a tus diseños y llama la atención con nuestros stickers metálicos.
        </>
      }/>
    </div>
  )
}
