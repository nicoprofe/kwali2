import React, { useContext, useEffect, useState } from 'react'
import { useCart } from '../TuPutaHermanContext'
import axios from 'axios'
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react'
import { v4 as uuidv4 } from 'uuid'
import { useLocation, useNavigate } from 'react-router-dom'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { getAuth } from 'firebase/auth'


export default function SidePanel({ isPanelOpen}) {
  const { cartItems, setCartItems } = useCart()

  const location = useLocation()

  const navigate = useNavigate()

  const auth = getAuth()

  // Define shipping fee
  const shippingFee = 99


  // Calculate subtotal based on currentPrice
  const subtotal =  cartItems.reduce(
    (acc, item) => acc + 1 * parseFloat(item.price), 0) // Parse price to float if needed

  // Calculate total by adding shipping fee to subtotal
  const total = subtotal + shippingFee

  const [ preferenceId, setPreferenceId ] = useState(null)
    // MasterCard 5120 6944 7061 6271, 123 1125
    // Visa 4509 9535 6623 3704, 123 1125

  useEffect(() => {
    initMercadoPago('TEST-8f106443-ef9a-4ea3-a86e-f004fc2bbf05')
  }, [])
 

  const createPreference = async () => {
    try {
      // Create arrays for description, price, and quantity
      const descriptions = cartItems.map(item => item.product);
      const prices = subtotal;
      const quantities = cartItems.map(item => item.quantity);
      const ids = cartItems.map(item => item.id)

      // Send a single request to your server with the arrays
         const response = await axios.post('https://kwali2-server.vercel.app/create-preference', { 
      
      description: descriptions.join(', '),
        price:prices,
        quantity: 1,
        currency_id: 'USD',
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
      return null;
    }
  };


  const handleBuy = async () => {
      const id = await createPreference()
      if(id) {
        setPreferenceId(id)
      }
  }

  // Function to delete a specific order by its index
  const deleteOrder = (index) => {
    const updatedCartItems = [...cartItems]
    updatedCartItems.splice(index, 1) // Remove the order at the specified index
    setCartItems(updatedCartItems) // Update the cartItems state
  }

  // Function to clear all orders
  const clearAllOrders = () => {
    setCartItems([]) // Set cartItems to an empty array to clear all orders
  }

   
  return (
    <div
    className={`fixed right-0 w-full md:w-1/4 h-full bg-white
    transition-transform duration-300 ease-in-out ${
      isPanelOpen 
      ? 'translate-x-0'
      : 'translate-x-[100%]'
    }`}>
       <h1 className='uppercase font-semibold text-xl text-center tracking-wider mt-6 mb-6'>Tu Carrito</h1>
       <div 
        className='bg-gray-200 flex items-center justify-around py-2 text-md font-semibold'>
          <p>Descripción</p>
          <p>Cantidad</p>
          <p>Total</p>

        </div>

        <div className='max-h-[340px] overflow-y-auto'>
          {cartItems.map((item, index) => (
            <div key={index} className='grid grid-cols-3 mt-6 items-center justify-center '>

              <div className='flex flex-col items-start justify-start ml-7'>
                <img src={item.imgSrc} alt={item.product} className='h-12' />
                <p>{item.product}</p>
              </div>
              <p className='text-end mr-10'>{item.quantity}</p>
              <p className='text-end mr-2'>{item.price}</p>
            </div>
          ))}
        </div>

        <div className='absolute bottom-[23%] px-12'>
            { preferenceId && <Wallet initialization={ preferenceId }/> }
        </div>

        <div className='absolute bottom-[15%] mx-6 space-x-14 flex items-center justify-center'>

            <div>
              <button
              onClick={() => navigate('/proceder-pago')}
              className='bg-gray-300 hover:bg-gray-400 active:bg-gray-600 hover:text-white
              active:text-white transition duration-300 ease-in-out
              px-10 py-2'>Pagar</button>
            </div>

            

         
            <div className='font-semibold text-base whitespace-nowrap'>
                <div className='flex items-center justify-between space-x-2'>
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className='flex items-center justify-between space-x-2'>
                <p>Envío: </p>
                <p>${shippingFee.toFixed(2)}</p>
                </div>
                <div className='flex items-center justify-between space-x-2'>
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
                </div>
            </div>
          
        </div>

        
     


      


    </div>
  )
}

