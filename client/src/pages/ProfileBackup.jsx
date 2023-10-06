import React, { useEffect, useState } from 'react'
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

export default function Profile() {
    const navigate = useNavigate()

    // display user's name and email
    const auth = getAuth()

    const [ formData, setFormData ] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })

    const { name, email } = formData

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


    // FETCH USER ORDERS
    const [ selectedOrderImage, setSelectedOrderImage ] = useState('/image/identidad/isotipo.png')
    const [ orders, setOrders ] = useState([])
    const [ selectedOrderId, setSelectedOrderId ] = useState(null)
    
    useEffect(() => {
        async function fetchUserOrders() {
            const ordersRef = collection(db, "orders")
            const q = query(ordersRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"))
            const querySnap = await getDocs(q)
            let orders = []
            querySnap.forEach((doc) => {
                const data = doc.data()
                const isPreviewAccepted1 = data.approval1
                const isPreviewAccepted2 = data.approval2
                const changes = data.changes || []

                orders.push({
                    id: doc.id,
                    data: data,
                    isPreviewAccepted1: isPreviewAccepted1,
                    isPreviewAccepted2: isPreviewAccepted2,
                    changes: changes,
                })
                // console.log(changes)
            })
            setOrders(orders)
        }
        fetchUserOrders()
    }, [auth.currentUser.uid])

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
                        await axios.get(`http://localhost:8080/send-approval-emails?email=${userEmail}`)
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
                    await axios.get(`http://localhost:8080/send-change-emails?email=${userEmail}&message=${requestedChanges}`) 
                }
            }

        }
    }

  return (
    <div>
       <p
                onClick={handleLogout}
                className='px-2 md:px-7 py-2 text-blue-600 hover:text-blue-800 transiton duration-300 cursor-pointer'>
                    Cerrar Sesión
        </p>

        <p className='text-center font-semibold text-2xl mt-4'>Historial de pruebas de impresión</p> 

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
                                        <p key={order.id} className='text-sm font-medium'>{order.data.product} x{order.data.quantity}</p>
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
                                                <p>Nombre: {name}</p>
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
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    
                                    <div className='flex flex-col items-start justify-center space-y-3'>

                                        <p className='text-xs font-semibold'>{order.isPreviewAccepted1 || order.isPreviewAccepted2 === true ? 'Tu pedido está en proceso' : 'Pendiente por aprobar'}</p>
                                        <p className='text-xs underline'>Leer nuestras condiciones <br />antes de aprobar</p>
                                        
                                        
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

                    </tbody>

                </table>
            </div>
            
            {/* MOBILE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                
                {orders.map((order, index) => (
                    <>
                    <div className='bg-white shadow rounded-lg p-4 space-y-3 whitespace-nowrap'>
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
                        <p>Nombre: {name}</p>
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
                            <p className='text-xs font-semibold'>{order.isPreviewAccepted1 || order.isPreviewAccepted2 === true ? 'Tu pedido está en proceso' : 'Pendiente por aprobar'}</p>
                            <p className='text-xs underline'>Leer nuestras condiciones <br />antes de aprobar</p>
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
