import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import useModal from '../hooks/useModal'
import { collection, doc, getDoc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Modal from '../components/Modal'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
    const navigate = useNavigate()

    // display user's name and email
    const auth = getAuth()

    // LOGOUT
    function handleLogout() {
        auth.signOut()
        navigate('/')
    }

    const [ formData, setFormData ] = useState({
        name: auth.currentUser.uid,
        email: auth.currentUser.email,
    })

    const { name, email } = formData

     // modal hook
     const changesModal = useModal()
     const aproveFirst = useModal()
     const aproveSecond = useModal()
     const myProfile = useModal()
     
     const imageModal = useModal()
     const showImage = useModal()


     // FETCH NAME EMAIL TIMESTAMP
     async function fetchOrdersWithUserData(orders) {
        const ordersWithUserData = []

        for(const order of orders) {
            try {
                const userDocRef = doc(db, 'users', order.data.userRef)
                const userDocSnap = await getDoc(userDocRef)

                if(userDocSnap.exists()) {
                    const userData = userDocSnap.data()
                    // Add user data to the order
                    order.userData = userData
                }

                ordersWithUserData.push(order)

            } catch (error) {
                console.error(`Error fetching user data ${error}`)
            }
        }
        return ordersWithUserData
     }


     // FETCH ALL ORDERS
     const [ selectedOrderImage, setSelectedOrderImage ] = useState('/images/identidad/isotipo.png')
     const [ orders, setOrders ] = useState([])
     const [ selectedOrderId, setSelectedOrderId ] = useState(null)

     useEffect(() => {
        async function fetchAllOrders() {
            const ordersRef = collection(db, 'orders')
            const q = query(ordersRef, orderBy('timestamp', 'desc'))
            const querySnap = await getDocs(q)
            let orders = []

            querySnap.forEach((doc) => {
                const data = doc.data()
                const isPreviewAccepted1 = data.approval1
                const isPreviewAccepted2 = data.approval2 

                orders.push({
                    id: doc.id,
                    data: data,
                    isPreviewAccepted1: isPreviewAccepted1,
                    isPreviewAccepted2: isPreviewAccepted2,
                })
            })

            const ordersWithUserData = await fetchOrdersWithUserData(orders)
            setOrders(ordersWithUserData)

            // Set filteredOrders to all orders initially
            setFilteredOrders(ordersWithUserData)
        }
        fetchAllOrders()
     }, [])


     // IMAGE PREVIEW
     async function handleImageUpload(e, orderIndex){
        const imageFiles = e.target.files

        // Create a copy of the current orders array
        const updatedOrders = [...orders]

        for(let i = 0; i < imageFiles.length; i++) {
            const imageUrl = (URL.createObjectURL(imageFiles[i]))
            const orderIdToUpdate = updatedOrders[orderIndex].id

            // Call the function to upload image an update order's preview
            updateOrderPreview(orderIdToUpdate, imageFiles[i])

            // Update the image preview in the local state
            updatedOrders[orderIndex].data.preview = imageUrl
        }

        // Update the local state with the mofified orders
        setOrders(updatedOrders)

     }


     // SHOW UPLOADED IMAGES BY THE USER
     const [ showImageSrc, setShowImageSrc ] = useState('')

     const handleShowImage = (stickerUrl) => {
        setShowImageSrc(stickerUrl)
        showImage.openModal()
     }

     // SHOW ASKED CHANGES BY THE USER
     const fetchChangesArrayForOrder = async (orderId) => {
        try {
            const orderRef = doc(db, 'orders', orderId)
            const orderDoc = await getDoc(orderRef)

            if(orderDoc.exists()) {
                const orderData = orderDoc.data()
                const changesArray = orderData.changes || []
                return changesArray
            }

            return []
        } catch (error) {
            console.error(`Error fetching changes array for order ${error}`)
            return []
        }
     }

     const [ changessModal, setChangessModal ] = useState(false)
     const [ changesArray, setChangesArray ] = useState([])

     // Function to open the modal and fetch changes array for a specific order
     const handleOpenModalChanges = async (orderId) => {
        const fetchedChanges = await fetchChangesArrayForOrder(orderId)
        setChangesArray(fetchedChanges)
        setChangessModal(true)
        changesModal.openModal()
     }

     

     

     

     // FUNCTION TO UPLOAD IMAGE, UPDATE ORDER'S PREVIEW AND SEND EMAIL NOTIFICATION
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

            // Fetch the user's email associated with this order
            const orderData = orders.find(order => order.id === orderId)

            if(orderData) {
                const userDocRef = doc(db, 'users', orderData.data.userRef)
                const userDocSnap = await getDoc(userDocRef)

                if(userDocSnap.exists()) {
                    const userData = userDocSnap.data()
                    const userEmail = userData.email
                    console.log('userEmail', userEmail)

                    // If the user's email is available, send an email notification to the user
                    if(userEmail) {
                        await axios.get(`https://kwali2-server.vercel.app/send-preview-emails?email=${userEmail}`)
                    }
                }
            }

            console.log('Image uploaded, order preview updated and email sent successfully')
        } catch (error) {
            console.error('Error uploading images', error)
        }
     }


     // DEFINE A FUNCTION TO FILTER ORDERS BASES ON SEARCH CRITERIA
     const filterOrders = (searchCriteria) => {
        
        if(!searchCriteria) {
             // If the search input is empty, return all orders without sorting
        return orders
        }

        const searchCriteriaLowerCase = searchCriteria.toLowerCase(); // Convert searchCriteria to lowercase

        const filteredOrders = orders.filter((order) => {
            const { id, data, userData } = order
        

            // Define your filter conditions
            const nameMatches = userData.name.toLowerCase().includes(searchCriteria.toLowerCase())
            const emailMatches = userData.email.toLowerCase().includes(searchCriteria.toLowerCase())
            // const dateMatches = data.timestamp.toDate().toLocaleDateString().includes(searchCriteria)
            const productNameMatches = data.product.toLowerCase().includes(searchCriteria.toLowerCase())
            const approval1Matches = data.approval1 === searchCriteria
            const approval2Matches = data.approval2 === searchCriteria

            // Check if the order ID matches the search criteria
            const idMatches = id.toLowerCase().includes(searchCriteriaLowerCase)

            // Combine multiple filter conditions using logical operators
            return (
                idMatches || // Filter by orderId if provided
                nameMatches ||
                emailMatches ||
                productNameMatches ||
                approval1Matches ||
                approval2Matches
            )

        })

        return filteredOrders
     }

     // CREATE A STATE VARIABLE TO STORE THE SEARCH INPUT
     const [ searchInput, setSearchInput ] = useState('')
     const [ filteredOrders, setFilteredOrders ] = useState([])

     // Handle changes in the search input
     const handleSearchChange = (e) => {
        const inputValue = e.target.value
        setSearchInput(inputValue)

         // Apply the filter when the search input changes
         const filteredOrders = filterOrders(inputValue)
         setFilteredOrders(filteredOrders)
     }

     useEffect(() => {
        // Apply the filter when the search input changes
        const newFilteredOrders = filterOrders(searchInput)
        setFilteredOrders(newFilteredOrders)
     }, [searchInput])


     


  return (
    <div>
        <p
                onClick={handleLogout}
                className='px-7 py-2 text-blue-600 hover:text-blue-800 transiton duration-300 cursor-pointer'>
                    Cerrar Sesión
        </p>

      {/* FILTER */}
      <div className='px-5 md:px-60 mt-4'>
        <input 
        type="text"
        placeholder='Filtrar por: nombre, email, nro de orden, producto o fecha'
        value={searchInput}
        onChange={handleSearchChange}
        className='w-full border-gray-300' />
        
        <ul>
            {filteredOrders.map((order) => (
                <>
                    
                </>
            ))}
        </ul>
      </div>

      <p className='text-center font-semibold text-2xl mt-4'>Historial de pruebas de impresión</p>         

      {/* TABLE */}
      <div className="h-full p-5 ">

     

        <div className="overflow-auto rounded-lg shadow hidden md:block">

            <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
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
                
                <tbody className="divide-y divide-gray-100">

                    {filteredOrders.map((order, index) => (
                       
                            <tr className="bg-white">
    
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    <div className='flex items-center space-x-3'>
                                       <img
                                        className='h-24 w-24' 
                                        src={order.data.stickerUrl} alt={order.data.producto} />

                                        <div className='flex flex-col space-y-3'>
                                            <button 
                                            onClick={() => {handleShowImage(order.data.stickerUrl)}}
                                            className='bg-secondary-blueLight hover:bg-sky-300 active:bg-sky-400 
                                            text-xs active:text-white font-medium px-4 py-2 transition duration-200 ease-in-out'>
                                                Revisar Imagen
                                            </button>
    
                                               
                                            <a 
                                            href={order.data.stickerUrl}
                                            target='_blank'
                                            className='bg-secondary-blueLight hover:bg-sky-300 active:bg-sky-400 
                                            text-xs active:text-white font-medium px-4 py-2 transition duration-200 ease-in-out'>
                                                Descargar Imagen
                                            </a>
                                                
    
                                            <Modal
                                            isOpen={showImage.isOpen}
                                            onClose={showImage.closeModal}>
                                                <img src={showImageSrc} alt='Imagen Cliente' className='h-96 rounded' />
                                            </Modal>
                                        </div>

                                    </div>

                                </td>
    
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
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
                                    {order.userData && (
                                        <div>
                                            <p>Nombre: {order.userData.name}</p>
                                            <p>Email: {order.userData.email} </p>
                                            <br />
                                            <p>Orden nro.: {order.id}</p>
                                            <p>Producto: {order.data.product}</p>
                                            <p>Cantidad: {order.data.quantity}</p>
                                            <p>Corte: {order.data.corte}</p>
                                            <p>Precio: ${order.data.price} </p>
                                        </div>
                                    )}
                                </td>
    
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                    {/* DISPLAY PREVIEW */}
                                    <div className='flex items-center space-x-3'>
                                        <div  key={order.id}  className='bg-white h-24 w-24 flex items-center justify-center'>
                                            <label htmlFor={`fileInput-${index}`} className='cursor-pointer'>
                                                <input 
                                                id={`fileInput-${index}`}
                                                type="file"
                                                accept='.jpg,.png,.jpeg'
                                                onChange={(e) => handleImageUpload(e, index)}
                                                required
                                                style={{display: "none"}} />

                                                <img 
                                                src={order.data.preview} 
                                                alt={order.id} 
                                                className='h-24 w-24'
                                                onClick={() => setSelectedOrderImage(order.data.preview)}/>

                                            </label>
                                            
                                        </div>

                                        <div className='flex flex-col items-center justify-center space-y-3'>
                                            
                                            {/* PREVIEW AND CHANGES BUTTON */}
                                            <button 
                                            onClick={() => {
                                                setSelectedOrderImage(order.data.preview)
                                                imageModal.openModal()
                                            }}
                                            className='bg-secondary-blueLight hover:bg-sky-300 active:bg-sky-400 
                                            text-xs active:text-white font-medium px-4 py-2 transition duration-200 ease-in-out'>
                                                Revisar prueba
                                            </button>

                                            <button
                                            key={index} 
                                            onClick={() => handleOpenModalChanges(order.id)}
                                            className='bg-secondary-blueLight hover:bg-sky-300 active:bg-sky-400 
                                            text-xs active:text-white font-medium px-4 py-2 transition duration-200 ease-in-out'>
                                                Pedir cambios
                                            </button>

                                            {/* PREVIEW AND CHANGES MODAL */}
                                            <Modal
                                            isOpen={imageModal.isOpen}
                                            onClose={imageModal.closeModal}
                                            >

                                                <img src={selectedOrderImage} alt='Preview'
                                                className='h-96 rounded' />

                                            </Modal>
     
                                            <Modal
                                            isOpen={changesModal.isOpen}
                                            onClose={changesModal.closeModal}>
                                              
                                                {changesArray.map((change, index) => (
                                                    <p key={index}>{change}</p>
                                                ))}
                                            
                                                
                                            </Modal>


                                        </div>
                                    </div>
                                </td>
    
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                <div className='flex flex-col items-start justify-center space-y-3'>
                                        <p className='text-xs font-semibold'>Pendiente por aprobar</p>
                                        <p className='text-xs underline'>Leer nuestras condiciones <br />antes de aprobar</p>
                                        
                                        
                                        <button 
                                        disabled
                                        onClick={() => {
                                            setSelectedOrderId(order.id)
                                            
                                            aproveFirst.openModal()
                                        }}
                                        className={`bg-${order.isPreviewAccepted1 ? 'green-500 text-white' : 'secondary-blueLight hover:bg-sky-300 active:bg-sky-400' } 
                                        text-xs active:text-white font-medium px-4 py-1 transition duration-200 ease-in-out rounded`}>
                                        {order.isPreviewAccepted1 ? 'Prueba #1 aprobada' : 'Aprobar prueba #1' }</button>
                                        
                                        
                                        <button
                                        disabled
                                        onClick={() => {
                                            setSelectedOrderId(order.id)
                                            aproveSecond.openModal()
                                        }}
                                        className={`bg-${order.isPreviewAccepted2 ? 'green-500 text-white' : 'secondary-blueLight hover:bg-sky-300 active:bg-sky-400'} 
                                        text-xs active:text-white font-medium px-4 py-1 transition duration-200 ease-in-out rounded`}>
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
                                                            setOrders((prevOrders) => 
                                                            prevOrders.map((prevOrder) => 
                                                            prevOrder.id === order.id
                                                            ? { ...prevOrder, isPreviewAccepted1: true }
                                                            : prevOrder))
                                                            aproveFirst.closeModal()
                                                        }} 
                                                        className='text-center bg-gray-200 hover:bg-gray-300 active:bg-gray-400 
                                                        px-3 py-1 text-sm text-gray-900 active:text-white font-medium transition duration-200 ease-in-out'>
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
                                                            setOrders((prevOrders) => 
                                                            prevOrders.map((prevOrder) => 
                                                            prevOrder.id === order.id
                                                            ? { ...prevOrder, isPreviewAccepted2: true }
                                                            : prevOrder))
                                                            aproveSecond.closeModal()
                                                        }}
                                                        className='text-center bg-gray-200 hover:bg-gray-300 active:bg-gray-400 
                                                        px-3 py-1 text-sm text-gray-900 active:text-white font-medium transition duration-200 ease-in-out'>
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


            {filteredOrders.map((order, index) => (
                <div className="p-4 bg-white space-y-3 rounded-lg shadow whitespace-nowrap">
                    {order.userData && (
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
                                            <p>Nombre: {order.userData.name}</p>
                                            <p>Email: {order.userData.email} </p>
                                            <br />
                                            <p>Orden Nro.: {order.id}</p>
                                            <p>Producto: {order.data.product}</p>
                                            <p>Cantidad: {order.data.quantity}</p>
                                            <p>Corte: {order.data.corte}</p>
                                            <p>Precio: ${order.data.price} </p>
                            </div>
                        )}
                
                        <div className='flex items-center justify-between'>
                                <img
                                className='h-24 w-24' 
                                src={order.data.stickerUrl} alt={order.data.product} />
                                 <div className='flex flex-col space-y-3'>
                                            <button 
                                            onClick={() => {handleShowImage(order.data.stickerUrl)}}
                                            className='bg-secondary-blueLight hover:bg-sky-300 active:bg-sky-400 
                                            text-xs active:text-white px-4 py-2 transition duration-200 ease-in-out'>
                                                Revisar Imagen
                                            </button>

                                           
                                            <a 
                                            href={order.data.stickerUrl}
                                            target='_blank'
                                           
                                            className='bg-secondary-blueLight hover:bg-sky-300 active:bg-sky-400 
                                            text-xs active:text-white px-4 py-2 transition duration-200 ease-in-out'>
                                                Descargar Imagen
                                            </a>
                                            

                                            <Modal
                                            isOpen={showImage.isOpen}
                                            onClose={showImage.closeModal}>
                                                <img src={showImageSrc} alt='Imagen Cliente' className='h-96 rounded' />
                                            </Modal>
                                        </div>
                        </div>
                        <div>
                            {/* DISPLAY PREVIEW */}
                                    <div className='flex items-center justify-between'>
                                        <div  key={order.id}  className='bg-white h-24 w-24 flex items-center justify-center'>
                                            <label htmlFor={`fileInput-${index}`} className='cursor-pointer'>
                                                <input 
                                                id={`fileInput-${index}`}
                                                type="file"
                                                accept='.jpg,.png,.jpeg'
                                                onChange={(e) => handleImageUpload(e, index)}
                                                required
                                                style={{display: "none"}} />

                                                <img 
                                                src={order.data.preview} 
                                                alt={order.id} 
                                                className='h-24 w-24'
                                                onClick={() => setSelectedOrderImage(order.data.preview)}/>

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
                                            <Modal
                                            isOpen={imageModal.isOpen}
                                            onClose={imageModal.closeModal}
                                            >

                                                <img src={selectedOrderImage} alt='Preview'
                                                className='h-96 rounded' />

                                            </Modal>
                                            
                                            {/* CHANGES BUTTON AND MODAL */}
                                            <button
                                            key={index} 
                                            onClick={() => handleOpenModalChanges(order.id)}
                                            className='bg-secondary-blueLight hover:bg-sky-300 active:bg-sky-400 
                                            text-xs active:text-white px-4 py-2 transition duration-200 ease-in-out'>
                                                Pedir cambios
                                            </button>

                                           

                                            <Modal
                                            isOpen={changesModal.isOpen}
                                            onClose={changesModal.closeModal}>
                                              
                                                {changesArray.map((change, index) => (
                                                    <p key={index}>{change}fdfdfdf</p>
                                                ))}
                                            
                                                
                                            </Modal>

                                            
                                            

                                            
                                            

                                        </div>
                                    </div>
                        </div>
                        <div>
                           <div className='flex items-center justify-between'>

                                        <div>     
                                            <p className='text-xs font-semibold'>Pendiente por aprobar</p>
                                            <p className='text-xs underline'>Leer nuestras condiciones <br />antes de aprobar</p>
                                        </div>
                                        
                                        <div className='flex flex-col items-center justify-center space-y-3'>
                                        <button 
                                        disabled
                                        onClick={() => {
                                            setSelectedOrderId(order.id)
                                            
                                            aproveFirst.openModal()
                                        }}
                                        className={`bg-${order.isPreviewAccepted1 ? 'green-500 text-white' : 'secondary-blueLight hover:bg-sky-300 active:bg-sky-400' } 
                                        text-xs active:text-white px-4 py-1 transition duration-200 ease-in-out rounded`}>
                                        {order.isPreviewAccepted1 ? 'Prueba #1 aprobada' : 'Aprobar prueba #1' }</button>
                                        
                                        
                                        <button
                                        disabled
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
            </div> 
            ))}
                

        </div>

      </div>
    </div>
  )
}
