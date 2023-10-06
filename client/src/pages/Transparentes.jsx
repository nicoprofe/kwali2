import React from 'react'
import Producto from '../components/Producto'

export default function Transparentes() {
  return (
    <div>
      <Producto
      imgSrc="/images/productos/ejemplo-transparente.png"
      product="Stickers transparentes"
      description={
        <>
            Stickers impresos en vinilo transparente que permiten tener <br/>
            un efecto de opacidad incorporado a tu diseño, ideales para <br/>
            colocar en sus termos, ventanas, o cualquier otro espacio. 
        </>
      }/>
    </div>
  )
}
