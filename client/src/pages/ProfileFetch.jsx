import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../TuPutaHermanContext'
import Modal from '../components/Modal'
import useModal from '../hooks/useModal'
import { style } from '../components/Styles'
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { toast } from 'react-toastify'

export default function ProfileFetch() {

    // display user's name and email
    const auth = getAuth()

    // fetch pedidos
    const [ orders, setOrders ] = useState([])
    
    useEffect(() => {
        async function fetchUserOrders() {
            const ordersRef = collection(db, "orders")
            const q = query(ordersRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"))
            const querySnap = await getDocs(q)
            let orders = []
            querySnap.forEach((doc) => {
                return orders.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setOrders(orders)
        }
        fetchUserOrders()
    }, [auth.currentUser.uid])

  

  return (
    <>
   
        <section className='max-w-6xl mx-auto h-[200px] flex flex-col justify-center items-center'>
            
            {orders.length > 0 ? (
                orders.map((order) => (
                    <>
                       <p className='text-gray-900' key={order.id}>{order.data.product}</p>
                    </>
                ))
            ) : "no orders..."}

            {orders.length > 0 && (
                orders.map((order) => (
                    <>
                    <p key={order.userRef}>{order.corte}</p></>
                ))
            )}


        </section>
    </>
  )
}
