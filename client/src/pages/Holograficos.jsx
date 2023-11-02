import React from 'react'
import Producto2 from '../components/Producto2'
import { useMediaQuery } from 'react-responsive'

export default function Holograficos() {
  const isDesktop = useMediaQuery({ minWidth: 993 })
  return (
    <div>
      <Producto2
      imgSrc="/images/productos/holografico.png"
      product="Sticker holográficos"
      description={
        <div>
            Stickers impresos en un vinilo que crea un efecto "arcoris" o {isDesktop && <div/>}
            "tornasol" al reflejar la luz. Dale vida a tus diseños y {isDesktop && <div/>}
            llama la atención con nuestros stickers holográficos.
        </div>
      }/>

    </div>
  )
}
