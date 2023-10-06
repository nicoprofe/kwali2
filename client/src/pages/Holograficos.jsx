import React from 'react'
import Producto from '../components/Producto'

export default function Holograficos() {
  return (
    <div>
      <Producto
      imgSrc="/images/productos/ejemplo-holografico.png"
      product="Sticker holográficos"
      description={
        <>
            Stickers impresos en un vinilo que crea un efecto "arcoris" o <br/>
            "tornasol" al reflejar la luz. Dale vida a tus diseños y <br/>
            llama la atención con nuestros stickers holográficos.
        </>
      }/>

    </div>
  )
}
