import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../TuPutaHermanContext'

export default function ProductoFirestore({imgSrc, product, description}) {
    const { addToCart } = useCart()
        const [ quantity, setQuantity ] = useState(50)
        const [ size, setSize ] = useState('2x2cm')
       

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


    const [ myInput, setMyInput ] = useState("")
    const [ price, setPrice ] = useState(0)
    const [ corte, setCorte ] = useState("kis-cut")

    const navigate = useNavigate()

    const docRef = collection(db, "productos")

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            myInput: myInput,
            price: price,
            product: product,
            description: description,
            size: size,
            corte: corte,
        }

        addDoc(docRef, data).then(() => {
            setMyInput("")
            setPrice(0)
            navigate("/")
        })
    }



  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" value={myInput} onChange={(e) => setMyInput(e.target.value)} />
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            <p className='text-4xl font-semibold text-gray-900'>{product}</p>

            {description.split('\n').map((line, index) => (
                 <p key={index} className='font-semibold text-gray-900'>{line}</p>
            ))}

{/* "Stickers impresos en un vinil blanco resistente al agua y al sol, \n" +
            "con un acabado brillante y levemente reflejante. Dale ese \n" +
            "toque profesional a tus stickers con nuestro acabado brillante." */}

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

                                <p>Corte</p>
                                <select style={{width: "190px"}} id='corte' onChange={(e) => setCorte(e.target.value) }>
                                <option value="kis-cut">Kiss-cut</option>
                                <option value="die-cut">Die-cut</option>
                                </select>
           

            <button type='submit'>Enviar</button>
        </form>
    </div>
  )
}
