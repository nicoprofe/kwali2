import React, { useState } from 'react'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios'

export default function Product() {
    // MasterCard 5120 6944 7061 6271, 123 1125
    // Visa 4509 9535 6623 3704, 123 1125
    const [ preferenceId, setPreferenceId ] = useState(null)

    initMercadoPago("TEST-8f106443-ef9a-4ea3-a86e-f004fc2bbf05")

    const createPreference = async () => {
        try {
            const response = await axios.post("https://kwali2-server.vercel.app/create-preference", {
                title: "Stickers",
                price: 100,
                quantity: 1,
                currency_id: "MXN",
            })
            const { id } = response.data
            return id

        } catch (error) {
            console.log(error)
        }
    }

    const handleBuy = async () => {
        const id = await createPreference()

        if(id) {
            setPreferenceId(id)
        }
    }

  return (
    <div>
      <div className='px-96'>
        <div className='flex flex-col items-center  bg-secondary-blueLight'>
            <img className='h-16' src="./images/iman-11 1.png" alt="iman" />
            <h3>Sticker</h3>
            <p>$100</p>    
            <button
            onClick={handleBuy} 
            className='bg-primary-blueLight px-4 py-2 uppercase text-sm font-semibold text-white rounded-md'>
                Comprar
            </button>
            {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </div>
      </div>
    </div>
  )
}
