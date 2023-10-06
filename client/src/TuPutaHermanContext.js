import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebase';

// Create a context for the cart
const CartContext = createContext();


// Custom hook to access the cart context
export function useCart() {
  return useContext(CartContext);
}

// Cart context provider component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [ cartItemCount, setCartItemCount ] = useState(0)


  // Add a function to set the thumbnail images based on product names
  const setThumbnailForProduct = (productName) => {
    const thumbnailMap = {
        "Stickers mate": '/images/productos/ejemplo-matte.png',
        "Sticker brillantes": '/images/productos/ejemplo-brillante.png',
        "Sticker holográficos": '/images/productos/ejemplo-holografico.png',
        "Stickers transparentes": '/images/productos/ejemplo-transparente.png',
        "Stickers espejo": '/images/productos/ejemplo-espejo.png',
        "Stickers metal silver": '/images/productos/ejemplo-metalsilver.png',
        "Stickers metal gold": '/images/productos/ejemplo-metalgold.png',
    }
    return thumbnailMap[productName] || ''
  }

  // Function to add an item to the cart
  function addToCart(item) {
    const itemWithThumbnail = {
        ...item,
        imgSrc: setThumbnailForProduct(item.product),
    }
    setCartItems([...cartItems, itemWithThumbnail])
    setCartItemCount(cartItemCount + 1)
  }

  // Add item to Firestore


  // Function to remove an item from the cart
  function removeFromCart(item) {
    const updatedCart = cartItems.filter(cartItem => cartItem !== item);
    setCartItems(updatedCart);
    setCartItemCount(cartItemCount - 1)
  }

  // Function to calculate the subtotal
  function calculateSubtotal() {
    return cartItems.reduce((subtotal, item) => subtotal + item.price, 0);
  }

  // Function to calculate the total including tax and shipping
  function calculateTotal() {
    const subtotal = calculateSubtotal();
    const taxRate = 0.1; // Example tax rate
    const shippingFee = 5; // Example shipping fee
    return subtotal + subtotal * taxRate + shippingFee;
  }

  // Context value
  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    calculateSubtotal,
    calculateTotal,
    cartItemCount,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}
