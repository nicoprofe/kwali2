import React from 'react'
import Producto_Water_Tape from '../components/Producto_Water_Tape'

export default function WaterActivatedTape() {
  return (
    <div>
      <Producto_Water_Tape
      imgSrc='/images/productos/ejemplo-watertape.jpg'
      product='Water activated tape'
      description={
        <>
            Cinta de embalaje personalizada de alta resitencia, con <br />
            adhesivo que se activa al entrar en contacto con el agua. <br />
            Ideal para paquetería y cajas.
        </>
      }/>
    </div>
  )
}
