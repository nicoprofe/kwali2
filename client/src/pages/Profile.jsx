import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useModal from '../hooks/useModal'
import { getAuth } from 'firebase/auth'
import { arrayUnion, collection, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { style } from '../components/Styles'
import Modal from '../components/Modal'
import TermsAndConditions from './TermsAndConditions'

export default function Profile() {
    const navigate = useNavigate()
    const formRef = useRef(null)

    // display user's name and email
    const auth = getAuth()

    const [ formData, setFormData ] = useState({
        username: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })

    const { username, email } = formData


    const [ formData2, setFormData2 ] = useState({
        fullName: '',
        address: '',
        address2: '',
        city: '',
        municipality: '',
        postalCode: '',
        state: '',
        phone: '',
        shippingOption: 'standard',
    })

    const { fullName, address, address2, city, municipality, postalCode, state, phone, shippingOption } = formData

    // LOGOUT
    function handleLogout() {
        auth.signOut()
        navigate('/')
    }

    
    // modal hook
    const imageModal = useModal()
    const changesModal = useModal()
    const aproveFirst = useModal()
    const aproveSecond = useModal()
    const myProfile = useModal()
    const modalTerminos = useModal()
    const modalPrivacidad = useModal()
    const modalDatos = useModal()


    // FETCH USER ORDERS
    const [ selectedOrderImage, setSelectedOrderImage ] = useState('/image/identidad/isotipo.png')
    const [ orders, setOrders ] = useState([])
    const [ selectedOrderId, setSelectedOrderId ] = useState(null)
    
    useEffect(() => {
        async function fetchUserOrders() {
            const ordersRef = collection(db, "orders")
            const q = query(ordersRef, where("userRef", "==", auth.currentUser.uid),)
            const querySnap = await getDocs(q)
            let orders = []
            querySnap.forEach((doc) => {
                const data = doc.data()
                const isPreviewAccepted1 = data.approval1
                const isPreviewAccepted2 = data.approval2
                const changes = data.changes || []
                const emailOrderSent = data.emailOrderSent

                orders.push({
                    id: doc.id,
                    data: data,
                    isPreviewAccepted1: isPreviewAccepted1,
                    isPreviewAccepted2: isPreviewAccepted2,
                    changes: changes,
                    emailOrderSent: emailOrderSent,
                })
               
            })
            setOrders(orders)
        }
        fetchUserOrders()
    }, [auth.currentUser.uid])

    // Trigger the updateOrderStatusAndSendEmail function only once for each order with emailOrderSent set to false
    useEffect(() => {
    orders.forEach((order) => {
        if (!order.emailOrderSent && order.id) {
            console.log(`Triggering update for order ${order.id}`);
            updateOrderStatusAndSendEmail(order, 'emailOrderSent');
        }
    });
    }, [orders]);

     // IMAGE PREVIEW ONLY ADMIN
     function handleImageUpload(e, orderIndex) {
        const imageFiles = e.target.files

        // Create a copy of the current orders array
        const updatedOrders = [...orders]

        for(let i = 0; i < imageFiles.length; i++) {
            const imageUrl =  (URL.createObjectURL(imageFiles[i]))
            const orderIdToUpdate = updatedOrders[orderIndex].id

            // Call the function to upload image an update order's preview
            updateOrderPreview(orderIdToUpdate, imageFiles[i])

            // Update the image preview in the local state
            updatedOrders[orderIndex].data.preview = imageUrl
        }


        // Update the local state with the mofified orders
        setOrders(updatedOrders)

    }

    // FUNCTION TO UPLOAD IMAGE AND UPDATE ORDER'S PREVIEW
    async function updateOrderPreview(orderId, imageFile) {
        try {
            // Upload image to storage
            const storage = getStorage()
            const fileName = `${auth.currentUser.uid}-${imageFile.name}-${uuidv4()}`
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, imageFile)

            // Wait for the upload to complete
            const snapshot = await uploadTask

            // Get the download URL
            const downloadUrl = await getDownloadURL(snapshot.ref)

            // Update the 'preview' field in the specified order document
            const orderRef = doc(db, 'orders', orderId)
            await updateDoc(orderRef, {
                preview: downloadUrl
            })

            console.log('Image uploaded and order preview updated successfully')
        } catch (error) {
            console.error('Error uploading image', error)
        }
    }


      // FUNCTION TO UPDATE ORDER STATUS AND SEND EMAIL NOTIFICATION
        async function updateOrderStatusAndSendEmail(order, emailOrderSentField) {
            const orderRef = doc(db, 'orders', order.id)
    
            try {
                await updateDoc(orderRef, {
                    [emailOrderSentField]: true
                })
                console.log(`Updated ${emailOrderSentField} to true for order ID ${order.id}`)
    
    
                // Fetch the user's email associated with this order
                const orderData = orders.find((o) => o.id === order.id)
                if(orderData) {
                    const userDocRef = doc(db, 'users', orderData.data.userRef)
                    const userDocSnap = await getDoc(userDocRef)
    
                    if(userDocSnap.exists()) {
                        const userData = userDocSnap.data()
                        const userEmail = userData.email
                        console.log(`userEmail ${userEmail}`)
    
                        // If the user's email is available, send an email notification to the user
                        if(userEmail) {
                            await axios.get(`https://kwali2-server.vercel.app/send-order-emails?email=${userEmail}`)
                        }
                    }
                }
    
    
            } catch (error) {
                console.error(`Error updating ${emailOrderSentField}`, error)
            }
        }
    
      

    // FUNCTION TO UPDATE APPROVAL STATUS AND SEND EMAIL NOTIFICATION
    async function updateApprovalStatusAndSendEmail(order, approvalField) {
        const orderRef = doc(db, 'orders', order.id)

        try {
            await updateDoc(orderRef, {
                [approvalField]: true
            })
            console.log(`Updated ${approvalField} to true for order ID ${order.id}`)

            // Update the approval status in the local state
            order.isPreviewAccepted = true
            setOrders((prevOrders) => [ ...prevOrders]) // Trigger a re-render 

            // Fetch the user's email associated with this order
            const orderData = orders.find((o) => o.id === order.id)
            if(orderData) {
                const userDocRef = doc(db, 'users', orderData.data.userRef)
                const userDocSnap = await getDoc(userDocRef)

                if(userDocSnap.exists()) {
                    const userData = userDocSnap.data()
                    const userEmail = userData.email
                    console.log(`userEmail ${userEmail}`)

                    // If the user's email is available, send an email notification to the user
                    if(userEmail) {
                        await axios.get(`https://kwali2-server.vercel.app/send-approval-emails?email=${userEmail}`)
                    }
                }
            }


        } catch (error) {
            console.error(`Error updating ${approvalField}`, error)
        }
    }


    // CHANGES FORM
    const [ requestedChanges, setRequestedChanges ] = useState('')

    const handleSubmitChanges = async (e) => {
        e.preventDefault()
        console.log('Form submitted')
        
        // Check if requestedChanges is not empty
        if(requestedChanges.trim() === '') {
            // Display an error message or prevent submission
            return
        }

        // Create a message object with sender (user) and text (requested changes)
        const message = {
            text: requestedChanges,
        }

        // Sen the message to Firestore for the selected order
        if(selectedOrderId) {
            // Update the document with the message data using arrayUnion
            await updateDoc(doc(db, 'orders', selectedOrderId), {
                changes: arrayUnion(requestedChanges)
            })
        }

        // Update the local state with the new changes
        setOrders((prevOrders) => 
        prevOrders.map((prevOrder) => 
        prevOrder.id === selectedOrderId
        ? {
            ...prevOrder,
            changes: [...prevOrder.changes, requestedChanges],
          }
        : prevOrder
        )
        )

        // Clear the requestedMessage inputField
        setRequestedChanges('')

        // Close the modal
        changesModal.closeModal()

        // Fetch the user's email associated with this order
        const orderData = orders.find((o) => o.id === selectedOrderId)
        if(orderData) {
            const userDocRef = doc(db, 'users', orderData.data.userRef)
            const userDocSnap = await getDoc(userDocRef)

            if(userDocSnap.exists()) {
                const userData = userDocSnap.data()
                const userEmail = userData.email
                console.log(`userEmail ${userEmail}`)
                console.log(`requestedChanges ${requestedChanges}`)

                // If the user's email is available, send an email notification to the user
                if(userEmail) {
                    await axios.get(`https://kwali2-server.vercel.app/send-change-emails?email=${userEmail}&message=${requestedChanges}`) 
                }
            }

        }
    }

    const handleChange = () => {
        
    }

    const handleSubmit = () => {

    }


  return (
    <div>
        <p
            onClick={handleLogout}
            className='px-2 md:px-7 py-2 text-blue-600 hover:text-blue-800 transiton duration-300 cursor-pointer'>
                Cerrar Sesión
        </p>

        <div className='flex items-center justify-start mt-6 mb-6 px-7 space-x-6'>
            <img src="/images/iconos/icono-user.png" alt="" width={110} />
            <div className='flex flex-col items-start justify-center'>
                <p className='font-semibold'>{username} </p>
                <p className=''>{email}</p>
                <button
                onClick={modalDatos.openModal} 
                className='bg-gray-200 hover:bg-gray-300 active:bg-gray-500 active:text-white
                duration-300 px-4 py-0.5 mt-2 text-sm font-medium'>Mis datos</button>
            </div>
            <Modal
            isOpen={modalDatos.isOpen}
            onClose={modalDatos.closeModal}>
                  <div className='flex items-center justify-start mt-6 mb-6 px-6 md:px-0 space-x-6'>
                    <img src="/images/iconos/icono-user.png" alt="" width={110} />
                    <div className='flex flex-col items-start justify-center'>
                        <p className='font-semibold'>{username} </p>
                        <p className=''>{email} </p>
                    </div>

                    
            
                  </div>
                  
        <div className='bg-gray-200 w-full flex flex-col items-center justify-center px-6 md:px-6 '>
        <h2 className='font-medium mt-3 mb-6'>Editar dirección</h2>

        <form>
            <>
            {orders.length > 0 && (
                
                <div>
                    <div className='flex items-center justify-between space-x-4 mb-6'>
                        <label htmlFor="">Nombre completo </label>
                        <input 
                        onChange={handleChange}
                        className='py-0.5 w-[370px] md:w-80'
                        name='fullName'
                        id='fullName'
                        value={orders[0].data.fullName}
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
                        value={orders[0].data.address}
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
                        value={orders[0].data.address2}
                        type="text" />
                    </div>
                    <div className='flex items-center justify-between space-x-4 mb-7'>
                        <label htmlFor="">Ciudad</label>
                        <input 
                        onChange={handleChange}
                        className='py-0.5 w-80'
                        name='city'
                        id='city'
                        value={orders[0].data.city}
                        type="text" />
                    </div>
                    <div className='flex items-center justify-between space-x-4 mb-7'>
                        <label htmlFor="">Municipio</label>
                        <input 
                        onChange={handleChange}
                        className='py-0.5 w-80'
                        name='municipality'
                        id='municipality'
                        value={orders[0].data.municipality}
                        type="text" />
                    </div>
                    <div className='flex items-center justify-between space-x-4 mb-7'>
                        <label htmlFor="">Código Postal</label>
                        <input 
                        onChange={handleChange}
                        className='py-0.5 w-80'
                        name='postalCode'
                        id='postalCode'
                        value={orders[0].data.postalCode}
                        type="text" />
                    </div>
                    <div className='flex items-center justify-between space-x-4 mb-4'>
                        <label htmlFor="">Estado</label>
                        <input 
                        onChange={handleChange}
                        className='py-0.5 w-80'
                        name='state'
                        id='state'
                        value={orders[0].data.state}
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
                        value={orders[0].data.phone}
                        type="text" />
                    </div>

                    <div className='flex items-start justify-start space-x-14 mb-4'>
                        <p className=''>Tipo de envío</p>

                        <div className='space-y-2'>
                        <div className='flex items-center justify-start space-x-2'>
                            <input 
                            onChange={handleChange}
                            checked={orders[0].data.shippingOption === 'standard'}
                            type="radio" name="shippingOption" id="standard" value='standard' />
                            <label className='text-sm' htmlFor="standard">Estandar - $99mxn - 5 a 7 días</label>
                        </div>
                        <div className='flex items-center justify-start space-x-2 '>
                            <input 
                            onChange={handleChange}
                            checked={orders[0].data.shippingOption === 'express'}
                            type="radio" name="shippingOption" id="express" value='express'/>
                            <label className='text-sm' htmlFor="express">Express - $180mxn - 1 a 2 días</label>
                        </div>
                        </div>  
                    </div>
                </div>
            )}

            
            </>


        </form>
    </div>
            </Modal>
        </div>

        <p className='text-center font-semibold text-2xl'>Historial de pruebas de impresión</p> 

        {/* TABLE */}
        <div className='h-full p-5'>
            <div className="overflow-auto rounded-lg shadow hidden md:block">
                <table className='w-full'>

                    <thead className='bg-gray-50 border-b-2 border-gray-200'>
                        <tr>
                            <th className="p-3 text-sm font-semibold traking-whide text-left">
                                Producto
                            </th>
                            <th className=" p-3 text-sm font-semibold traking-whide text-left">
                                Compra realizada
                            </th>
                            <th className=" p-3 text-sm font-semibold traking-whide text-left">
                                Prueba de Impresión
                            </th>
                            <th className=" p-3 text-sm font-semibold traking-whide text-left">
                                Estado
                            </th>
                        </tr>
                    </thead>

                    <tbody className='divide-y divide-gray-100'>
                        {orders.map((order, index) => (
                            <tr className='bg-white'>

                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    <div className=' flex flex-col items-start '>
                                        <div className='flex flex-col items-center'>
                                        <img src={order.data.imgSrc} alt={order.data.product} className='h-24 w-24' />
                                        <p className='text-sm font-medium'>{order.data.product} x{order.data.quantity}</p>
                                        </div>
                                    </div>
                                </td>

                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    {order.data.timestamp 
                                        && order.data.timestamp._methodName === 'serverTimestamp' && (
                                            new Date().toLocaleDateString('es-MX', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })
                                        )}
                                        {order.data && (
                                            <div>
                                                <p>Nombre: {username}</p>
                                                <p>Email: {email} </p>
                                                <br />
                                                <p>Orden nro.: {order.id}</p>
                                                <p>Producto: {order.data.product}</p>
                                                <p>Cantidad: {order.data.quantity}</p>
                                                <p>Corte: {order.data.corte}</p>
                                                <p>Precio: ${order.data.price} </p>
                                            </div>
                                        )}
                                </td>

                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>

                                   <div className='flex items-center space-x-3'>

                                        {/* DISPLAY PREVIEW */}
                                        <div key={order.id} className='bg-white h-24 w-24 flex items-center justify-center'>
                                            <label htmlFor={`fileInput-${index}`} className=''>
                                                <img 
                                                    src={order.data.preview} // Use a default image if preview is not available
                                                    alt={order.id}
                                                    className='w-24 h-24' 
                                                    onClick={() => setSelectedOrderImage(order.data.preview)} />
                                            </label>


                                        </div>


                                        <div className='flex flex-col items-center justify-center space-y-3'>

                                            {/* MODAL PREVIEW BUTTON */}
                                            <button 
                                            onClick={() => {
                                                setSelectedOrderImage(order.data.preview)
                                                imageModal.openModal()
                                            }}
                                            className='bg-secondary-blueLight hover:bg-sky-300 active:bg-sky-400 
                                            text-xs active:text-white px-4 py-2 transition duration-200 ease-in-out'>
                                                Revisar prueba
                                            </button>

                                            {/* ASK FOR CHANGES BUTTON */}
                                            <button 
                                            onClick={() => {
                                                setSelectedOrderId(order.id)
                                                changesModal.openModal()
                                            }}
                                            className='bg-secondary-blueLight hover:bg-sky-300 active:bg-sky-400 
                                            text-xs active:text-white px-4 py-2 transition duration-200 ease-in-out'>
                                                Pedir cambios
                                            </button>


                                            {/* MODAL PREVIEW */}
                                            <Modal
                                            isOpen={imageModal.isOpen}
                                            onClose={imageModal.closeModal}
                                            >
                                                <img src={selectedOrderImage} alt="Preview"
                                                className='h-96 rounded'/>
                                            
                                            </Modal>

                                            {/* ASK FOR CHANGES MODAL */}
                                            {selectedOrderId === order.id && (
                                                <>
                                                    {/* DISPLAY MESSAGES */}
                                                    <Modal
                                                    isOpen={changesModal.isOpen}
                                                    onClose={changesModal.closeModal}>

                                                        
                                                        <div className=''>
                                                            {orders && orders.length > 0 && (
                                                                <>
                                                                        <div>
                                                                            {order.changes.length > 0 && (
                                                                                <ul className=' flex flex-col space-y-1'>
                                                                                {order.changes.map((message, index) => (
                                                                                    <li key={index}
                                                                                    className='bg-secondary-blueLight text-gray-700 p-2 h-full rounded '>
                                                                                        <p>{message}</p>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>



                                                                            )}
                                                                            
                                                                        </div>
                                                                </>
                                                            )}
                                                        </div>
                                                                
                                                        {/* SEND MESSAGES FORM  */}
                                                        <form onSubmit={handleSubmitChanges}>
                                                            <div className='flex flex-col items-center justify-center space-y-6 mt-3'>

                                                                <p className='text-md font-medium text-gray-900'>
                                                                    Introduce en el siguinte campo de texto los ajustes que se requieran hacer.
                                                                </p>
                                                                
                                                                <textarea 
                                                                rows='2'
                                                                value={requestedChanges}
                                                                onChange={(e => setRequestedChanges(e.target.value))}
                                                                className={`${style[0].input}`}/>

                                                                <button 
                                                                type='submit'
                                                                className='bg-gray-200 hover:bg-gray-300 active:bg-gray-400
                                                                text-gray-900 active:text-white px-5 py-1'
                                                                >Enviar</button>
                                                                
                                                            </div>
                                                        </form>
                                                    </Modal>
                                                
                                                
                                                </>
                                            )}
                                            

                                        </div>
                                    </div>
                                </td>
                                <td className='p-3 text-sm text-gray-700'>
                                    
                                    <div className='flex flex-col items-start justify-center space-y-3'>

                                        <p className='text-xs font-semibold'>{order.isPreviewAccepted1 || order.isPreviewAccepted2 === true ? 'Tu pedido está en proceso' : 'Pendiente por aprobar'}</p>
                                        <p 
                                        onClick={modalTerminos.openModal}
                                        className='text-xs underline cursor-pointer whitespace-nowrap'>
                                            Leer nuestras condiciones <br />
                                            antes de aprobar
                                        </p>

                                        <Modal
                                        isOpen={modalTerminos.isOpen}
                                        onClose={modalTerminos.closeModal}>
                                            <TermsAndConditions/>
                                        </Modal>
                                        
                                        
                                        <button 
                                        disabled={order.isPreviewAccepted1 || order.isPreviewAccepted2 === true}
                                        onClick={() => {
                                            setSelectedOrderId(order.id)
                                            
                                            aproveFirst.openModal()
                                        }}
                                        className={`bg-${order.isPreviewAccepted1 ? 'green-500 text-white' : 'secondary-blueLight hover:bg-sky-300 active:bg-sky-400' } 
                                        text-xs active:text-white px-4 py-1 transition duration-200 ease-in-out rounded`}>
                                        {order.isPreviewAccepted1 ? 'Prueba #1 aprobada' : 'Aprobar prueba #1' }</button>
                                        
                                        
                                        <button
                                        disabled={order.isPreviewAccepted1 || order.isPreviewAccepted2 === true}
                                        onClick={() => {
                                            setSelectedOrderId(order.id)
                                            aproveSecond.openModal()
                                        }}
                                        className={`bg-${order.isPreviewAccepted2 ? 'green-500 text-white' : 'secondary-blueLight hover:bg-sky-300 active:bg-sky-400'} 
                                        text-xs active:text-white px-4 py-1 transition duration-200 ease-in-out rounded`}>
                                        {order.isPreviewAccepted2 ? 'Prueba #2 aprobada' : 'Aprobar prueba #2' }</button>

                                        {selectedOrderId === order.id && ( 
                                            <>
                                                <Modal
                                                isOpen={aproveFirst.isOpen}
                                                onClose={aproveFirst.closeModal}>
                                                    <div className='flex flex-col items-center justify-center'>
                                                        <p className='text-sm mb-3'>Estás a punto de aprobar la prueba digital de impresión #1. ¿Estás seguro?</p>
                                                        <button
                                                        onClick={() => {
                                                            setSelectedOrderId('')
                                                            updateApprovalStatusAndSendEmail(order, 'approval1')
                                                            setOrders((prevOrders) => 
                                                            prevOrders.map((prevOrder) => 
                                                            prevOrder.id === order.id
                                                            ? { ...prevOrder, isPreviewAccepted1: true }
                                                            : prevOrder))
                                                            aproveFirst.closeModal()
                                                        }} 
                                                        className='text-center bg-gray-200 hover:bg-gray-300 active:bg-gray-400 
                                                        px-3 py-1 text-sm text-gray-900 active:text-white transition duration-200 ease-in-out'>
                                                            aprobar prueba #1
                                                        </button>
                                                    </div>
                                                </Modal>

                                                <Modal
                                                isOpen={aproveSecond.isOpen}
                                                onClose={aproveSecond.closeModal}>
                                                    <div className='flex flex-col items-center justify-center'>
                                                        <p className='text-sm mb-3'>Estás a punto de aprobar la prueba digital de impresión #2. ¿Estás seguro?</p>
                                                        <button 
                                                        onClick={() => {
                                                            setSelectedOrderId('')
                                                            updateApprovalStatusAndSendEmail(order, 'approval2')
                                                            setOrders((prevOrders) => 
                                                            prevOrders.map((prevOrder) => 
                                                            prevOrder.id === order.id
                                                            ? { ...prevOrder, isPreviewAccepted2: true }
                                                            : prevOrder))
                                                            aproveSecond.closeModal()
                                                        }}
                                                        className='text-center bg-gray-200 hover:bg-gray-300 active:bg-gray-400 
                                                        px-3 py-1 text-sm text-gray-900 active:text-white transition duration-200 ease-in-out'>
                                                            aprobar prueba #2
                                                        </button>
                                                    </div>
                                                </Modal>
                                            
                                            </>
                                        )}

                                    </div>                                                       
                                </td>
                            </tr>
                        ))}


                        <tr>{orders.map((order, index) => (
                            <td>
                                {order.data.total}
                            </td>
                        ))}</tr>

                    </tbody>

                </table>
            </div>
            
            {/* MOBILE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                
                {orders.map((order, index) => (
                    <>
                    <div className='bg-white shadow rounded-lg p-4 space-y-3'>
                    <div className="flex flex-col items-start text-sm">
                    
                        <p>
                        {order.data.timestamp 
                        && order.data.timestamp._methodName === 'serverTimestamp' && (
                            new Date().toLocaleDateString('es-Mx', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                            })
                        )}
                        </p>
                        <p>Nombre: {username}</p>
                        <p>Email: {email} </p>
                        <br />
                        <p>Orden Nro.: {order.id}</p>
                        <p>Producto: {order.data.product}</p>
                        <p>Cantidad: {order.data.quantity}</p>
                        <p>Corte: {order.data.corte}</p>
                        <p>Precio: ${order.data.price} </p>
                        


                 </div>

                 <div className='flex items-center justify-between space-x-3'>

                    {/* DISPLAY PREVIEW */}
                    <div key={order.id} className='bg-white h-24 w-24 flex items-center justify-center'>
                        <label htmlFor={`fileInput-${index}`} className=''>       
                            <img 
                                src={order.data.preview} // Use a default image if preview is not available
                                alt={order.id}
                                className='w-24 h-24' 
                                onClick={() => setSelectedOrderImage(order.data.preview)} />
                        </label>


                    </div>


                    <div className='flex flex-col items-center justify-center space-y-3'>
                        
                        
                        {/* MODAL PREVIEW BUTTON */}
                        <button 
                        onClick={() => {
                            setSelectedOrderImage(order.data.preview)
                            imageModal.openModal()
                        }}
                        className='bg-secondary-blueLight hover:bg-sky-300 active:bg-sky-400 
                        text-xs active:text-white px-4 py-2 transition duration-200 ease-in-out'>
                            Revisar prueba
                        </button>

                        {/* ASK FOR CHANGES BUTTON */}
                        <button 
                        onClick={() => {
                            setSelectedOrderId(order.id)
                            changesModal.openModal()
                        }}
                        className='bg-secondary-blueLight hover:bg-sky-300 active:bg-sky-400 
                        text-xs active:text-white px-4 py-2 transition duration-200 ease-in-out'>
                            Pedir cambios
                        </button>


                        {/* MODAL PREVIEW */}
                        <Modal
                        isOpen={imageModal.isOpen}
                        onClose={imageModal.closeModal}
                        >
                            <img src={selectedOrderImage} alt="Preview"
                            className='h-96 rounded'/>
                        
                        </Modal>

                        {/* ASK FOR CHANGES MODAL */}
                        {selectedOrderId === order.id && (
                            <>
                                {/* DISPLAY MESSAGES */}
                                <Modal
                                isOpen={changesModal.isOpen}
                                onClose={changesModal.closeModal}>

                                    
                                    <div className=''>
                                        {orders && orders.length > 0 && (
                                            <>
                                                    <div>
                                                        {order.changes.length > 0 && (
                                                            <ul className=' flex flex-col space-y-1'>
                                                            {order.changes.map((message, index) => (
                                                                <li key={index}
                                                                className='bg-secondary-blueLight text-gray-700 p-2 h-full rounded '>
                                                                    <p>{message}</p>
                                                                </li>
                                                            ))}
                                                        </ul>



                                                        )}
                                                        
                                                    </div>
                                            </>
                                        )}
                                    </div>
                                            
                                    {/* SEND MESSAGES FORM  */}
                                    <form onSubmit={handleSubmitChanges}>
                                        <div className='flex flex-col items-center justify-center space-y-6 mt-3'>

                                            <p className='text-md font-medium text-gray-900'>
                                                Introduce en el siguinte campo de texto los ajustes que se requieran hacer.
                                            </p>
                                            
                                            <textarea 
                                            rows='2'
                                            value={requestedChanges}
                                            onChange={(e => setRequestedChanges(e.target.value))}
                                            className={`${style[0].input}`}/>

                                            <button 
                                            type='submit'
                                            className='bg-gray-200 hover:bg-gray-300 active:bg-gray-400
                                            text-gray-900 active:text-white px-5 py-1'
                                            >Enviar</button>
                                            
                                        </div>
                                    </form>
                                </Modal>
        
        
                            </>
                        )}
                        

                    </div>
                 </div>

                 <div className='flex items-center justify-between'>

                        <div>
                            <p 
                            className='text-xs font-semibold'>{order.isPreviewAccepted1 || order.isPreviewAccepted2 === true ? 'Tu pedido está en proceso' : 'Pendiente por aprobar'}</p>
                            
                           
                            <p 
                            onClick={modalTerminos.openModal}
                            className='text-xs underline cursor-pointer whitespace-nowrap'>
                                Leer nuestras condiciones <br />
                                antes de aprobar
                            </p>
                            
                            <Modal
                            isOpen={modalTerminos.isOpen}
                            onClose={modalTerminos.closeModal}>
                                <TermsAndConditions/>
                            </Modal>
                            
                        </div>

                                        
                        <div className='flex flex-col items-center justify-center space-y-3'>         
                                        
                                        <button 
                                        disabled={order.isPreviewAccepted1 || order.isPreviewAccepted2 === true}
                                        onClick={() => {
                                            setSelectedOrderId(order.id)
                                            
                                            aproveFirst.openModal()
                                        }}
                                        className={`bg-${order.isPreviewAccepted1 ? 'green-500 text-white' : 'secondary-blueLight hover:bg-sky-300 active:bg-sky-400' } 
                                        text-xs active:text-white px-4 py-1 transition duration-200 ease-in-out rounded`}>
                                        {order.isPreviewAccepted1 ? 'Prueba #1 aprobada' : 'Aprobar prueba #1' }</button>
                                        
                                        
                                        <button
                                        disabled={order.isPreviewAccepted1 || order.isPreviewAccepted2 === true}
                                        onClick={() => {
                                            setSelectedOrderId(order.id)
                                            aproveSecond.openModal()
                                        }}
                                        className={`bg-${order.isPreviewAccepted2 ? 'green-500 text-white' : 'secondary-blueLight hover:bg-sky-300 active:bg-sky-400'} 
                                        text-xs active:text-white px-4 py-1 transition duration-200 ease-in-out rounded`}>
                                        {order.isPreviewAccepted2 ? 'Prueba #2 aprobada' : 'Aprobar prueba #2' }</button>

                                        {selectedOrderId === order.id && ( 
                                            <>
                                                <Modal
                                                isOpen={aproveFirst.isOpen}
                                                onClose={aproveFirst.closeModal}>
                                                    <div className='flex flex-col items-center justify-center'>
                                                        <p className='text-sm mb-3'>Estás a punto de aprobar la prueba digital de impresión #1. ¿Estás seguro?</p>
                                                        <button
                                                        onClick={() => {
                                                            setSelectedOrderId('')
                                                            updateApprovalStatusAndSendEmail(order, 'approval1')
                                                            setOrders((prevOrders) => 
                                                            prevOrders.map((prevOrder) => 
                                                            prevOrder.id === order.id
                                                            ? { ...prevOrder, isPreviewAccepted1: true }
                                                            : prevOrder))
                                                            aproveFirst.closeModal()
                                                        }} 
                                                        className='text-center bg-gray-200 hover:bg-gray-300 active:bg-gray-400 
                                                        px-3 py-1 text-sm text-gray-900 active:text-white transition duration-200 ease-in-out'>
                                                            aprobar prueba #1
                                                        </button>
                                                    </div>
                                                </Modal>

                                                <Modal
                                                isOpen={aproveSecond.isOpen}
                                                onClose={aproveSecond.closeModal}>
                                                    <div className='flex flex-col items-center justify-center'>
                                                        <p className='text-sm mb-3'>Estás a punto de aprobar la prueba digital de impresión #2. ¿Estás seguro?</p>
                                                        <button 
                                                        onClick={() => {
                                                            setSelectedOrderId('')
                                                            updateApprovalStatusAndSendEmail(order, 'approval2')
                                                            setOrders((prevOrders) => 
                                                            prevOrders.map((prevOrder) => 
                                                            prevOrder.id === order.id
                                                            ? { ...prevOrder, isPreviewAccepted2: true }
                                                            : prevOrder))
                                                            aproveSecond.closeModal()
                                                        }}
                                                        className='text-center bg-gray-200 hover:bg-gray-300 active:bg-gray-400 
                                                        px-3 py-1 text-sm text-gray-900 active:text-white transition duration-200 ease-in-out'>
                                                            aprobar prueba #2
                                                        </button>
                                                    </div>
                                                </Modal>
                                            
                                            </>
                                        )}
                                        </div>

                                    </div> 


                                    </div>
                 </>

                
                
                 

                 
                 
                
                 
                ))}

                

            </div>

        </div>

    </div>
  )
}
