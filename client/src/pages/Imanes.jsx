import React from 'react'
import Producto_Imanes from '../components/Producto_Imanes'

export default function Imanes() {
  return (
    <div>
      <Producto_Imanes
      imgSrc='/images/productos/ejemplo-iman.png'
      product='Imanes'
      description={
        <>
            Promociona tu marca con nuestros imanes cortados en la <br />
            forma de tu diseño, fáciles de adherir a superficies metálicas <br />
            como autos, refiregeradores, etc.
        </>
      }/>
    </div>
  )
}
