import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useModal from '../hooks/useModal'
import Modal from './Modal'
import useTooltip from '../hooks/useTooltip'
import Tooltip from './Tooltip'
import { BsQuestionLg } from 'react-icons/bs'
import { AiFillCheckCircle } from 'react-icons/ai'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useCart } from '../TuPutaHermanContext'
import { addDoc, collection, doc, getDoc, getFirestore, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import guiaDeDimensiones from '../imagesOutsidePublic/guia dimensiones.jpg'
import lineasDeCorte from '../imagesOutsidePublic/infografia-lineas de corte.jpg'
import seleccionTamano from '../imagesOutsidePublic/infografia-seleccion tamano.jpg'
import tamanoPersonalizado from '../imagesOutsidePublic/infografia_tamaño personalizado.jpg'
import NecesitasAyudaConTusArchivos from './NecesitasAyudaConTusArchivos'
import PorqueSomosLosMejores from './PorqueSomosLosMejores'
import tipoDeCorte from '../imagesOutsidePublic/infografia- tipo de corte.jpg'
import guiaDeFormas from '../imagesOutsidePublic/guia formas-01.jpg'

const priceTable = {
    '8.5x11': [160.0, 136.0, 128.0, 112.0],
    '11x17': [250.0, 213.0, 200.0, 175.0],
    '10x20': [260.0, 221.0, 208.0, 182.0],
    '18x24': [390.0, 332.0, 312.0, 273.0],
    '24x24': [450.0, 383.0, 360.0, 315.0],
    '22x28': [160.0, 136.0, 128.0, 112.0],
    '28x43': [250.0, 213.0, 200.0, 175.0],
    '25x51': [260.0, 221.0, 208.0, 182.0],
    '46x61': [390.0, 332.0, 312.0, 273.0],
    '61x61': [450.0, 383.0, 360.0, 315.0],
  }
  
const quantityIndexes = [1, 2, 4, 10]

// IMANES
export default function Producto_Imanes({ imgSrc, product, description }) {
    // CONFIGS
    const navigate = useNavigate()
    const auth = getAuth()
    const location = useLocation()

    // TOOLTIP
    const [ isTooltipVisible, setIsTooltipVisible ] = useState(false)
    const [ isTooltipVisible2, setIsTooltipVisible2 ] = useState(false)
    const [ isTooltipVisible3, setIsTooltipVisible3 ] = useState(false)

    const modalTamano = useModal()
    const modalPersonalizado = useModal()
    const modalLongitud = useModal()
    const modalColor = useModal()

    const [ delayedClose, setDelayedClose ] = useState(false)

    useEffect(() => {
        let closeTimeout
        if(!modalTamano.isOpen && delayedClose) {
            closeTimeout = setTimeout(() => {
                modalTamano.closeModal()
                setDelayedClose(false)
            }, 300)
        }
        return () => {
            clearTimeout(closeTimeout)
        }
    }, [delayedClose, modalTamano])

    // MODAL
    const modalDimensiones = useModal()
    const modalImpresion = useModal()
    const modalCorte = useModal()

    const [size, setSize] = useState('8.5x11');
    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState(160.0);
    const [ currentPrice, setCurrentPrice ] = useState(0.0)

    useEffect(() => {
        const sizeIndex = quantityIndexes.indexOf(quantity);
        const newUnitPrice = priceTable[size][sizeIndex];
        setUnitPrice(newUnitPrice);
    }, [size, quantity]);

    // Update currentPrice whenever unitPrice or quantity changes
    useEffect(() => {
        const calculatedPrice = ( unitPrice * quantity ).toFixed(2)
        setCurrentPrice(calculatedPrice)
    }, [unitPrice, quantity])

    const baseUnitPrice = priceTable[size][0];
    const discountPercentage = ((baseUnitPrice - unitPrice) / baseUnitPrice) * 100;

    
    // LONGITUD
    const [ longitud, setLongitud] = useState('1')

    // COLORES
    const [ color, setColor] = useState('blanco')
   
   // IMAGE PREVIEW
    const [ imagePreviews, setImagePreviews ] = useState([])
    const [ selectedImageFile, setSelectedImageFile ] = useState(null)

    function handleImagePreview(e) {
        const imageFile = e.target.files[0]
        setSelectedImageFile(imageFile)
        const previewUrl = URL.createObjectURL(imageFile)
        setImagePreviews([previewUrl])
    }

    const ordersArray = []
    
    // HANDLE ADD TO CART AND SUBMIT TOGHETER
    const { addToCart } = useCart()

    function handleAddToCartAndSubmit(e) {
        e.preventDefault()

        // Wait for the user's authentication state to become available
        onAuthStateChanged(auth, (user) => {
            if(user) {
                // User is authenticated
                const item = {
                    product,
                    quantity,
                    size,
                    price: currentPrice,
                }
                addToCart(item)
        
                const formData = {
                    imgSrc: imgSrc,
                    product: product,
                    size: size,
                    longitud: longitud,
                    quantity: quantity,
                    price: currentPrice,
                    userRef: auth.currentUser.uid,
                    timestamp: serverTimestamp(),
                    preview: "/images/identidad/isotipo.png",
                    approval1: false,
                    approval2: false,
                    changes: [],
                    emailOrderSent: false,
                }

                if(selectedImageFile) {
                    uploadImageAndSetStickerUrl(selectedImageFile, formData)
                }

            } else {
                navigate('/sign-in')
            }
        })

        

       

       

        
    }

    // FUNCTION TO UPLOAD IMAGE AND SET STICKER URL
   async function uploadImageAndSetStickerUrl(imageFile, formData) {
    try {
        const storage = getStorage()
        const fileName = `${auth.currentUser.uid}/${imageFile.name}`
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, imageFile)

        const snapshot = await uploadTask

        const downloadUrl = await getDownloadURL(snapshot.ref)

        formData.stickerUrl = downloadUrl

        saveFormDataToLocalStorageAndFirestore(formData)

        console.log(`Image uploaded and stickerUrl set to ${downloadUrl}`)
    } catch (error) {
        console.error(`Error uploading image`, error)
    }
   }

   // FUNCTION TO SAVE FORMDATA TO LOCAL STORAGE AND FIRESTORE
   function saveFormDataToLocalStorageAndFirestore(formData) {
    const existingData = JSON.parse(localStorage.getItem('data')) || [];

  // Push the new formData into the array
  existingData.push(formData);

  // Store the updated array back in localStorage
  localStorage.setItem('data', JSON.stringify(existingData));

  // Also, push the formData into the ordersArray
  ordersArray.push(formData);

  // Console log the entire data array
  console.log('Data array:', existingData);
   
   }

// GET LOCAL STORAGE DATA && ADD DOC ORDERS
useEffect(() => {
    if (window.location.href.includes('approved')) {
      // Retrieve the orders array from localStorage
      const retrievedData = JSON.parse(localStorage.getItem('data'));
  
      // Loop through the retrieved orders and add each order to Firestore
      if (Array.isArray(retrievedData)) {
        const docRef = collection(db, 'orders')
        retrievedData.forEach(async (order) => {
            try {
                await addDoc(docRef, order)
            } catch (error) {
                console.error('Error adding order to Firestore', error)
            }
        })
      }

      // Clear the data in localStorage
      localStorage.removeItem('data')
  
      navigate('/profile');
    }
  }, [window.location.href]);
  
    
  return (
    <>
      <div className='flex flex-wrap items-center justify-center space-x-0 md:space-x-24'>

<div className='flex flex-col items-center justify-center mt-6 md:mt-0'>

        <img
        className='h-[300px] md:h-[63vh]' 
        src={imgSrc} alt={product} />

        {/* {imagePreviews.length === 0 && (
            <img className='h-[300px] md:h-[450px]' src={imgSrc} alt="" />
        )}

        {imagePreviews.length > 0 && (
            <div className='h-[400px] w-[450px] rounded-xl border-b-4 border-r-4 shadow-inner
            flex items-center justify-center'>
                
                {imagePreviews.map((previewUrl, index) => (
                    <img src={previewUrl} key={index} alt={`Preview ${index}`}
                    className='h-80 w-80 rounded' />
                ))}
            </div>
         )} */}

</div>


<div className='flex flex-col items-center justify-center px-10 md:px-0 space-y-6 mb-16 mt-16'>

         
        <p className='text-[5vh] font-semibold text-gray-900'>{product}</p>
        
        <p className='text-[2.3vh] font-semibold text-gray-900'>{description}</p>

<form>

              <div className='flex flex-col items-center justify-center space-y-[4vh]'>
                      
                        <div className='flex items-center justity-center space-x-[1vh]'>
                            <p className='text-[2.3vh]'>Tamaño</p>
                            <select 
                            id='size' 
                            value={size}
                            style={{width: '21vh', height: '6vh', fontSize: '2.3vh'}}
                            onChange={(e) => setSize(e.target.value)}>
                             <option value="8.5x11">8.5x11</option>
                             <option value="11x17">11x17</option>
                             <option value="10x20">10x20</option>
                             <option value="18x24">18x24</option>
                             <option value="24x24">24x24</option>
                             <option value="22x28">22x28</option>
                             <option value="28x43">28x43</option>
                             <option value="25x51">25x51</option>
                             <option value="46x61">46x61</option>
                             <option value="61x61">61x61</option>
                            </select>

                            <div 
                            onClick={modalTamano.openModal}
                            className='bg-gray-300 rounded-full p-[0.4vh] cursor-pointer'>
                                <BsQuestionLg size='2.3vh'/>
                            </div>

                            <Modal
                            isOpen={modalTamano.isOpen}
                            onClose={modalTamano.closeModal}>
                                <img
                                className='w-full md:h-[660px]' 
                                src={seleccionTamano} alt="" />
                            </Modal>

                            </div>

                            <div className='flex items-center justify-center space-x-[1vh] mt-2 mr-[0.5vh] md:mr-[2.2vh]'>
                                <p className='text-[1.7vh] text-center'>¿No encuentras el tamaño que buscas? <br /> 
                                <Link className='underline' to={'/contacto'}>Ponte en contacto con nosotros.</Link>
                                </p>
                                <div 
                                    onClick={modalPersonalizado.openModal}
                                    className='bg-gray-300 rounded-full p-[0.4vh] cursor-pointer'>
                                        <BsQuestionLg size='2.3vh'/>
                                </div>

                                <Modal
                                isOpen={modalPersonalizado.isOpen}
                                onClose={modalPersonalizado.closeModal}>
                                    <img
                                    className='w-full md:h-[660px]' 
                                    src={tamanoPersonalizado} alt="" />
                                </Modal>
                            </div>

                        
                        

                        <div>
                                <button 
                                onClick={modalDimensiones.openModal}
                                className='w-[30vh] py-[0.5vh] text-[1.7vh] text-gray-900 active:text-white font-semibold rounded 
                                bg-gray-300 hover:bg-gray-400 active:bg-slate-500 transition duration-200 ease-in-out'>
                                    Ver guía de dimensiones
                                </button>
                                <Modal
                                isOpen={modalDimensiones.isOpen}
                                onClose={modalDimensiones.closeModal}>
                                    <>
                                    <img 
                                    className='w-full md:h-[600px]'
                                    src={guiaDeDimensiones} alt="" />
                                    </>

                                </Modal>
                        </div>

                        <div className='flex items-center justify-center space-x-[1vh]'>
                        <p className='text-[2.3vh]'>Cantidad</p>
                                    <select 
                                    style={{width: "17vh", height: '6vh', fontSize: '2.3vh'}} 
                                    id="quantity" 
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}>
                                    {quantityIndexes.map((q) => (
                                        <option key={q} value={q}>{q}</option>
                                    ))}
                                    </select>
                        </div>

                        
                            <div className='flex items-center justify-center space-x-[1vh]'>
                            <p className='text-[2.3vh]'>Precio</p>
                               <input 
                               style={{width: "20vh", height: '6vh', fontSize: '2.3vh'}}
                               disabled value={`$${(unitPrice * quantity).toFixed(2)}` }type="text" />
                            </div>
                            <div className='flex items-center justify-center space-x-[1vh]'>
                            <p className='text-[2.3vh]'>Precio Unitario</p>
                               <input
                               style={{width: "11vh", height: '6vh', fontSize: '2.3vh'}} 
                               disabled value={`$${unitPrice.toFixed(2)}`} type="text" />
                            </div>
                            <div className='flex items-center justify-center space-x-[1vh]'>
                            <p className='text-[2.3vh]'>Descuento</p>
                               <input
                               style={{width: "16vh", height: '6vh', fontSize: '2.3vh'}} 
                               disabled 
                               value={`${discountPercentage.toFixed(0)}%`} 
                               type="text" />
                            </div>
                       

                        <div className='flex items-center justify-center space-x-2'>
                            <label 
                            className={`${imagePreviews.length > 0 ? 'ml-8' : ''} bg-secondary-blueLight hover:bg-blue-300 active:bg-blue-400
                            px-[6vh] py-[1.5vh] text-[2.2vh] font-semibold rounded transition duration-300 ease-in-out cursor-pointer`}>
                                Sube tu archivo
                                <input 
                                type="file"
                                required
                                accept='.jpg,.png,.jpeg,.pdf'
                                onChange={(e) => handleImagePreview(e)}
                                style={{display: "none"}} />
                            </label>

                            {imagePreviews.length > 0 && (
                                <AiFillCheckCircle
                                className='text-2xl text-secondary-green'/>
                            )}
                            
                        </div>

                        <div>
                            <button
                            onClick={modalImpresion.openModal} 
                            className='w-[30vh] py-[0.5vh] text-[1.7vh] text-gray-900 active:text-white font-semibold rounded 
                            bg-gray-300 hover:bg-gray-400 active:bg-slate-500 transition duration-200 ease-in-out'>
                                Guía de impresión avanzada
                            </button>
                            
                            <Modal
                            isOpen={modalImpresion.isOpen}
                            onClose={modalImpresion.closeModal}>
                                {/* <img 
                                    className='w-full md:h-[680px]'
                                    src="/images/informativos/infografia-guia impresion avanzada.jpg" alt="" /> */}
                                <div className='sm:grid grid-cols-2 gap-4 px-6'>

                                    <div className='border-b p-4 flex items-center justify-center text-start'>
                                           <img className='h-16 mr-8' src="/images/transparentes/infografia-20.png" alt="" />
                                        <div>
                                            <h1 className='font-semibold text-semibold text-lg'>Formato</h1>
                                            <p className='text-sm'>Aceptamos archivos: .pdf, .jpg, .png, .tif, .svg, .eps <span className='opacity-0'>---------------------------------------</span></p>
                                        </div>
                                    </div>
                                    <div className='border-b p-4 flex items-center justify-center text-start'>
                                        <img className='h-16 mr-3' src="/images/transparentes/infografia-21.png" alt="" />
                                        <div>
                                            <h1 className='font-semibold text-semibold text-lg'>Tu diseño</h1>
                                            <p className='text-sm'>Se recomienda que mandes tu diseño en curvas/vectores, y en caso de ser <br />
                                             imagen rasterizada se pide una calidad de 300DPI. Esto para asegurar la calidad <br />
                                              de imagen de tu producto.</p>
                                        </div>
                                    </div>
                                    <div className='border-b p-4 flex items-center justify-center text-start'>
                                        <img className='h-14 md:mr-3' src="/images/transparentes/infografia-22.png" alt="" />
                                        <div>
                                            <h1 className='font-semibold text-semibold text-lg'>Suaje</h1>
                                            <p className='text-sm'>Por favor incluye las líneas de corte para que sepamos con seguridad cómo <br />
                                             quieres que se vea tu producto. Si tienes dificultad para realizar el suaje/líneas de <br />
                                             corte no hay problema, nuestro equipo de diseño se encargará de ayudarte.</p>
                                        </div>
                                    </div>
                                    <div className='border-b p-4 flex items-center justify-center text-start'>
                                        <img className='h-16 mr-2 md:mr-3' src="/images/transparentes/infografia-23.png" alt="" />
                                        <div>
                                            <h1 className='font-semibold text-semibold text-lg'>Tipografía y textos</h1>
                                            <p className='text-sm'>Si incluyes alguna tipografía o texto en tu diseño asegúrate de convertir en curvas <br />
                                             para poder utilizar tu archivo sin problemas.</p>
                                        </div>
                                    </div>
                                    <div className='border-b p-4 flex items-center justify-center text-start'>
                                        <img className='h-16 mr-3 md:mr-6' src="/images/transparentes/infografia-24.png" alt="" />
                                        <div>
                                            <h1 className='font-semibold text-semibold text-lg'>Tipo de corte</h1>
                                            <p className='text-sm'>En la mayoría de nuestros productos encontrarás la opción entre corte “Kiss-cut” y <br />
                                             “Die-cut” (también conocido como troquelado). “Kiss-cut” es un corte superficial <br />
                                              siguiendo la silueta del diseño sin llegar a cortar el papel de despliegue, mientras <br />
                                               que “Die-cut” corta el papel de despliegue con la forma de tu diseño.</p>
                                        </div>
                                    </div>
                                    <div className='border-b p-4 flex items-center justify-center text-start'>
                                        <img className='h-16 mr-3' src="/images/transparentes/infografia-25.png" alt="" />
                                        <div>
                                            <h1 className='font-semibold text-semibold text-lg'>Prueba de impresión</h1>
                                            <p className='text-sm'>Nuestro equipo de diseño se encargará de revisar que todo se encuentre en <br />
                                             orden en tu archivo, en caso de que se requieran ajustes se te notificará en tu <br />
                                              prueba de impresión digital, así como también se te mostrará cómo quedará tu <br />
                                              diseño una vez impreso. </p>
                                        </div>
                                    </div>
                                    <div className='border-b p-4 flex items-center justify-center text-start'>
                                        <img className='h-20 mr-6' src="/images/transparentes/infografia-26.png" alt="" />
                                        <div>
                                            <h1 className='font-semibold text-semibold text-lg'>Tamaño de impresión</h1>
                                            <p className='text-sm'>Al seleccionar tu tamaño de impresión recuerda que nos basaremos en la medida <br />
                                            más grande de tu diseño, esto para no distorsionar y deformarlo.</p>
                                        </div>
                                    </div>
                                    
                                   
                                </div>    
                            </Modal>
                        </div>

                        <div>
                            <button
                            onClick={modalCorte.openModal} 
                            className='w-[30vh] py-[0.5vh] text-[1.7vh] text-gray-900 active:text-white font-semibold rounded 
                            bg-gray-300 hover:bg-gray-400 active:bg-slate-500 transition duration-200 ease-in-out'>
                                Ejemplo de lineas de corte
                            </button>
                            <Modal
                            isOpen={modalCorte.isOpen}
                            onClose={modalCorte.closeModal}>
                                <>
                                <img 
                                    className='w-full md:h-[600px]'
                                    src={lineasDeCorte} alt="" />
                                </>
                            </Modal>
                        </div>

                        <div>
                            <button 
                            onClick={handleAddToCartAndSubmit}
                            className='bg-secondary-green hover:bg-lime-400 active:bg-lime-600
                            px-[6vh] py-[1.5vh] text-[2.2vh] font-semibold text-white rounded transition duration-300 ease-in-out'>
                                Añadir al carrito
                            </button>
                        </div>
                
                </div> 
                

</form>





</div>


</div>
     <NecesitasAyudaConTusArchivos/>

     <PorqueSomosLosMejores/>
    </>
  )
}
