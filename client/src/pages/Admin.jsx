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
        username: auth.currentUser.uid,
        email: auth.currentUser.email,
    })

    const { username, email } = formData

     // modal hook
     const changesModal = useModal()
     const aproveFirst = useModal()
     const aproveSecond = useModal()
     const myProfile = useModal()
     
     const imageModal = useModal()
     const showImage = useModal()
     const modalDatos = useModal()


     // FETCH NAME EMAIL CREATEDAT
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

                    const formattedDate = new Date(order.data.createdAt);
                    const options = {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    }

                    order.data.formattedCreatedAt = formattedDate.toLocaleDateString('es-MX', options);

                    
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
            const q = query(ordersRef, )
            const querySnap = await getDocs(q)
            let orders = []

            querySnap.forEach((doc) => {
                const data = doc.data()
                const isPreviewAccepted1 = data.approval1
                const isPreviewAccepted2 = data.approval2 
                const formattedCreatedAt = data.formattedCreatedAt

                orders.push({
                    id: doc.id,
                    data: data,
                    isPreviewAccepted1: isPreviewAccepted1,
                    isPreviewAccepted2: isPreviewAccepted2,
                    formattedCreatedAt: formattedCreatedAt,
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
            const productNameMatches = data.product.toLowerCase().includes(searchCriteria.toLowerCase())
            const approval1Matches = data.approval1 === searchCriteria
            const approval2Matches = data.approval2 === searchCriteria
            const formattedCreatedAtMatches = order.data.formattedCreatedAt.toLowerCase().includes(searchCriteriaLowerCase)

            // Check if the order ID matches the search criteria
            const idMatches = id.toLowerCase().includes(searchCriteriaLowerCase)

            // Combine multiple filter conditions using logical operators
            return (
                idMatches || // Filter by orderId if provided
                nameMatches ||
                emailMatches ||
                productNameMatches ||
                approval1Matches ||
                approval2Matches ||
                formattedCreatedAtMatches
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

     const handleChange = () => {
        
     }
 
     const handleSubmit = () => {
 
     }
     


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
                                    {order.data.formattedCreatedAt}
                                    {order.userData && (
                                        <div>
                                            <p>Nombre: {order.userData.name}</p>
                                            <p>Email: {order.userData.email} </p>
                                            <button 
                                            onClick={modalDatos.openModal}
                                            className='bg-gray-200 hover:bg-gray-300 active:bg-gray-400 active:text-white
                                            duration-300 px-4 py-0.5 mt-2 mb-2 text-sm font-medium'>Datos Cliente</button>
                                            <br />
                                            <p>Orden nro.: {order.id}</p>
                                            <p>Producto: {order.data.product}</p>
                                            <p>{order.data.quantity && (
                                                <>
                                                    Cantidad: {order.data.quantity}
                                                </>
                                            )}</p>
                                            <p>{order.data.longitud && (
                                                <>
                                                    Longitud: {order.data.longitud}
                                                </>
                                            )}</p>
                                            <p>{order.data.corte && (
                                                <>
                                                    Corte: {order.data.corte}
                                                </>
                                            )}</p>
                                            <p>{order.data.forma && (
                                                <>
                                                    Forma: {order.data.forma}
                                                </>
                                            )}</p>
                                            <p>{order.data.acabado && (
                                                <>
                                                    Acabado: {order.data.acabado}
                                                </>
                                            )}</p>
                                            <p>Precio: ${order.data.price} </p>
                                            <Modal
                                            onClose={modalDatos.closeModal}
                                            isOpen={modalDatos.isOpen}>
                                                <div className='flex items-center justify-start mt-6 mb-6 px-6 md:px-0 space-x-6'>
                                                    <img src="/images/iconos/icono-user.png" alt="" width={110} />
                                                    <div className='flex flex-col items-start justify-center'>
                                                        <p className='font-semibold'>{order.userData.name} </p>
                                                        <p className=''>{order.userData.email} </p>
                                                    </div>
                                                </div>
                  
                                            <div className='bg-gray-200 w-full flex flex-col items-center justify-center px-6 md:px-6 '>
                                                <h2 className='font-medium mt-3 mb-6'>Dirección Cliente</h2>

                                                <form>
                                                    <>
                                                    {orders.map((order, index) => (
                                                        
                                                    <>
                                                    <div className='flex items-center justify-between space-x-4 mb-6'>
                                                        <label htmlFor="">Nombre completo </label>
                                                        <input 
                                                        disabled
                                                        onChange={handleChange}
                                                        className='py-0.5 w-[370px] md:w-80'
                                                        name='fullName'
                                                        id='fullName'
                                                        value={order.data.fullName}
                                                        type="text" />
                                                    </div>
                                                    <div className='flex items-center justify-between space-x-4 mb-3'>
                                                        <div className='flex flex-col'>
                                                            <label htmlFor="">Dirección</label>
                                                            <p className='text-xs'>(calle, num. ext, colonia)</p>
                                                        </div>
                                                        <input 
                                                        disabled
                                                        onChange={handleChange}
                                                        className='py-0.5 w-[360px] md:w-80'
                                                        name='address'
                                                        id='address'
                                                        value={order.data.address}
                                                        type="text" />
                                                    </div>
                                                    <div className='flex items-center justify-between space-x-4 mb-3'>
                                                        <div className='flex flex-col'>
                                                            <label htmlFor="">Dirección</label>
                                                            <p className='text-xs'>(datos adicionales)</p>
                                                            <p className='text-xs'>(calle, num int.)</p>
                                                        </div>
                                                        <input 
                                                        disabled
                                                        onChange={handleChange}
                                                        className='py-0.5 w-80'
                                                        name='address2'
                                                        id='address2'
                                                        value={order.data.address2}
                                                        type="text" />
                                                    </div>
                                                    <div className='flex items-center justify-between space-x-4 mb-7'>
                                                        <label htmlFor="">Ciudad</label>
                                                        <input 
                                                        disabled
                                                        onChange={handleChange}
                                                        className='py-0.5 w-80'
                                                        name='city'
                                                        id='city'
                                                        value={order.data.city}
                                                        type="text" />
                                                    </div>
                                                    <div className='flex items-center justify-between space-x-4 mb-7'>
                                                        <label htmlFor="">Municipio</label>
                                                        <input 
                                                        disabled
                                                        onChange={handleChange}
                                                        className='py-0.5 w-80'
                                                        name='municipality'
                                                        id='municipality'
                                                        value={order.data.municipality}
                                                        type="text" />
                                                    </div>
                                                    <div className='flex items-center justify-between space-x-4 mb-7'>
                                                        <label htmlFor="">Código Postal</label>
                                                        <input 
                                                        disabled
                                                        onChange={handleChange}
                                                        className='py-0.5 w-80'
                                                        name='postalCode'
                                                        id='postalCode'
                                                        value={order.data.postalCode}
                                                        type="text" />
                                                    </div>
                                                    <div className='flex items-center justify-between space-x-4 mb-4'>
                                                        <label htmlFor="">Estado</label>
                                                        <input 
                                                        disabled
                                                        onChange={handleChange}
                                                        className='py-0.5 w-80'
                                                        name='state'
                                                        id='state'
                                                        value={order.data.state}
                                                        type="text" />
                                                    </div>
                                                    <div className='flex items-center justify-between space-x-4 mb-6'>
                                                        <div className='flex flex-col'>
                                                            <label htmlFor="">Teléfono de</label>
                                                            <p className=''>contacto</p>
                                                        </div>
                                                        <input 
                                                        disabled
                                                        onChange={handleChange}
                                                        className='py-0.5 w-80'
                                                        name='phone'
                                                        id='phone'
                                                        value={order.data.phone}
                                                        type="text" />
                                                    </div>

                                                    <div className='flex items-center justify-between space-x-4 mb-6'>
                                                        <div className='flex flex-col'>
                                                            <label htmlFor="">Tipo de envío</label>
                                                        </div>
                                                        <input 
                                                        disabled
                                                        onChange={handleChange}
                                                        className='py-0.5 w-80'
                                                        name='shippingOption'
                                                        id='shippingOption'
                                                        value={order.data.shippingOption}
                                                        type="text" />
                                                    </div>
                                                        </>
                                                    ))}

                                                    
                                                    </>


                                                </form>
                                            </div>

                                            </Modal>

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
                                                Revisar cambios
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
                                            {order.data.formattedCreatedAt}
                                            </p>
                                            <p>Nombre: {order.userData.name}</p>
                                            <p>Email: {order.userData.email} </p>
                                            <button 
                                            onClick={modalDatos.openModal}
                                            className='bg-gray-200 hover:bg-gray-300 active:bg-gray-400 active:text-white
                                            duration-300 px-4 py-0.5 mt-2 mb-4 text-sm font-medium'>Datos Cliente</button>
                                            
                                            <p>Orden Nro.: {order.id}</p>
                                            <p>Producto: {order.data.product}</p>
                                            <p>Cantidad: {order.data.quantity}</p>
                                            <p>Corte: {order.data.corte}</p>
                                            <p>Forma: {order.data.forma}</p>
                                            <p>Precio: ${order.data.price} </p>
                                            <Modal
                                            isOpen={modalDatos.isOpen}
                                            onClose={modalDatos.closeModal}>
                                                <div className='bg-gray-200 rounded-lg p-4 mt-2 flex items-center justify-between'>
                                                    <img src="/images/iconos/icono-user.png" alt="" width={110} />
                                                    <div className='flex flex-col items-start justify-center mr-2'>
                                                        <p className='font-semibold'>{order.userData.name}</p>
                                                        <p>{order.userData.email}</p>
                                                    </div>
                                                </div>

                                                <div className='bg-gray-200 rounded-lg p-4 mt-4 '>
                                                    <h2 className='text-center font-medium mt-3 mb-6'>Dirección cliente</h2>
                                                    <form>
                                                       
                                                            <>
                                                            <div key={index}>
                                                            <div className='flex items-center justify-between space-x-4 mb-6'>
                                                        <label htmlFor="">Nombre completo </label>
                                                        <input 
                                                        disabled
                                                        onChange={handleChange}
                                                        name='fullName'
                                                        id='fullName'
                                                        value={order.data.fullName}
                                                        type="text" />
                                                    </div>
                                                    <div className='flex items-center justify-between space-x-4 mb-3'>
                                                        <div className='flex flex-col'>
                                                            <label htmlFor="">Dirección</label>
                                                            <p className='text-xs'>(calle, num. ext, colonia)</p>
                                                        </div>
                                                        <input 
                                                        disabled
                                                        onChange={handleChange}
                                                        name='address'
                                                        id='address'
                                                        value={order.data.address}
                                                        type="text" />
                                                    </div>
                                                    <div className='flex items-center justify-between space-x-4 mb-3'>
                                                        <div className='flex flex-col'>
                                                            <label htmlFor="">Dirección</label>
                                                            <p className='text-xs'>(datos adicionales)</p>
                                                            <p className='text-xs'>(calle, num int.)</p>
                                                        </div>
                                                        <input 
                                                        disabled
                                                        onChange={handleChange}
                                                        name='address2'
                                                        id='address2'
                                                        value={order.data.address2}
                                                        type="text" />
                                                    </div>
                                                    <div className='flex items-center justify-between space-x-4 mb-7'>
                                                        <label htmlFor="">Ciudad</label>
                                                        <input 
                                                        disabled
                                                        onChange={handleChange}
                                                        name='city'
                                                        id='city'
                                                        value={order.data.city}
                                                        type="text" />
                                                    </div>
                                                    <div className='flex items-center justify-between space-x-4 mb-7'>
                                                        <label htmlFor="">Municipio</label>
                                                        <input 
                                                        disabled
                                                        onChange={handleChange}
                                                        name='municipality'
                                                        id='municipality'
                                                        value={order.data.municipality}
                                                        type="text" />
                                                    </div>
                                                    <div className='flex items-center justify-between space-x-4 mb-7'>
                                                        <label htmlFor="">Código Postal</label>
                                                        <input 
                                                        disabled
                                                        onChange={handleChange}
                                                        name='postalCode'
                                                        id='postalCode'
                                                        value={order.data.postalCode}
                                                        type="text" />
                                                    </div>
                                                    <div className='flex items-center justify-between space-x-4 mb-4'>
                                                        <label htmlFor="">Estado</label>
                                                        <input 
                                                        disabled
                                                        onChange={handleChange}
                                                        name='state'
                                                        id='state'
                                                        value={order.data.state}
                                                        type="text" />
                                                    </div>
                                                    <div className='flex items-center justify-between space-x-4 mb-6'>
                                                        <div className='flex flex-col'>
                                                            <label htmlFor="">Teléfono de</label>
                                                            <p className=''>contacto</p>
                                                        </div>
                                                        <input 
                                                        disabled
                                                        onChange={handleChange}
                                                        name='phone'
                                                        id='phone'
                                                        value={order.data.phone}
                                                        type="text" />
                                                    </div>

                                                    <div className='flex items-center justify-between space-x-4 mb-6'>
                                                        <div className='flex flex-col'>
                                                            <label htmlFor="">Tipo de envío</label>
                                                        </div>
                                                        <input 
                                                        disabled
                                                        onChange={handleChange}
                                                        name='shippingOption'
                                                        id='shippingOption'
                                                        value={order.data.shippingOption}
                                                        type="text" />
                                                    </div>
                                                            </div>
                                                            
                                                            
                                                            </>
                                                        
                                                    </form>
                                                </div>
                                            </Modal>

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
