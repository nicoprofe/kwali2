import React, { useState } from 'react'
import Product from '../components/Product'
import { BsQuestionLg } from 'react-icons/bs'
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react'
import axios from 'axios'

export default function Imanes({imgSrc, product, description}) {
  // MasterCard 5120 6944 7061 6271, 123 1125
  // Visa 4509 9535 6623 3704, 123 1125

  const [ preferenceId, setPreferenceId ] = useState(null)
  const [ imagePreviews, setImagePreviews ] = useState([])

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

  function handleImagePreview(e) {
    const imageFiles = e.target.files
    const previews = []
    for(let i = 0; i < imageFiles.length; i++) {
      previews.push(URL.createObjectURL(imageFiles[i]))
    }
    setImagePreviews(previews)
  }

   async function handleSubmit(e) {
    e.preventDefault()
   }

  return (
    <div >

      <div className='flex flex-wrap items-center justify-center space-x-0 md:space-x-24'>

      <div className='flex flex-col items-center justify-center mt-6 md:mt-0'>
  {imagePreviews.length === 0 && (
    <img className='h-[300px] md:h-[450px]' src="/images/productos/ejemplo-iman.png" alt="" />
  )}

  {imagePreviews.length > 0 && (
    <div className=' h-[400px] w-[450px] rounded-xl border-b-4 border-r-4 shadow-inner flex items-center justify-center'>
      {imagePreviews.map((previewUrl, index) => (
        <img src={previewUrl} alt={`Preview ${index}`} key={index}
        className='h-80 w-80 rounded'/>
      ))}
    </div>
  )}
</div>


        {/* <div className='flex flex-col items-center justify-center'>
          <img className='h-[300px] md:h-[450px]' src="./images/brillosa mockup-07 2.png" alt="" />

          <div>
            <div className=' h-[320px] w-[360px] rounded-xl border-b-4 border-r-4 shadow-inner flex items-center justify-center'>
              {imagePreviews.map((previewUrl, index) => (
                <img src={previewUrl} alt={`Preview ${index}`} key={index}
                className='h-64 w-64 rounded'/>
              ))}
            </div>
            
          </div>
        </div> */}

        <div className='flex flex-col items-center justify-center px-6 md:px-0 space-y-6 mb-16 mt-16'>
           <p className='text-4xl font-semibold text-gray-900'>Imanes</p>
           <p className='text-gray-900 font-semibold'>Promociona tu marca con nuestros imanes cortados en la<br />
           forma de tu diseño, fáciles de adherir a superficies metálicas<br />
           como autos, refiregeradores, etc.</p>

           <form className='flex flex-col items-center justify-center space-y-6' onSubmit={handleSubmit}>

              <div className='flex items-center justify-center space-x-2'>
                  <p>Tamaño</p>
                  <select id='tamano'>
                    <option value="2x2cm">2x2cm</option>
                    <option value="5x5cm">5x5cm</option>
                    <option value="10x10cm">10x10cm</option>
                    <option value="15x15cm">15x15cm</option>
                    <option value="Personalizado">Personalizado</option>
                  </select>
                  <div className='bg-gray-300 rounded-full p-0.5 cursor-pointer'>
                  <BsQuestionLg/>
                  </div>
              </div>
            <div>
              <button className='px-7 py-1 text-xs text-gray-900 font-semibold rounded bg-gray-300 hover:bg-gray-400 active:bg-gray-500'>
                Ver guía de dimensiones
              </button>
              </div>

              <div className='flex items-center justify-center space-x-2'>
                  <p>Corte</p>
                  <select style={{width: "190px"}} id="corte">
                    <option value="kis-cut">Kiss-cut</option>
                    <option value="die-cut">Die-cut</option>
                  </select>
                  <div className='bg-gray-300 rounded-full p-0.5 cursor-pointer'>
                  <BsQuestionLg/>
                  </div>
              </div>

              <div className='flex items-center justify-center space-x-2'>
                  <p>Cantidad</p>
                  <select style={{width: "130px"}} id="cantidad">
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="250">250</option>
                  </select>
              </div>

              <div className='flex items-center justify-center space-x-2'>
                  <p>Precio</p>
                  <input 
                  style={{width: "150px"}}
                  type="number" 
                  disabled
                   />
              </div>

              {/* <div>
                <input 
                type="file"
                multiple
                id='images'
                accept='.jpg,.png,.jpeg' 
                required
                onChange={(e) => {handleImagePreview(e)}}/>
              </div> */}

              <div>
                <label className='bg-secondary-blueLight hover:bg-blue-300 active:bg-blue-400 
                px-10 py-2.5 font-semibold rounded transition duration-300 ease-in-out'>
                  Sube tu archivo
                  <input 
                  type="file"
                  required
                  accept='.jpg,.png,.jpeg'
                  onChange={(e) => {handleImagePreview(e)}}
                  style={{display: "none"}} />
                </label>
              </div>

              {/* <div>
                <button 
                required
                type='file'
                accept=".jpg,.png,.jpeg"
                onChange={(e) => {handleImagePreview(e)}}
                className='bg-secondary-blueLight hover:bg-blue-300 active:bg-blue-400 
                px-10 py-2.5 font-semibold rounded transition duration-300 ease-in-out'>Sube tu archivo
                </button>
              </div> */}

              <div>
                <button className='px-4 py-1 text-xs font-semibold  text-gray-900 rounded bg-gray-300 hover:bg-gray-400 active:bg-gray-500
                transition duration-200 ease-in-out '>
                  Guía de impresión avanzada
                </button>
              </div>

              <div>
                <button className='px-5 py-1 text-xs font-semibold text-gray-900 rounded bg-gray-300 hover:bg-gray-400 active:bg-gray-500
                transition duration-200 ease-in-out '>
                  Ejemplo de lineas de corte
                </button>
              </div>

              <div className='flex flex-col'>
                <button
                onClick={handleBuy}
                className='bg-secondary-green hover:bg-lime-400 active:bg-lime-600 
                px-10 py-2.5 font-semibold text-white rounded transition duration-300 ease-in-out'>
                  Añadir al carrito
                </button>
                { preferenceId && <Wallet initialization={{ preferenceId }} /> } 
                
              </div>


           </form>

          {/* <button 
          className='px-9 py-1 text-white bg-secondary-green hover:bg-lime-400 active:bg-lime-500 rounded transition duration-200 ease-in-out ' 
          onClick={handleBuy}>Comprar</button>
          { preferenceId && <Wallet initialization={{ preferenceId }} /> } */}
        </div>

        </div>  

    </div>
  )
}

