import React from 'react'
import Item from './Item'
import { COMOORDENAR, CONTACTO, PRODUCTOS, STICKERS } from './Menus'

export default function ItemsContainer() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16'>
      <Item Links={STICKERS} title="STICKERS"/>
      <Item Links={PRODUCTOS} title="PRODUCTOS"/>
      <Item Links={COMOORDENAR} title="COMO ORDENAR"/>
      <Item Links={CONTACTO} title="CONTACTO"/>
    </div>
  )
}
