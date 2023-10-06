import React, { useEffect, useState } from 'react'
import { BsQuestionLg } from 'react-icons/bs'
import { useCart } from '../TuPutaHermanContext'
import useTooltip from '../hooks/useTooltip'
import Tooltip from './Tooltip'
import useModal from '../hooks/useModal'
import Modal from './Modal'
import { getAuth } from 'firebase/auth'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useLocation, useNavigate } from 'react-router-dom'


    export default function ProductoFuck( {imgSrc, product, description } ) {
        const navigate = useNavigate()
        const auth = getAuth()
        const location = useLocation()

        // firestore create-product
        const [ formData, setFormData ] = useState({ 
            corte: "kis-cut",
        })

        const [ size, setSize ] = useState('2x2cm')
        const [ quantity, setQuantity ] = useState(50)
        

        const { corte } = formData

        const handleInputChange = (e) => {
            const { id, value } = e.target
            setFormData({
                ...formData,
                [id]: value,
            })
        }

        const handleSubmit = (e) => {
            e.preventDefault()

            const data = {
                ...formData,
                product: product,
                size: size,
                quantity: quantity,
                price: currentPrice,
                imgSrc: imgSrc,
                userRef: auth.currentUser.uid,
                timestamp: serverTimestamp(),
                preview: "/images/identidad/isotipo.png",
            }

            const docRef = collection(db, "orders")

            addDoc(docRef, data)
            .then(() => {
                setFormData({
                    corte: "kis-cut"
                })
                // navigate("/profile")
            })
            .catch((error) => {
                console.error("Error creating pedidos: ", error)
            })


        }

        


        // tooltip
        const [ isTooltipVisible, setIsTooltipVisible ] = useState(false)
        const [ isTooltipVisible2, setIsTooltipVisible2 ] = useState(false)

        // modal
        const modalDimensiones = useModal()
        const modalImpresion = useModal()
        const modalCorte = useModal()

        
        
        const { addToCart } = useCart()

        
       

        const calculatePrice = (selectedSize, selectedQuantity) => {
            return selectedSize === '2x2cm'
            ? selectedQuantity * 100
            : selectedSize === '5x5cm'
            ? selectedQuantity * 150
            : selectedSize === '10x10cm'
            ? selectedQuantity * 200
            : selectedSize === '15x15cm'
            ? selectedQuantity * 250
            : 0
        }  

        const [ currentPrice, setCurrentPrice ] = useState(calculatePrice(size, quantity))


        const handleSizeChange = (selectedSize) => {
            setSize(selectedSize)
            setCurrentPrice(calculatePrice(selectedSize, quantity))
        }

        const handleQuantityChange = (selectedQuantity) => {
            setQuantity(selectedQuantity)
            setCurrentPrice(calculatePrice(size, selectedQuantity))
        }


        

        function handleAddToCart(e) {
            e.preventDefault()
            const item = {
                product,
                quantity,
                size,
                price: currentPrice,
            }
            addToCart(item)
        }

        const [ imagePreviews, setImagePreviews ] = useState([])

        function handleImagePreview(e) {
            const imageFiles = e.target.files
            const previews = []
            for(let i = 0; i < imageFiles.length; i++) {
                previews.push(URL.createObjectURL(imageFiles[i]))
            }
            setImagePreviews(previews)
        }


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

                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col items-center justify-center space-y-6'>

                            <div className='flex items-center justity-center space-x-2'>
                                <p>Tamaño</p>
                                <select 
                                id='size' 
                                value={size}
                                onChange={(e) => handleSizeChange(e.target.value)}>
                                <option value="2x2cm">2x2cm</option>
                                <option value="5x5cm">5x5cm</option>
                                <option value="10x10cm">10x10cm</option>
                                <option value="15x15cm">15x15cm</option>
                                <option value="Personalizado">Personalizado</option>
                                </select>

                                <Tooltip
                                isTooltipVisible={isTooltipVisible}
                                content={<h1 className='text-lg font-semibold whitespace-nowrap opacity-0'>
                                    Guía para selección de tamañojjjjjjjjjjjjjjjjjjjjjjjjjjjjj</h1>}
                                imageSrc="/images/informativos/infografia-seleccion tamano.jpg">
                                    <div
                                    onMouseEnter={() => setIsTooltipVisible(true)}
                                    onMouseLeave={() => setIsTooltipVisible(false)}
                                    className='bg-gray-300 rounded-full p-0.5 cursor-pointer'>
                                            <BsQuestionLg/>
                                    </div>
                                </Tooltip>

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
                                        <img 
                                        className='w-full md:h-[600px]'
                                        src="/images/informativos/guia dimensiones.jpg" alt="" />

                                    </Modal>
                            </div>

                            <div className='flex items-center justify-center space-x-2'>
                                <p>Corte</p>
                                <select
                                id='corte' 
                                onChange={handleInputChange}
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
                                style={{width: "130px"}} 
                                id="quantity" 
                                value={quantity}
                                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="250">250</option>
                                </select>
                            </div>

                            <div className='flex items-center justify-center space-x-2'>
                                <p>Precio</p>
                                <input 
                                type="number" 
                                id='price' 
                                value={currentPrice}
                                onChange={(e) => setCurrentPrice(parseFloat(e.target.value))}
                                style={{width: "150px"}}
                                 />
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
                                    <img 
                                        className='w-full md:h-[680px]'
                                        src="/images/informativos/infografia-guia impresion avanzada.jpg" alt="" />
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
                                    <img 
                                        className='w-full md:h-[600px]'
                                        src="/images/informativos/infografia-lineas de corte.jpg" alt="" />
                                </Modal>
                            </div>

                            <div>
                                <button 
                                onClick={handleAddToCart}
                                className='bg-secondary-green hover:bg-lime-400 active:bg-lime-600
                                px-10 py-2.5 font-semibold text-white rounded transition duration-300 ease-in-out'>
                                    Añadir al carrito
                                </button>
                            </div>



                        </div>
                    </form>
                    

                </div>

            </div>

        </>
    )
    }
