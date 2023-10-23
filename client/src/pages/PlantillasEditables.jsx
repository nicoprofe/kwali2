import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useModal from '../hooks/useModal'
import Modal from '../components/Modal'

export default function PlantillasEditables() {
    const modalGuiaDeDimensiones = useModal()
    const modalGuiaDeImpresion = useModal()
    const modalLineaDeCorte = useModal()
    const modalGuiaDeCorte = useModal()

    const [ selectedCategory, setSelectedCategory ] = useState('all')

    const [ list, setList ] = useState([
        {
            text: 'Archivo para sticker',
            file: '/plantillas/plantilla sticker.pdf',
            category: 'stickers' ,
        },
        {
            text: 'Archivo para sticker circular',
            file: '/plantillas/plantilla etiqueta circular.pdf',
            category: 'stickers' ,
        },
        {
            text: 'Archivo para sticker cuadrado',
            file: '/plantillas/plantilla etiqueta cuadrado.pdf',
            category: 'stickers' ,
        },
        {
            text: 'Archivo para sticker rectangular',
            file: '/plantillas/plantilla etiqueta rectangular.pdf',
            category: 'stickers' ,
        },
        {
            text: 'Archivo para etiqueta circular',
            file: '/plantillas/plantilla etiqueta circular.pdf',
            category: 'etiquetas' ,
        },
        {
            text: 'Archivo para etiqueta ovalada',
            file: '/plantillas/plantilla etiqueta ovalada.pdf',
            category: 'etiquetas' ,
        },
        {
            text: 'Archivo para etiqueta cuadrada',
            file: '/plantillas/plantilla etiqueta cuadrada.pdf',
            category: 'etiquetas' ,
        },
        {
            text: 'Archivo para etiqueta 2.25x1.25 cuadrada',
            file: '/plantillas/plantilla etiqueta 2.25x1.25_ rectangular.pdf',
            category: 'etiquetas' ,
        },
        {
            text: 'Archivo para etiqueta 2.75x4.25 cuadrada',
            file: '/plantillas/plantilla etiqueta 2.75x4.25_ rectangular.pdf',
            category: 'etiquetas' ,
        },
        {
            text: 'Archivo para etiqueta 2x1 cuadrada',
            file: '/plantillas/plantilla etiqueta 2x1_ rectangular.pdf',
            category: 'etiquetas' ,
        },
        {
            text: 'Archivo para etiqueta 3x5 cuadrada',
            file: '/plantillas/plantilla etiqueta 3x5_ rectangular.pdf',
            category: 'etiquetas' ,
        },
        {
            text: 'Archivo para etiqueta 4x1.5 cuadrada',
            file: '/plantillas/plantilla etiqueta 4x1.5_ rectangular.pdf',
            category: 'etiquetas' ,
        },
        {
            text: 'Archivo para etiqueta 4x6 cuadrada',
            file: '/plantillas/plantilla etiqueta 4x6_ rectangular.pdf',
            category: 'etiquetas' ,
        },
        {
            text: 'Archivo para etiqueta 6x2.25 cuadrada',
            file: '/plantillas/plantilla etiqueta 6x1.2.25_ rectangular.pdf',
            category: 'etiquetas' ,
        },
        
    ])

    const [ filteredList, setFilteredList ] = useState(list)

    const handleChangeCategory = (event) => {
        setSelectedCategory(event.target.value)
    }

    useEffect(() => {
        if(selectedCategory === 'all') {
            setFilteredList(list)
        } else {
            setFilteredList(list.filter((item) => item.category === selectedCategory))
        }
    }, [selectedCategory, list])


  return (
    <div className='px-6 md:px-40 h-full'>

      <h1 className='text-center font-semibold uppercase text-3xl text-gray-900 mt-8 mb-2'>Plantillas y Guías</h1>
      <p className='text-center font-semibold text-sm text-gray-900 mb-8'>Descarga nuestras plantillas y archivos</p>

      <div>
        <select
        vavlue={selectedCategory}
        onChange={handleChangeCategory}
        className='text-gray-900 text-xl pl-6 pr-12 mb-8  font-medium underline tracking-wider
        bg-gray-200 h-12 px-7 rounded shadow border-transparent ring-transparent outline-none
        focus:border-transparent focus:ring-transparent focus:outline-none'>
            <option value="all">Todas las plantillas</option>
            <option value="stickers">Plantillas para Stickers</option>
            <option value="etiquetas">Plantillas para Etiquetas</option>
        </select>
      </div>



      <div className='flex flex-col space-y-2 mb-12' >

      

        {filteredList.map((item, key) => (
            <>
               <p 
               key={key} 
               className='whitespace-nowrap underline font-medium text-xl text-blue-600 hover:text-blue-800 duration-300'>
                    <a href={item.file} download>{item.text}</a>
               </p>
            </>
        ))}
       
       
       
        {/* <p className='whitespace-nowrap underline font-medium text-xl text-blue-600 hover:text-blue-800 duration-300'>
            <a href="/plantillas/plantilla sticker.pdf" download>Archivo para stickers 1</a>
        </p>
        <p className='whitespace-nowrap underline font-medium text-xl text-blue-600 hover:text-blue-800 duration-300'>
            <a href="/plantillas/plantilla sticker.pdf" download>Archivo para stickers 2</a>
        </p>
        <p className='whitespace-nowrap underline font-medium text-xl text-blue-600 hover:text-blue-800 duration-300'>
            <a href="/plantillas/plantilla etiqueta circular.pdf" download>Archivo para etiquetas redondas</a>
        </p>
        <p className='whitespace-nowrap underline font-medium text-xl text-blue-600 hover:text-blue-800 duration-300'>
            <a href="/plantillas/plantilla etiqueta ovalada.pdf" download>Archivo para etiquetas ovaladas</a>
        </p>
        <p className='whitespace-nowrap underline font-medium text-xl text-blue-600 hover:text-blue-800 duration-300'>
            <a href="/plantillas/plantilla etiqueta cuadrada.pdf" download>Archivo para etiquetas cuadradas</a>
        </p>
        <p className='whitespace-nowrap underline font-medium text-xl text-blue-600 hover:text-blue-800 duration-300'>
            <a href="/plantillas/plantilla etiqueta 2.25x1.25_ rectangular.pdf" download>Archivo para etiquetas rectangulares 2.25x1.25</a>
        </p>
        <p className='whitespace-nowrap underline font-medium text-xl text-blue-600 hover:text-blue-800 duration-300'>
            <a href="/plantillas/plantilla etiqueta 2x1_ rectangular.pdf" download>Archivo para etiquetas rectangulares 2x1</a>
        </p>
        <p className='whitespace-nowrap underline font-medium text-xl text-blue-600 hover:text-blue-800 duration-300'>
            <a href="/plantillas/plantilla sticker.pdf" download>Archivo para Water Tape</a>
        </p> */}
      </div>

      {/* <div className='flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-36 mb-12'>
        <Link 
        onClick={modalGuiaDeDimensiones.openModal}
        className='whitespace-nowrap text-center bg-secondary-blueLight hover:bg-sky-300 active:bg-sky-400 duration-300 
         w-full py-1.5 font-medium text-xs text-gray-900 active:text-white '>Ver guía de dimensiones</Link>
        <Link 
        onClick={modalGuiaDeImpresion.openModal}
        className='whitespace-nowrap text-center bg-secondary-blueLight hover:bg-sky-300 active:bg-sky-400 duration-300 
         w-full py-1.5 font-medium text-xs text-gray-900 active:text-white '>Guía de impresión avanzada</Link>
        <Link
         onClick={modalLineaDeCorte.openModal} 
        className='whitespace-nowrap text-center bg-secondary-blueLight hover:bg-sky-300 active:bg-sky-400 duration-300 
         w-full py-1.5 font-medium text-xs text-gray-900 active:text-white '>Ejemplo de lineas de corte</Link>
        <Link 
        onClick={modalGuiaDeCorte.openModal}
        className='whitespace-nowrap text-center bg-secondary-blueLight hover:bg-sky-300 active:bg-sky-400 duration-300 
         w-full py-1.5 font-medium text-xs text-gray-900 active:text-white '>Guía de cortes</Link>

      </div>

      <Modal 
         isOpen={modalGuiaDeDimensiones.isOpen}
         onClose={modalGuiaDeDimensiones.closeModal}>
            <img 
            className='md:h-[550px]' 
            src="/images/informativos/guia dimensiones.jpg" alt="" />
         </Modal>

         <Modal
                isOpen={modalGuiaDeImpresion.isOpen}
                onClose={modalGuiaDeImpresion.closeModal}>
                  <div className='sm:grid grid-cols-2 gap-4 px-6'>

                        <div className='border-b p-4 flex items-center justify-center text-start'>
                              <img className='h-16 mr-8' src="/images/transparentes/infografia-20.png" alt="" />
                            <div>
                                <h1 className='font-semibold text-semibold text-lg'>Formato</h1>
                                <p className='text-sm'>Aceptamos archivos: .pdf, .jpg, .png, .tif, .svg, .eps <span className='opacity-0'>---------------------------------------</span></p>
                            </div>
                        </div>
                        <div className='border-b p-4 flex items-center justify-center text-start'>
                            <img className='h-16 mr-3' src="/images/transparentes/infografia-21.png" alt="" />
                            <div>
                                <h1 className='font-semibold text-semibold text-lg'>Tu diseño</h1>
                                <p className='text-sm'>Se recomienda que mandes tu diseño en curvas/vectores, y en caso de ser <br />
                                imagen rasterizada se pide una calidad de 300DPI. Esto para asegurar la calidad <br />
                                  de imagen de tu producto.</p>
                            </div>
                        </div>
                        <div className='border-b p-4 flex items-center justify-center text-start'>
                            <img className='h-14 md:mr-3' src="/images/transparentes/infografia-22.png" alt="" />
                            <div>
                                <h1 className='font-semibold text-semibold text-lg'>Suaje</h1>
                                <p className='text-sm'>Por favor incluye las líneas de corte para que sepamos con seguridad cómo <br />
                                quieres que se vea tu producto. Si tienes dificultad para realizar el suaje/líneas de <br />
                                corte no hay problema, nuestro equipo de diseño se encargará de ayudarte.</p>
                            </div>
                        </div>
                        <div className='border-b p-4 flex items-center justify-center text-start'>
                            <img className='h-16 mr-2 md:mr-3' src="/images/transparentes/infografia-23.png" alt="" />
                            <div>
                                <h1 className='font-semibold text-semibold text-lg'>Tipografía y textos</h1>
                                <p className='text-sm'>Si incluyes alguna tipografía o texto en tu diseño asegúrate de convertir en curvas <br />
                                para poder utilizar tu archivo sin problemas.</p>
                            </div>
                        </div>
                        <div className='border-b p-4 flex items-center justify-center text-start'>
                            <img className='h-16 mr-3 md:mr-6' src="/images/transparentes/infografia-24.png" alt="" />
                            <div>
                                <h1 className='font-semibold text-semibold text-lg'>Tipo de corte</h1>
                                <p className='text-sm'>En la mayoría de nuestros productos encontrarás la opción entre corte “Kiss-cut” y <br />
                                “Die-cut” (también conocido como troquelado). “Kiss-cut” es un corte superficial <br />
                                  siguiendo la silueta del diseño sin llegar a cortar el papel de despliegue, mientras <br />
                                  que “Die-cut” corta el papel de despliegue con la forma de tu diseño.</p>
                            </div>
                        </div>
                        <div className='border-b p-4 flex items-center justify-center text-start'>
                            <img className='h-16 mr-3' src="/images/transparentes/infografia-25.png" alt="" />
                            <div>
                                <h1 className='font-semibold text-semibold text-lg'>Prueba de impresión</h1>
                                <p className='text-sm'>Nuestro equipo de diseño se encargará de revisar que todo se encuentre en <br />
                                orden en tu archivo, en caso de que se requieran ajustes se te notificará en tu <br />
                                  prueba de impresión digital, así como también se te mostrará cómo quedará tu <br />
                                  diseño una vez impreso. </p>
                            </div>
                        </div>
                        <div className='border-b p-4 flex items-center justify-center text-start'>
                            <img className='h-20 mr-6' src="/images/transparentes/infografia-26.png" alt="" />
                            <div>
                                <h1 className='font-semibold text-semibold text-lg'>Tamaño de impresión</h1>
                                <p className='text-sm'>Al seleccionar tu tamaño de impresión recuerda que nos basaremos en la medida <br />
                                más grande de tu diseño, esto para no distorsionar y deformarlo.</p>
                            </div>
                        </div>


                  </div>  
                </Modal>

         <Modal 
         isOpen={modalLineaDeCorte.isOpen}
         onClose={modalLineaDeCorte.closeModal}>
            <img 
            className='md:h-[550px]' 
            src="/images/informativos/infografia-lineas de corte.jpg" alt="" />
         </Modal>

         <Modal 
         isOpen={modalGuiaDeCorte.isOpen}
         onClose={modalGuiaDeCorte.closeModal}>
            <img 
            className='md:h-[550px]' 
            src="/images/informativos/infografia-tipo de corte.jpg" alt="" />
         </Modal> */}
    </div>
  )
}
