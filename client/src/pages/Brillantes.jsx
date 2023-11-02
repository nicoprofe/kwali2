import React from 'react'
import Producto from '../components/Producto'
import { useMediaQuery } from 'react-responsive'


export default function Brillantes() {
   const isDesktop = useMediaQuery({ minWidth: 993 })
  return (
    <div>
      <Producto
      imgSrc="/images/productos/ejemplo-brillante.png"
      product="Sticker brillantes"
      description={
        <div>
            Stickers impresos en un vinil blanco resistente al agua y al sol, {isDesktop && <div/>}
            con un acabado brillante y levemente reflejante. Dale ese {isDesktop && <div/>}
            toque profesional a tus stickers con nuestro acabado brillante.
       
        
        </div>
        
            
      }/>

    </div>
  )
}

