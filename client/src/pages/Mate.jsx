import React, { useState } from 'react'
import Producto from '../components/Producto'
import SidePanel from '../components/SidePanel'
import { useMediaQuery } from 'react-responsive'


export default function Mate() {
  const isDesktop = useMediaQuery({ minWidth: 993 })
  return (
     <div>
     <Producto
     imgSrc="/images/productos/ejemplo-matte.png"
     product="Stickers mate"
     description={
      <div>
        Stickers impresos en vinil blanco resistente al agua y al sol,
        {isDesktop && <div />}
        con un acabado suave no-reflejante. Perfectos para
        {isDesktop && <div />}
        promocionar tu marca o decorar tus objetos.
      </div>
    }
       
     />

   </div>
  )
}
