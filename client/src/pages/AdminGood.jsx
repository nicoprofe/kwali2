import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../TuPutaHermanContext'
import Modal from '../components/Modal'
import useModal from '../hooks/useModal'
import { style } from '../components/Styles'
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import { useAuthStatus } from '../hooks/useAuthStatus'
import { Timestamp } from 'firebase/firestore'
import axios from 'axios'

export default function AdminGood() {

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

    
    // fetch cambios
    const [ changesList, setChangesList ] = useState([])
    useEffect(() => {
        async function fetchChanges() {
            const changesRef = collection(db, "cambios")
            const querySnap = await getDocs(changesRef)
            const changes = querySnap.docs.map((doc) => doc.data().changes)
            setChangesList(changes)
        }
        fetchChanges()
    }, [])

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

        for (const order of orders) {
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
                console.error(`Error fetching user data: `, error)
            }
        }
        return ordersWithUserData
    }
    

     // FETCH ALL ORDERS
     const [ selectedOrderImage, setSelectedOrderImage ] = useState("/images/identidad/isotipo.png")
     const [ orders, setOrders ] = useState([])
     const [ selectedOrderId, setSelectedOrderId ] = useState(null)
    
     useEffect(() => {
         async function fetchAllOrders() {
             const ordersRef = collection(db, "orders")
             const q = query(ordersRef, orderBy("timestamp", "desc"))
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
            
         }
         fetchAllOrders()
     }, [])
 

    // IMAGE PREVIEW
    async function handleImageUpload(e, orderIndex) {
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

                    const testEmail = 'nicolasportu@gmail.com'

                    // If the user's email is available, send an email notification to the user
                    if(userEmail) {
                        await axios.get(`https://kwali2-server.vercel.app/send-preview-emails?email=${userEmail}`)
                    }
                }


            }


            console.log('Image uploaded, order preview updated and email sent successfully')
        } catch (error) {
            console.error('Error uploading image', error)
        }
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
          const orderRef = doc(db, 'orders', orderId);
          const orderDoc = await getDoc(orderRef);
      
          if (orderDoc.exists()) {
            const orderData = orderDoc.data();
            const changesArray = orderData.changes || [];
            return changesArray;
          }
      
          return [];
        } catch (error) {
          console.error('Error fetching changes array for order', error);
          return [];
        }
      };
      
      const [changessModal, setChangessModal] = useState(false);
      const [changesArray, setChangesArray] = useState([]);
      
      // Function to open the modal and fetch changes array for a specific order
      const handleOpenModalChanges = async (orderId) => {
        const fetchedChanges = await fetchChangesArrayForOrder(orderId);
        setChangesArray(fetchedChanges);
        setChangessModal(true);
        changesModal.openModal();
      };


    // DEFINE A FUNCTION TO FILTER ORDERS BASES ON SEARCH CRITERIA
    const filterOrders = (searchCriteria) => {
        const filteredOrders = orders.filter((order) => {
            const { data, userData} = order


            // Define your filter conditions
            const nameMatches = userData.name.toLowerCase().includes(searchCriteria.toLowerCase())
            const emailMatches = userData.email.toLowerCase().includes(searchCriteria.toLowerCase())
            // const dateMatches = data.timestamp.toDate().toLocaleDateString().includes(searchCriteria) 
            const productNameMatches = data.product.toLowerCase().includes(searchCriteria.toLowerCase())
            const approval1Matches = data.approval1 === searchCriteria
            const approval2Matches = data.approval2 === searchCriteria

            // Combine multiple filter conditions using logical operators
            return (
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
    <>
        <section className='max-w-6xl mx-auto flex flex-col justify-center items-center'>
            <h1 className='text-center text-3xl font-bold mt-6 mb-6'>Mis Pedidos</h1>
            

            <div>
                <input 
                type="text" 
                placeholder='Filtrar órdenes'
                value={searchInput}
                onChange={handleSearchChange}/>
                <ul>
                    {filteredOrders.map((order) => (
                        <li key={order.id}>
                       
                            hello
                           
                        </li>
                    ))}
                </ul>
            </div>

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

                        <ul>
                            {filteredOrders.map((order) => {
                                <li key={order.id}>


                                    
                                </li>
                            })}

                        </ul>
                  
                        {orders.map((order, index) => (
                            <>
                                <div className='flex items-center justify-around mt-3 ' >
                                    <div className=' flex items-center justify-center space-x-6'>

                                        <div className='flex flex-col items-center justify-center'>
                                            {/* <img src={order.data.imgSrc} alt={order.data.product} className='h-24 w-24' /> */}
                                            
                                            <img src={order.data.stickerUrl} alt='Imagen Cliente' className='h-24 w-24 mb-2' />
                                            <p key={order.id} className='text-sm font-medium'>{order.data.product} x{order.data.quantity}</p>
                                            <p>{order.data.corte}</p>
                                            <p className='text-md'>
                                            {order.data.timestamp && order.data.timestamp._methodName === 'serverTimestamp' ? (
                                                new Date().toLocaleDateString('es-MX', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })
                                            ) : (
                                                'Not a server timestamp'
                                            )}
                                            </p>
                                            {order.userData && (
                                                <>
                                                    <p>Nombre: {order.userData.name}</p>
                                                    <p>Email: {order.userData.email}</p>
                                                </>
                                            )}
                                            <div key={index}>
                                                {/* ... other order details ... */}
                                                
                                            
                                            </div>
                                            </div>

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
                                        <div  key={order.id}  className='bg-white h-[120px] w-[120px] flex items-center justify-center'>
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

                                    <div className='flex flex-col items-center justify-center space-y-3'>
                                        <p className='text-xs font-semibold'>Pendiente por aprobar</p>
                                        <p className='text-xs underline'>Leer nuestras condiciones <br />antes de aprobar</p>
                                        
                                        
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
                            
                            {cartItems.map((item, index) => (
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
                className='text-blue-600 hover:text-blue-800 transiton duration-300 cursor-pointer'>
                    Cerrar Sesión
                </p>
            </div>





        </section>
    </>
  )
}
