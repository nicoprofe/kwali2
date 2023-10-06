import React from 'react'
import Producto from '../components/Producto'


export default function Brillantes() {
  return (
    <div>
      <Producto
      imgSrc="/images/productos/ejemplo-brillante.png"
      product="Sticker brillantes"
      description={
        <>
            Stickers impresos en un vinil blanco resistente al agua y al sol, <br />
            con un acabado brillante y levemente reflejante. Dale ese <br />
            toque profesional a tus stickers con nuestro acabado brillante.
       
        
        </>
        
            
      }/>

    </div>
  )
}

