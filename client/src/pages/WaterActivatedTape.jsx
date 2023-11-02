import React from 'react'
import Producto_Water_Tape from '../components/Producto_Water_Tape'
import { useMediaQuery } from 'react-responsive'

export default function WaterActivatedTape() {
  const isDesktop = useMediaQuery({ minWidth: 993 })
  return (
    <div>
      <Producto_Water_Tape
      imgSrc='/images/productos/ejemplo-watertape.jpg'
      product='Water activated tape'
      description={
        <>
            Cinta de embalaje personalizada de alta resitencia, con {isDesktop && <div/>}
            adhesivo que se activa al entrar en contacto con el agua. {isDesktop && <div/>}
            Ideal para paquetería y cajas.
        </>
      }/>
    </div>
  )
}
