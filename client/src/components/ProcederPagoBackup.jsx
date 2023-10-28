import React, { useState } from 'react'
import { useCart } from '../TuPutaHermanContext'

export default function ProcederPagoBackup() {
    const { cartItems, setCartItems } = useCart()

    // Calculate subtotal based on currentPrice
    const subtotal = cartItems.reduce(
        (acc, item) => acc + 1 * parseFloat(item.price), 0) // Parse price to float if needed
    
    const handleSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <>
    
    <div className='flex flex-col items-center justify-center mt-6 mb-6'>
      <h1 className='font-semibold text-3xl'>Proceder a Pago</h1>
        
      <div>
        {cartItems.map((item, index) => (
            <>
               <div className='flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center space-x-4 mt-6 font-medium text-sm' key={index}>
                        <img src={item.imgSrc} alt={item.product} className='h-12' />
                        
                        <p>{item.product}</p>
                        <p>x{item.quantity}pzas</p>
                        <p>${item.price}</p>
                    </div>
                
                    <div>
                        <p className='border border-gray-900 px-2 py-0.5 mt-2'>Subtotal ${subtotal}</p>
                    </div>
               </div>

               
            
            </>
        ))}
      </div>
    </div>

    <div className='bg-gray-200 w-full flex flex-col items-center justify-center'>
        <h2 className='font-medium mt-3 mb-6'>Agregar dirección</h2>

        <form onSubmit={handleSubmit}>
            <>
            <div className='flex items-center justify-between space-x-4 mb-6'>
                <label htmlFor="">Nombre completo</label>
                <input 
                className='py-0.5 w-80'
                id='name'
                type="text" />
            </div>
            <div className='flex items-center justify-between space-x-4 mb-3'>
                <div className='flex flex-col'>
                    <label htmlFor="">Dirección</label>
                    <p className='text-xs'>(calle, num. ext, colonia)</p>
                </div>
                <input 
                className='py-0.5 w-80'
                id='address'
                type="text" />
            </div>
            <div className='flex items-center justify-between space-x-4 mb-3'>
                <div className='flex flex-col'>
                    <label htmlFor="">Dirección</label>
                    <p className='text-xs'>(datos adicionales)</p>
                    <p className='text-xs'>(calle, num int.)</p>
                </div>
                <input 
                className='py-0.5 w-80'
                id='address2'
                type="text" />
            </div>
            <div className='flex items-center justify-between space-x-4 mb-7'>
                <label htmlFor="">Ciudad</label>
                <input 
                className='py-0.5 w-80'
                id='city'
                type="text" />
            </div>
            <div className='flex items-center justify-between space-x-4 mb-7'>
                <label htmlFor="">Municipio</label>
                <input 
                className='py-0.5 w-80'
                id='city'
                type="text" />
            </div>
            <div className='flex items-center justify-between space-x-4 mb-7'>
                <label htmlFor="">Código Postal</label>
                <input 
                className='py-0.5 w-80'
                id='city'
                type="text" />
            </div>
            <div className='flex items-center justify-between space-x-4 mb-4'>
                <label htmlFor="">Estado</label>
                <input 
                className='py-0.5 w-80'
                id='city'
                type="text" />
            </div>
            <div className='flex items-center justify-between space-x-4 mb-6'>
                <div className='flex flex-col'>
                    <label htmlFor="">Teléfono de</label>
                    <p className=''>contacto</p>
                </div>
                <input 
                className='py-0.5 w-80'
                id='address'
                type="text" />
            </div>

            <div className='bg-white w-full'>
                dsds
            </div>
            </>


        </form>
    </div>
    </>
  )
}
