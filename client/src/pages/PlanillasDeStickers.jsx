import React from 'react'
import Producto_Planilla_Stickers from '../components/Producto_Planilla_Stickers'

export default function PlanillasDeStickers() {
  return (
    <div>
      <Producto_Planilla_Stickers
      imgSrc='/images/productos/ejemplo_planilla stickers.png'
      product='Planillas de stickers'
      description={
        <>
          Plantillas de stickers para que puedas conocer nuestros productos??? <br />
          con un acabado suave no-reflejante. Perfectos para <br/>
          promocionar tu marca o decorar tus ojetos.

        </>
      }/>
    </div>
  )
}
