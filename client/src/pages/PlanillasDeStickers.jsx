import React from 'react'
import Producto_Planilla_Stickers from '../components/Producto_Planilla_Stickers'

export default function PlanillasDeStickers() {
  return (
    <div>
      <Producto_Planilla_Stickers
      imgSrc='/images/productos/planilla ejemplo-04.png'
      product='Planillas de stickers'
      description={
        <>
          Planilla de stickers con los diseños que quieras incluir. Impresa en un <br />
           vinilo brillante resistente, perfecto para regalar y crear sets de <br />
            stickers llamativos.


        </>
      }/>
    </div>
  )
}
