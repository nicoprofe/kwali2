import React from 'react'
import Producto_Planilla_Stickers from '../components/Producto_Planilla_Stickers'
import { useMediaQuery } from 'react-responsive'

export default function PlanillasDeStickers() {
  const isDesktop = useMediaQuery({ minWidth: 993 })
  return (
    <div>
      <Producto_Planilla_Stickers
      imgSrc='/images/productos/planilla ejemplo-04.png'
      product='Planillas de stickers'
      description={
        <>
          Planilla de stickers con los diseños que quieras incluir. Impresa en un {isDesktop && <div/>}
           vinilo brillante resistente, perfecto para regalar y crear sets de {isDesktop && <div/>}
            stickers llamativos.


        </>
      }/>
    </div>
  )
}
