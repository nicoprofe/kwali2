import React, { useState } from 'react'
import Producto from '../components/Producto'
import SidePanel from '../components/SidePanel'


export default function Mate() {
    const [ cartItems, setCartItems ] = useState([])

    // const handleAddToCart = (productInfo) => 
    // setCartItems([...cartItems, productInfo])

    const addToCart = (product, quantity, price) => {
        const newItem = {
            product,
            quantity,
            price,
        }
        setCartItems([...cartItems, newItem])
    }

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
      }
      onAddCart={(quantity, price) => addToCart("Stickers mate", quantity, price)}
      />
      <SidePanel cartItems={cartItems}/>
    </div>
  )
}
