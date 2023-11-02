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

// const priceTable = {
//     '5x5': [16.0, 9.6, 6.6, 5.9, 5.3, 4.8, 4.3],
//     '7.5x7.5': [20.0, 12.0, 8.2, 7.4, 6.6, 6.0, 5.4],
//     '10x10': [23.0, 13.8, 9.4, 8.5, 7.6, 6.9, 6.2],
//   }
  
// const quantityIndexes = [25, 50, 100, 200, 300, 500, 1000]

// MUESTRAS
export default function ProductoMuestras({ imgSrc, product, description }) {
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
    const modalKissDie = useModal()
    const modalForma = useModal()

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

    const [size, setSize] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [unitPrice, setUnitPrice] = useState(400.0);
    const [ currentPrice, setCurrentPrice ] = useState(0.0)

    // useEffect(() => {
    //     const sizeIndex = quantityIndexes.indexOf(quantity);
    //     const newUnitPrice = priceTable[size][sizeIndex];
    //     setUnitPrice(newUnitPrice);
    // }, [size, quantity]);

    // Update currentPrice whenever unitPrice or quantity changes
    // useEffect(() => {
    //     const calculatedPrice = ( unitPrice * quantity ).toFixed(2)
    //     setCurrentPrice(calculatedPrice)
    // }, [unitPrice, quantity])

    // const baseUnitPrice = priceTable[size][0];
    // const discountPercentage = ((baseUnitPrice - unitPrice) / baseUnitPrice) * 100;

    
    // CORTE
    const [ corte, setCorte] = useState('kis-cut')

    // FORMA
    const [ forma, setForma ] = useState('circular')
   
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
                    corte: corte,
                    forma: forma,
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
      <div className='h-[80vh] flex flex-wrap items-center justify-center space-x-0 md:space-x-24'>

            <div className='flex flex-col items-center justify-center mt-6 md:mt-0'>

                    <img
                    className='h-[300px] md:h-[450px]' 
                    src={imgSrc} alt={product} />


            </div>


            <div className='flex flex-col items-center justify-center px-10 md:px-0 space-y-6 mb-16 mt-16'>

                    <p className='text-4xl font-semibold text-gray-900'>{product}</p>
                    <p className='font-semibold text-gray-900'>{description}</p>

            <form>

                          <div className='flex flex-col items-center justify-center space-y-6'>
                                  
                                    <div className='flex items-center justity-center space-x-2'>
                                      

                                      

                                        </div>

                                        
                                    
                                        <div className='flex items-center justify-center space-x-2'>
                                           <p>Precio</p>
                                           <input 
                                           style={{width: "158px"}}
                                           disabled 
                                           value='$0.0'
                                           type="text" />
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
