import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../TuPutaHermanContext'
import Modal from '../components/Modal'
import useModal from '../hooks/useModal'
import { style } from '../components/Styles'
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase'
import { toast } from 'react-toastify'
import { useAuthStatus } from '../hooks/useAuthStatus'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

export default function ProfileGood() {

    //isAdmin fetch all orders
    const { loggedIn, isAdmin } = useAuthStatus()

    // display user's name and email
    const auth = getAuth()

    const [ formData, setFormData ] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })

    const { name, email } = formData

    const { cartItems } = useCart()
    const navigate = useNavigate()

    // const auth = getAuth() allready declared

    function handleLogout() {
        auth.signOut()
        navigate("/")
    }

    // add new address & payment method
    const [ addressCount, setAddressCount ] = useState(0)
    const [ paymentCount, setPaymentCount ] = useState(0)

    const handleAddressCount = () => {
        setAddressCount(addressCount + 1)
    }

    const handlePaymentCount = () => {
        setPaymentCount(paymentCount + 1)
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
      
      

   

  return (
    <>
        <section className='max-w-6xl mx-auto flex flex-col justify-center items-center'>
            <h1 className='text-center text-3xl font-bold mt-6 mb-6'>Mis Pedidos</h1>

            <div className='flex items-center md:mr-[660px] justify-center space-x-10'>
                <img src="/images/iconos/icono-user.png" alt=""
                className='h-40' />
                <div className='flex flex-col space-y-4'> 
                    <h1 className='text-2xl font-semibold text-gray-900 '><span className='font-medium text-secondary-blueDark'>{name}</span></h1>
                    <p className='text-xl font-light text-gray-900' ><span className='font-medium text-secondary-blueDark'>{email}</span></p>


                    <button
                    onClick={myProfile.openModal} 
                    className='bg-gray-300 hover:bg-gray-400 active:bg-gray-500 
                    transition duration-200 ease-in-out rounded w-32 h-8 
                    tex-md text-gray-900 active:text-white'>Mis datos</button>

                    <Modal
                    isOpen={myProfile.isOpen}
                    onClose={myProfile.closeModal}>
                        <div className='flex flex-col space-y-4 bg-white md:w-[800px] md:h-[600px] px-12 py-12 '>
                            <div>
                                <h1 className='mb-3 text-2xl font-semibold text-gray-900'>Datos generales</h1>
                                <p className='font-medium'>Nombre del usario: <span className='font-medium text-secondary-blueDark'>{name}</span>  </p>
                                <p className='font-medium'>Email: <span className='font-medium text-secondary-blueDark'>{email}</span></p>
                                <p className='font-medium'>Edad: </p>
                                <p className='font-medium'>País: </p>
                            </div>
                            <div>
                                <h1 className='mt-3 mb-3 text-2xl font-semibold text-gray-900'>Datos de compra</h1>
                                <div className='flex flex-wrap md:justify-left md:space-x-6'>

                                    <div className='flex flex-col'>
                                        <div className='flex items-center'>
                                            <p className='font-medium mr-2'>Mis direcciones de envío</p> 
                                            <div 
                                            onClick={handleAddressCount}
                                            className='flex flex-col items-center justify-center cursor-pointer 
                                            bg-gray-200 rounded-full w-8 h-8 border-b-2 border-gray-400'>
                                                <p className='text-2xl'>+</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col space-y-6 mt-3'>
                                            {Array.from({ length: addressCount}).map((_, index) => (
                                                <>
                                                    <input 
                                                    key={index}
                                                    className='bg-gray-200 h-10 w-full border-transparent
                                                    focus:outline-none focus:border-transparent focus:ring-transparent'/>    
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className='flex flex-col mt-6 md:mt-0'>
                                        <div className='flex items-center'>
                                            <p className='font-medium mr-2'>Métodos de pago</p> 
                                            <div 
                                            onClick={handlePaymentCount}
                                            className='flex flex-col items-center justify-center cursor-pointer
                                            bg-gray-200 rounded-full w-8 h-8 border-b-2 border-gray-400'>
                                                <p className='text-2xl'>+</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col space-y-6 mt-3'>
                                            {Array.from({ length: paymentCount}).map((_, index) => (
                                                <>
                                                    <input
                                                    key={index}
                                                    className='bg-gray-200 h-10 w-full border-transparent
                                                    focus:outline-none focus:border-transparent focus:ring-transparent ' />
                                                </>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        
                    </Modal>
                </div>
            </div>
            
            {/* w-full md:w-[50%] mt-6 px-3 */}
            <div className='flex flex-col space-y-6'>
                
                <p className='text-center font-semibold text-2xl mt-12'>Historial de pruebas de impresión</p>

                <div className='bg-gray-200 md:h-full md:min-h-[250px] md:w-[1100px] rounded-xl'>
                    <div className='py-2 flex items-center justify-around border-b border-gray-900'>
                        <p className='border-r border-gray-900'>Producto</p>
                        <p>Compra realizada el</p>
                        <p>Prueba de impresión</p>
                        <p>Estado</p>
                    </div>


                  
                        {orders.map((order, index) => (
                            <>
                                <div className='flex items-center justify-around mt-3 ' key={order.id}>
                                    <div className=' flex flex-col items-center justify-center'>
                                     
                                                
                                            
                                       
                                        <img src={order.data.imgSrc} alt={order.data.product} className='h-24 w-24' />
                                        <p key={order.id} className='text-sm font-medium'>{order.data.product} x{order.data.quantity}</p>
                                    </div>

                                    <div className='flex flex-col ml-16 text-xs'>
                                        {/* <p>20 de agosto de 2023</p> */}
                                        <p key={order.id}>
                                        {order.timestamp ? (
                                        new Date(order.timestamp).toLocaleString('es-MX', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric',
                                            timeZoneName: 'short',
                                        })
                                    ) : (
                                        'Timestamp Not Available'
                                    )}
                                                
                                           </p>
                                        <p>13:45</p>
                                        <p>n.123456789</p>
                                    </div>
                                    

                                    
                                    <div className='flex space-x-3'>

                                        {/* DISPLAY PREVIEW */}
                                        <div key={order.id} className='bg-white h-[120px] w-[120px] flex items-center justify-center'>
                                            <label htmlFor={`fileInput-${index}`} className=''>
                                                {/* <input 
                                                    id={`fileInput-${index}`}
                                                    type="file"
                                                    accept='.jpg,.png,.jpeg'
                                                    onChange={(e) => handleImageUpload(e, index)}
                                                    required
                                                    style={{ display: "none" }} /> */}
                                                    
                                                <img 
                                                    src={order.data.preview} // Use a default image if preview is not available
                                                    alt={order.id}
                                                    className='w-24 h-24' 
                                                    onClick={() => setSelectedOrderImage(order.data.preview)} />
                                            </label>

                                      
                                        </div>

                                        {/* <button
                                            className='bg-secondary-blueLight px-3 py-2 rounded text-white'
                                           
                                            >UP</button> */}

                                        <div className='flex flex-col items-center justify-center space-y-3'>
                                            <p className='text-xs '>enviada el 21 de agosto 2023, 09:30</p>

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

                                    <div className='flex flex-col items-center justify-center space-y-3'>
                                        <p className='text-xs font-semibold'>Pendiente por aprobar</p>
                                        <p className='text-xs underline'>Leer nuestras condiciones <br />antes de aprobar</p>
                                        
                                        
                                        <button 
                                        disabled={order.isPreviewAccepted1}
                                        onClick={() => {
                                            setSelectedOrderId(order.id)
                                            
                                            aproveFirst.openModal()
                                        }}
                                        className={`bg-${order.isPreviewAccepted1 ? 'green-500 text-white' : 'secondary-blueLight hover:bg-sky-300 active:bg-sky-400' } 
                                        text-xs active:text-white px-4 py-1 transition duration-200 ease-in-out rounded`}>
                                        {order.isPreviewAccepted1 ? 'Prueba #1 aprobada' : 'Aprobar prueba #1' }</button>
                                        
                                        
                                        <button
                                        disabled={order.isPreviewAccepted2 || order.isPreviewAccepted1 === false}
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
                            
                            </>
                        ))}
                    
                </div>

                <div className='flex flex-col items-center space-y-6'>
                
                <p className='text-center font-semibold text-2xl mt-12'>Historial de compras</p>
                    <div className='bg-gray-200 md:h-full md:min-h-[250px] md:w-[900px] rounded-xl'>
                            <div className='flex justify-around mt-3 border-b border-gray-900'>
                                <p>Compra</p>
                                <p>Total</p>
                                <p></p>
                            </div>
                            
                            {orders.map((item, index) => (
                                <>
                                <div className='flex items-center justify-around mt-8'>
                                    <div key={index} className='flex items-center space-x-6  '>
                                    <img src={item.imgSrc} alt="" className='h-24 w-24' />
                                    <div className='text-xs'>
                                        <p className='font-semibold'>{item.product}</p>
                                        <p className='font-semibold'>Cant. 1</p>
                                        <p>Fecha: 20 de agosto 2023. Hora: 13:45 </p>
                                        <p>Número de orden: 0123456789</p>
                                    </div>
                                    </div>

                                    <div className='mr-24'>
                                        <p className='text-xs'>${item.price}mxn</p>
                                    </div>

                                    <button className='bg-gray-300 hover:bg-gray-400 active:bg-gray-500
                                    text-sm text-gray-900 active:text-white px-5 py-1'>Repetir pedido</button>
                                </div>
                                </>
                            ))}
                            
                    </div>
                </div>
              
                
                <p
                onClick={handleLogout}
                className='text-blue-600 hover:text-blue-800 transiton duration-200 ease-in-out cursor-pointer'>
                    Cerrar Sesión
                </p>
            </div>





        </section>
    </>
  )
}
