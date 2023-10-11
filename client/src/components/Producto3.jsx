import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useModal from '../hooks/useModal'
import Modal from './Modal'
import useTooltip from '../hooks/useTooltip'
import Tooltip from './Tooltip'
import { BsQuestionLg } from 'react-icons/bs'
import { getAuth } from 'firebase/auth'
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

const priceTable = {
    '5x5': [22.0, 13.6, 11.0, 9.9, 8.8, 7.5, 5.9],
    '7.5x7.5': [27.0, 16.7, 13.5, 12.2, 10.8, 9.2, 7.3],
    '10x10': [32.0, 19.8, 16.0, 14.4, 12.8, 10.9, 8.6],
  };
  
const quantityIndexes = [25, 50, 100, 200, 300, 500, 1000]

// METALICO - ESPEJO
export default function Producto3({ imgSrc, product, description }) {
    // CONFIGS
    const navigate = useNavigate()
    const auth = getAuth()
    const location = useLocation()

    // TOOLTIP
    const [ isTooltipVisible, setIsTooltipVisible ] = useState(false)
    const [ isTooltipVisible2, setIsTooltipVisible2 ] = useState(false)
    const [ isTooltipVisible3, setIsTooltipVisible3 ] = useState(false)

    // MODAL
    const modalDimensiones = useModal()
    const modalImpresion = useModal()
    const modalCorte = useModal()

    const [size, setSize] = useState('5x5');
    const [quantity, setQuantity] = useState(25);
    const [unitPrice, setUnitPrice] = useState(16.0);

    useEffect(() => {
        const sizeIndex = quantityIndexes.indexOf(quantity);
        const newUnitPrice = priceTable[size][sizeIndex];
        setUnitPrice(newUnitPrice);
    }, [size, quantity]);

    const baseUnitPrice = priceTable[size][0];
    const discountPercentage = ((baseUnitPrice - unitPrice) / baseUnitPrice) * 100;
    const currentPrice = (unitPrice * quantity).toFixed(2)

    
    // CORTE
    const [ corte, setCorte] = useState('kis-cut')

   

    
 


   
   // IMAGE PREVIEW
    const [ imagePreviews, setImagePreviews ] = useState([])
    const [ selectedImageFile, setSelectedImageFile ] = useState(null)

    function handleImagePreview(e) {
        const imageFile = e.target.files[0]
        setSelectedImageFile(imageFile)
        const previewUrl = URL.createObjectURL(imageFile)
        setImagePreviews([previewUrl])
    }
    
    // HANDLE ADD TO CART AND SUBMIT TOGHETER
    const { addToCart } = useCart()

    function handleAddToCartAndSubmit(e) {
        e.preventDefault()

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
            corte: corte,
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
    localStorage.setItem('data', JSON.stringify(formData))
   
   }


    //  GET LOCAL STORAGE DATA && ADD DOC ORDERS
    useEffect(() => {
        if(window.location.href.includes('approved')) {
            const retrievedData = JSON.parse(localStorage.getItem('data'))
            const docRef = collection(db, 'orders')
            addDoc(docRef, retrievedData)
            navigate('/profile')

        } 
    }, [window.location.href])
  
    
  return (
    <>
      <div className='flex flex-wrap items-center justify-center space-x-0 md:space-x-24'>

            <div className='flex flex-col items-center justify-center mt-6 md:mt-0'>

                    {imagePreviews.length === 0 && (
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
                     )}

            </div>


            <div className='flex flex-col items-center justify-center px-6 md:px-0 space-y-6 mb-16 mt-16'>

                    <p className='text-4xl font-semibold text-gray-900'>{product}</p>
                    <p className='font-semibold text-gray-900'>{description}</p>

            <form>

                          <div className='flex flex-col items-center justify-center space-y-6'>
                                    <div>
                                    <div className='flex items-center justity-center space-x-2'>
                                        <p>Tamaño</p>
                                        <select 
                                        id='size' 
                                        value={size}
                                        style={{width: '165px'}}
                                        onChange={(e) => setSize(e.target.value)}>
                                          <option value="5x5">5x5</option>
                                          <option value="7.5x7.5">7.5x7.5</option>
                                          <option value="10x10">10x10</option>
                                        </select>
                                        

                                        <Tooltip
                                        isTooltipVisible={isTooltipVisible}
                                        content={<h1 className='text-lg font-semibold whitespace-nowrap opacity-0'>
                                            -------------------------------------------</h1>}
                                        imageSrc={seleccionTamano}>
                                            <div
                                            onMouseEnter={() => setIsTooltipVisible(true)}
                                            onMouseLeave={() => setIsTooltipVisible(false)}
                                            className='bg-gray-300 rounded-full p-0.5 cursor-pointer'>
                                                    <BsQuestionLg/>
                                            </div>
                                        </Tooltip>

                                    </div>
                                    <div className='flex justify-center items-center mt-2'>
                                        <p className='text-xs text-start'>¿No encuentras el tamaño que buscas? <br /> 
                                        <Link className='underline' to={'/contacto'}>Ponte en contacto con nosotros.</Link>
                                        </p>
                                        <Tooltip
                                        isTooltipVisible={isTooltipVisible3}
                                        content={<h1 className='text-lg font-sembibold whitespace-nowrap opacity-0'>
                                            -------------------------------------------</h1>}
                                        imageSrc={tamanoPersonalizado}>
                                            <div 
                                            onMouseEnter={() => setIsTooltipVisible3(true)}
                                            onMouseLeave={() => setIsTooltipVisible3(false)}
                                            className='bg-gray-300 rounded-full p-0.5 ml-2 cursor-pointer'>
                                            <BsQuestionLg/>
                                            </div>
                                        </Tooltip>
                                    </div>
                                    </div>
                                    

                                    <div>
                                            <button 
                                            onClick={modalDimensiones.openModal}
                                            className='px-7 py-1 text-xs text-gray-900 active:text-white font-semibold rounded 
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

                                    <div className='flex items-center justify-center space-x-2'>
                                            <p>Corte</p>
                                            <select
                                            id='corte' 
                                            onChange={(e) => setCorte(e.target.value)}
                                            style={{width: "190px"}}>
                                            <option value="kis-cut">Kiss-cut</option>
                                            <option value="die-cut">Die-cut</option>
                                            </select>

                                            <Tooltip
                                            isTooltipVisible={isTooltipVisible2}
                                            content={<h1 className='text-lg font-semibold whitespace-nowrap opacity-0'>
                                            Guía de cortejjjjjjjjjjjjjjjjjjjjjjjjjjjjj</h1>}
                                            imageSrc="/images/informativos/infografia-tipo de corte.jpg">
                                            <div
                                            onMouseEnter={() => setIsTooltipVisible2(true)}
                                            onMouseLeave={() => setIsTooltipVisible2(false)}
                                            className='bg-gray-300 rounded-full p-0.5 cursor-pointer'>
                                                <BsQuestionLg/>
                                            </div>
                                            </Tooltip>

                                    </div>

                                    <div className='flex items-center justify-center space-x-2'>
                                                <p>Cantidad</p>
                                                <select 
                                                style={{width: "133px"}} 
                                                id="quantity" 
                                                value={quantity}
                                                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}>
                                                {quantityIndexes.map((q) => (
                                                    <option key={q} value={q}>{q}</option>
                                                ))}
                                                </select>
                                    </div>

                                    
                                        <div className='flex items-center justify-center space-x-2'>
                                           <p>Precio</p>
                                           <input 
                                           style={{width: "158px"}}
                                           disabled value={`$${(unitPrice * quantity).toFixed(2)}` }type="text" />
                                        </div>
                                        <div className='flex items-center justify-center space-x-2'>
                                           <p>Precio Unitario</p>
                                           <input
                                           style={{width: "90px"}} 
                                           disabled value={`$${unitPrice.toFixed(2)}`} type="text" />
                                        </div>
                                        <div className='flex items-center justify-center space-x-2'>
                                           <p>Descuento</p>
                                           <input
                                           style={{width: "122px"}} 
                                           disabled 
                                           value={`${discountPercentage.toFixed(0)}%`} 
                                           type="text" />
                                        </div>
                                   

                                    <div>
                                        <label className='bg-secondary-blueLight hover:bg-blue-300 active:bg-blue-400
                                        px-10 py-2.5 font-semibold rounded transition duration-300 ease-in-out'>
                                            Sube tu archivo
                                            <input 
                                            type="file"
                                            required
                                            accept='.jpg,.png,.jpeg'
                                            onChange={(e) => handleImagePreview(e)}
                                            style={{display: "none"}} />
                                        </label>
                                    </div>

                                    <div>
                                        <button
                                        onClick={modalImpresion.openModal} 
                                        className='px-4 py-1 text-xs text-gray-900 active:text-white font-semibold rounded 
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
                                        className='px-5 py-1 text-xs text-gray-900 active:text-white font-semibold rounded 
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
                                        px-10 py-2.5 font-semibold text-white rounded transition duration-300 ease-in-out'>
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
