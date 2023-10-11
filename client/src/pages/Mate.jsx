import React, { useState } from 'react'
import Producto from '../components/Producto'
import SidePanel from '../components/SidePanel'


export default function Mate() {
  return (
     <div>
     <Producto
     imgSrc="/images/productos/ejemplo-matte.png"
     product="Stickers mate"
     description={
       <>
            Stickers impresos en vinil blanco resistente al agua y al sol, <br/> 
            con un acabado suave no-reflejante. Perfectos para <br/>
            promocionar tu marca o decorar tus ojetos.
       </>
     }/>

   </div>
  )
}
