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
  const { cartItems } = useCart()

  const location = useLocation()
  const navigate = useNavigate()

  const auth = getAuth()

  


  // const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
  const subtotal =  cartItems.reduce((acc, item) => acc + item.price, 0)
  const total = subtotal

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
         const response = await axios.post('http://localhost:8080/create-preference', { 
      
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

   
  return (
    <div 
    className={`fixed top-[105px] right-0 w-full md:w-1/4 h-full bg-white transition-transform duration-300 ease-in-out ${
        isPanelOpen 
        ? "translate-x-0" 
        : "translate-x-full"}` }>
        
        {/* Content of your side panel     */}
        <div className='flex flex-col space-y-6'>

            <h1 className='uppercase font-semibold text-xl text-center mt-6'>tu carrito</h1>

            <div className='flex items-center justify-around py-2 text-md font-semibold bg-gray-300'>
                <p>Descripción</p>
                <p>Cantidad</p>
                <p>Total</p>
            </div>

        

            {cartItems.map((item) => (
              <>
              <div key={item.id} className='flex items-center justify-around'>

                <div key={item.id}>
                  <img src={item.imgSrc }alt={item.product} className='w-12 h-12' />
                <p key={item.id}>{item.product}</p>
                </div>
                <p key={item.id}>{item.quantity}</p>
                <p key={item.id}>{item.price}</p>
                {/* <p>{item.price * item.quantity}</p> */}
              </div>
              </>
            ))}
          

          
        </div>

        
        <div className='absolute top-24 flex mt-[415px] space-x-16 items-center px-10'>

         <div className='flex flex-col'>
            <button
            onClick={handleBuy} 
            className='bg-gray-300 hover:bg-gray-400 active:bg-slate-500 
            hover:text-white active:text-white
            px-16 h-10 transition duration-300 ease-in-out'>Pagar
            </button>
            
           
            { preferenceId && <Wallet initialization={ {preferenceId} }/>}
            
         </div> 
        
        <div
        className='flex flex-col space-y-2 font-semibold'>
           <p>Subtotal</p>
           <p>${subtotal}</p>
        </div>
           {/* <p>${total}</p> */}
      </div>
        
      
    </div>
  )
}

