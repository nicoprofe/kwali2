import React, { useEffect, useRef, useState } from 'react'
import { useCart } from '../TuPutaHermanContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react'
import axios from 'axios'

export default function ProcederPago() {
    const { cartItems, setCartItems } = useCart()
    const formRef = useRef(null)
    const [ preferenceId, setPreferenceId ] = useState(null)
    // MasterCard 5120 6944 7061 6271 - 123 - 11/25
    // Visa 4509 9535 6623 3704 - 123 - 11/25
    // Amercian 3711 803032 57522 - 1234 - 11/25

    const [ formData, setFormData ] = useState({
        fullName: '',
        address: '',
        address2: '',
        city: '',
        municipality: '',
        postalCode: '',
        state: '',
        phone: '',
        shippingOption: 'standard',
        price: total,
    })

    const { fullName, address, address2, city, municipality, postalCode, state, phone, shippingOption } = formData

    // Define shipping fee
    const [ shippingFee, setShippingFee ] = useState(99)

    // Calculate subtotal based on currentPrice
    const subtotal = cartItems.reduce(
        (acc, item) => acc + 1 * parseFloat(item.price), 0) // Parse price to float if needed

    // Calculate total by adding shipping fee to subtotal
    const total = subtotal + shippingFee    

    //MERCADO PAGO
    useEffect(() => {
        initMercadoPago('TEST-8f106443-ef9a-4ea3-a86e-f004fc2bbf05')
    }, [])

    const createPreference = async () => {
        try {
            // Create arrays for description, price, and quantity
            const descriptions = cartItems.map(item => item.product)
            const prices = subtotal + (formData.shippingOption === 'standard' ? 99 : 180)

            // Send a single request to your server with the arrays
            const response = await axios.post('https://kwali2-server.vercel.app/create-preference', {
                description: descriptions.join(', '),
                price: prices,
                quantity: 1,
                currency_id: 'USD',
            })

            const { id } = response.data
            console.log('Preference ID', id)
            return id
        } catch (error) {
            console.log(error)
            return null
        }
    }

    const handleBuy = async () => {
        const id = await createPreference()
        if(id) {
            setPreferenceId(id)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    
    const handleExternalSubmit = () => {

        if(formRef.current) {
            formRef.current.submit()
        }

        // Retrieve existing data from localStorage
        const existingData = localStorage.getItem('data') || []

        // Parse the existing data (assuming it's an array)
        let existingArray = []

        const subtotal = cartItems.reduce(
            (acc, item) => acc + 1 * parseFloat(item.price), 0)

        const shippingFee = shippingOption === 'standard' ? 99 : 180
        
        const total = subtotal + shippingFee; 

        // Update each object in the existing array with the new formData
        const updatedArray =  existingArray.map((existingFormData) => {
            return {
                ...existingFormData,
                ...formData,
                
            }

        })

        // Store the updated array back into localStorage
        localStorage.setItem('data', JSON.stringify(updatedArray))

        console.log('Data appended successfully to local storage')
        console.log(updatedArray)
        
        
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if(name === 'shippingOption') {
            setShippingFee(value === 'standard' ? 99 : 180)
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }



  return (
    <>
    
    <div className='flex flex-col items-center justify-center mt-6 mb-6'>
      <h1 className='font-semibold text-3xl'>Proceder a Pago</h1>
        
      <div>
        {cartItems.map((item, index) => (
            <>
               <div className='flex items-center justify-between space-x-4 mt-6 text-sm'>
                    
                        <img src={item.imgSrc} alt={item.product} className='h-14' />
                        <p>{item.product}</p>
                    

                 
                        <p>x{item.quantity}pzas</p>

                        <p>${item.price}</p>
                
                    
                
               </div>

               
            
            </>
        ))}
        <div className='flex flex-col items-center justify-center mt-4'>
            <p className='border border-gray-900 px-2 py-0.5'>Subtotal ${subtotal}</p>
        </div>
      </div>
    </div>

    <div className='bg-gray-200 w-full flex flex-col items-center justify-center px-6 md:px-0'>
        <h2 className='font-medium mt-3 mb-6'>Agregar dirección</h2>

        <form >
            <>
            <div className='flex items-center justify-between space-x-4 mb-6'>
                <label htmlFor="">Nombre completo</label>
                <input 
                onChange={handleChange}
                className='py-0.5 w-[370px] md:w-80'
                name='fullName'
                id='fullName'
                value={fullName}
                type="text" />
            </div>
            <div className='flex items-center justify-between space-x-4 mb-3'>
                <div className='flex flex-col'>
                    <label htmlFor="">Dirección</label>
                    <p className='text-xs'>(calle, num. ext, colonia)</p>
                </div>
                <input 
                onChange={handleChange}
                className='py-0.5 w-[360px] md:w-80'
                name='address'
                id='address'
                value={address}
                type="text" />
            </div>
            <div className='flex items-center justify-between space-x-4 mb-3'>
                <div className='flex flex-col'>
                    <label htmlFor="">Dirección</label>
                    <p className='text-xs'>(datos adicionales)</p>
                    <p className='text-xs'>(calle, num int.)</p>
                </div>
                <input 
                onChange={handleChange}
                className='py-0.5 w-80'
                name='address2'
                id='address2'
                value={address2}
                type="text" />
            </div>
            <div className='flex items-center justify-between space-x-4 mb-7'>
                <label htmlFor="">Ciudad</label>
                <input 
                onChange={handleChange}
                className='py-0.5 w-80'
                name='city'
                id='city'
                value={city}
                type="text" />
            </div>
            <div className='flex items-center justify-between space-x-4 mb-7'>
                <label htmlFor="">Municipio</label>
                <input 
                onChange={handleChange}
                className='py-0.5 w-80'
                name='municipality'
                id='municipality'
                value={municipality}
                type="text" />
            </div>
            <div className='flex items-center justify-between space-x-4 mb-7'>
                <label htmlFor="">Código Postal</label>
                <input 
                onChange={handleChange}
                className='py-0.5 w-80'
                name='postalCode'
                id='postalCode'
                value={postalCode}
                type="text" />
            </div>
            <div className='flex items-center justify-between space-x-4 mb-4'>
                <label htmlFor="">Estado</label>
                <input 
                onChange={handleChange}
                className='py-0.5 w-80'
                name='state'
                id='state'
                value={state}
                type="text" />
            </div>
            <div className='flex items-center justify-between space-x-4 mb-6'>
                <div className='flex flex-col'>
                    <label htmlFor="">Teléfono de</label>
                    <p className=''>contacto</p>
                </div>
                <input 
                onChange={handleChange}
                className='py-0.5 w-80'
                name='phone'
                id='phone'
                value={phone}
                type="text" />
            </div>

            
            </>


        </form>
    </div>

    <div className='bg-white w-full flex items-center justify-center space-x-36 py-12 px-6 md:px-0'>
            <div className='flex flex-col item items-start justify-center'>
                <p className='font-medium mx-auto mb-6'>Tipo de envío</p>
                <div className='flex items-center justify-center space-x-2 mb-1'>
                    <input 
                    onChange={handleChange}
                    checked={shippingOption === 'standard'}
                    type="radio" name="shippingOption" id="standard" value='standard' />
                    <label className='text-sm' htmlFor="standard">Estandar - $99mxn - 5 a 7 días</label>
                </div>
                <div className='flex items-center justify-center space-x-2'>
                    <input 
                    onChange={handleChange}
                    checked={shippingOption === 'express'}
                    type="radio" name="shippingOption" id="express" value='express'/>
                    <label className='text-sm' htmlFor="express">Express - $180mxn - 1 a 2 días</label>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center mb-2 space-y-1'>
                <p className='font-medium'>Total</p>
                <p className='font-medium'>${subtotal + shippingFee}mxn</p>
                <button 
                onClick={() => {
                    handleExternalSubmit()
                    handleBuy()
                }}
                className='font-semibold px-2 py-1 bg-gray-300 hover:bg-gray-400
                 active:bg-gray-600 active:text-white text-black duration-300 whitespace-nowrap'>
                    Completar pago
                </button>
                <div
                >
                    { preferenceId && <Wallet initialization={ {preferenceId} }/>}
                </div>
            </div>
    </div>
    </>
  )
}
