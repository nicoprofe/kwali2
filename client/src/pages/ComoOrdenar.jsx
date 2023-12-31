import React from 'react'
import { style } from '../components/Styles'
import useModal from '../hooks/useModal'
import Modal from '../components/Modal'
import NecesitasAyudaConTusArchivos from '../components/NecesitasAyudaConTusArchivos'
import { Link } from 'react-router-dom'
import lineasDeCorte from '../imagesOutsidePublic/infografia-lineas de corte.jpg'
import seleccionTamano from '../imagesOutsidePublic/infografia-seleccion tamano.jpg'
import tipoDeCorte from '../imagesOutsidePublic/infografia- tipo de corte.jpg'
import ejemploDeWaterTape from '../imagesOutsidePublic/infografia- water tape.jpg'
import YoutubeEmbed from '../components/YoutubeEmbed'
import { useMediaQuery } from 'react-responsive'

export default function ComoOrdenar() {
  const videoId = "Gf_1NScMeFE"

  const modalLineaDeCorte = useModal()
  const modalTamanos = useModal()
  const modalCortesSuaje = useModal()
  const modalGuiaDeImpresion = useModal()
  const modalEjemploDeWaterTape = useModal()

  const isDesktop = useMediaQuery({ minWidth: 992 })


  return (
    <div className=''>
      <h1 className='text-gray-900 font-semibold text-2xl md:text-3xl text-center mt-8 px-2 md:px-0'>Nunca antes había sido tan fácil ordenar stickers.</h1>

      <YoutubeEmbed embedId={videoId}/>

      <div className='md:-translate-y-24'>
        <NecesitasAyudaConTusArchivos/>
      </div>
      

      <div>
        <h1 className='text-gray-900 font-semibold text-2xl md:text-3xl text-center mt-8 mb-12 md:mb-36 px-2 md:px-0'>
          Aqui te dejamos todos nuestros tutoriales y guías.</h1>

          {isDesktop 
          ? <>
              <div className='w-full flex flex-col space-y-6 md:space-y-10 mb-16'>

              <div className='flex items-center justify-around'>
                <button
                onClick={modalLineaDeCorte.openModal} 
                className={`${style[0].button_como_ordenar} md:w-64 whitespace-nowrap`}>Línea de corte</button>
                <Modal
                isOpen={modalLineaDeCorte.isOpen}
                onClose={modalLineaDeCorte.closeModal}>
                  <img className='md:h-[550px]' src={lineasDeCorte} alt="" />
                </Modal>

                <button 
                onClick={modalTamanos.openModal}
                className={`${style[0].button_como_ordenar} md:w-64 whitespace-nowrap`} >Tamaños</button>
                <Modal
                isOpen={modalTamanos.isOpen}
                onClose={modalTamanos.closeModal}>
                  <img className='md:h-[550px]' src={seleccionTamano} alt="" />
                </Modal>

                <button
                onClick={modalCortesSuaje.openModal} 
                className={`${style[0].button_como_ordenar} md:w-64 whitespace-nowrap`}>Cortes/Suaje</button>
                <Modal
                isOpen={modalCortesSuaje.isOpen}
                onClose={modalCortesSuaje.closeModal}>
                  <img className='md:h-[550px]' src={tipoDeCorte} alt="" />
                </Modal>

              </div>

              <div className='flex items-center justify-around md:justify-center md:space-x-28 ml-0 md:ml-16'>
                <button
                onClick={modalGuiaDeImpresion.openModal} 
                className={`${style[0].button_como_ordenar} md:w-96 whitespace-nowrap`}>Guía de impresión</button>
               

                <button 
                onClick={modalEjemploDeWaterTape.openModal}
                className={`${style[0].button_como_ordenar} md:w-96 whitespace-nowrap`}>Ejemplo de water tape</button>
                <Modal
                isOpen={modalEjemploDeWaterTape.isOpen}
                onClose={modalEjemploDeWaterTape.closeModal}>
                  <img className='h-[550px]' src={ejemploDeWaterTape} alt="" />
                </Modal>
              </div>

          </div>

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
          
            </> 
          : 
            <div className='flex flex-col md:flex-row items-center justify-around space-y-4 mb-16 md:mb-0 px-14 mb:px-0'>
              <button
              onClick={modalLineaDeCorte.openModal} 
              className={`${style[0].button_como_ordenar} w-full md:w-64 whitespace-nowrap`}>Línea de corte</button>
             

              <button 
              onClick={modalTamanos.openModal}
              className={`${style[0].button_como_ordenar} w-full md:w-64 whitespace-nowrap`} >Tamaños</button>
              
             

              <button
              onClick={modalCortesSuaje.openModal} 
              className={`${style[0].button_como_ordenar} w-full md:w-64 whitespace-nowrap`}>Cortes/Suaje</button>
              
              

              <button
              onClick={modalGuiaDeImpresion.openModal} 
              className={`${style[0].button_como_ordenar} w-full md:w-96 whitespace-nowrap`}>Guía de impresión</button>
            

              <button 
              onClick={modalEjemploDeWaterTape.openModal}
              className={`${style[0].button_como_ordenar} w-full md:w-96 whitespace-nowrap`}>Ejemplo de water tape</button>
              
              <Modal
              isOpen={modalLineaDeCorte.isOpen}
              onClose={modalLineaDeCorte.closeModal}>
                <img className='md:h-[550px]' src={lineasDeCorte} alt="" />
              </Modal>
              
              <Modal
              isOpen={modalTamanos.isOpen}
              onClose={modalTamanos.closeModal}>
                <img className='md:h-[550px]' src={seleccionTamano} alt="" />
              </Modal>
              
              <Modal
              isOpen={modalCortesSuaje.isOpen}
              onClose={modalCortesSuaje.closeModal}>
                <img className='md:h-[550px]' src={tipoDeCorte} alt="" />
              </Modal>

              <Modal
              isOpen={modalEjemploDeWaterTape.isOpen}
              onClose={modalEjemploDeWaterTape.closeModal}>
                <img className='h-[550px]' src={ejemploDeWaterTape} alt="" />
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
                                <p className='text-sm'>Se recomienda que mandes tu diseño en curvas/vectores, y en caso de ser 
                                imagen rasterizada se pide una calidad de 300DPI. Esto para asegurar la calidad 
                                  de imagen de tu producto.</p>
                            </div>
                        </div>
                        <div className='border-b p-4 flex items-center justify-center text-start'>
                            <img className='h-14 md:mr-3' src="/images/transparentes/infografia-22.png" alt="" />
                            <div>
                                <h1 className='font-semibold text-semibold text-lg'>Suaje</h1>
                                <p className='text-sm'>Por favor incluye las líneas de corte para que sepamos con seguridad cómo 
                                quieres que se vea tu producto. Si tienes dificultad para realizar el suaje/líneas de 
                                corte no hay problema, nuestro equipo de diseño se encargará de ayudarte.</p>
                            </div>
                        </div>
                        <div className='border-b p-4 flex items-center justify-center text-start'>
                            <img className='h-16 mr-2 md:mr-3' src="/images/transparentes/infografia-23.png" alt="" />
                            <div>
                                <h1 className='font-semibold text-semibold text-lg'>Tipografía y textos</h1>
                                <p className='text-sm'>Si incluyes alguna tipografía o texto en tu diseño asegúrate de convertir en curvas 
                                para poder utilizar tu archivo sin problemas.</p>
                            </div>
                        </div>
                        <div className='border-b p-4 flex items-center justify-center text-start'>
                            <img className='h-16 mr-3 md:mr-6' src="/images/transparentes/infografia-24.png" alt="" />
                            <div>
                                <h1 className='font-semibold text-semibold text-lg'>Tipo de corte</h1>
                                <p className='text-sm'>En la mayoría de nuestros productos encontrarás la opción entre corte “Kiss-cut” y 
                                “Die-cut” (también conocido como troquelado). “Kiss-cut” es un corte superficial 
                                  siguiendo la silueta del diseño sin llegar a cortar el papel de despliegue, mientras 
                                  que “Die-cut” corta el papel de despliegue con la forma de tu diseño.</p>
                            </div>
                        </div>
                        <div className='border-b p-4 flex items-center justify-center text-start'>
                            <img className='h-16 mr-3' src="/images/transparentes/infografia-25.png" alt="" />
                            <div>
                                <h1 className='font-semibold text-semibold text-lg'>Prueba de impresión</h1>
                                <p className='text-sm'>Nuestro equipo de diseño se encargará de revisar que todo se encuentre en 
                                orden en tu archivo, en caso de que se requieran ajustes se te notificará en tu 
                                  prueba de impresión digital, así como también se te mostrará cómo quedará tu 
                                  diseño una vez impreso. </p>
                            </div>
                        </div>
                        <div className='border-b p-4 flex items-center justify-center text-start'>
                            <img className='h-20 mr-6' src="/images/transparentes/infografia-26.png" alt="" />
                            <div>
                                <h1 className='font-semibold text-semibold text-lg'>Tamaño de impresión</h1>
                                <p className='text-sm'>Al seleccionar tu tamaño de impresión recuerda que nos basaremos en la medida 
                                más grande de tu diseño, esto para no distorsionar y deformarlo.</p>
                            </div>
                        </div>


                  </div>  
              </Modal>

            </div>
          }

          

          

          <div className='px-6 md:px-24 mb-6'>
             <h1 className='bg-secondary-blueLight p-3 text-center text-4xl md:text-5xl font-bold'>Cómo ordenar</h1>
          </div>
          <div className='flex items-center justify-center mb-10 md:mb-24 '>
            
            {/* <img className='w-[1200px] items-center' src="/images/informativos/como ordenar.jpg" alt="" /> */}
            <div className='sm:grid grid-cols-2 md:grid-cols-3 gap-10 space-y-8 md:space-y-0 '>

              <div className='flex flex-col items-center justify-start'>
                <img className='h-72 md:h-80' src="/images/transparentes/infografia-14.png" alt="" />
                <div className='px-12'>
                  <h1 className='text-xl font-semibold'>1- Elige el tamaño de tus stickers.</h1>
                  <p className='text-base text-justify'>Nuestro equipo de diseño se basará en el lado más grande de tu imagen/ilustración para que coincida con el tamaño seleccionado, esto para evitar distorsionar tu diseño.</p>
                </div>
              </div>

              <div className='flex flex-col items-center justify-start '>
                <img className='h-72 md:h-80' src="/images/transparentes/infografia-15.png" alt="" />
                <div className='px-12'>
                  <h1 className='text-xl font-semibold'>2- Elige la cantidad y  tipo de corte que deseas.</h1>
                  <p className='text-base text-justify '>Entre mayor sea la cantidad que elijas se te dará un mayor descuento.
                  
                  </p>
                </div>
              </div>

              <div className='flex flex-col items-center justify-start '>
                <img className='h-72 md:h-80' src="/images/transparentes/infografia-16.png" alt="" />
                <div className='px-12'>
                  <h1 className='text-xl font-semibold'>3- Sube tu archivo</h1>
                  <p className='text-base text-justify '>Te recomendamos seguir las especificaciones en nuestra “Guía de impresión” para evitar retrasos.</p>
                </div>
              </div>

              <div className='flex flex-col items-center justify-start '>
                <img className='h-72 md:h-80' src="/images/transparentes/infografia-17.png" alt="" />
                <div className='px-12'>
                  <h1 className='text-xl font-semibold md:whitespace-nowrap'>4- Añade a tu carrito y realiza tu pago.</h1>
                  <p className='text-base text-justify'>Una vez que realices tu pago nuestro equipo de diseño se encargará de revisar tu archivo y sus especificaciones.
                  </p>
                </div>
              </div>

              <div className='flex flex-col items-center justify-start '>
                <img className='h-72 md:h-80' src="/images/transparentes/infografia-18.png" alt="" />
                <div className='px-12'>
                <h1 className='text-xl font-semibold'>5- Revisa tu prueba.</h1>
                <p className='text-base text-justify '>En las siguientes 24-48 hrs. después de realizar tu pago recibirás una prueba de impresión digital en tu cuenta de Kwali, aquí podrás revisar y aprobar, o pedir cambios en caso de que lo necesites.
                </p>
                </div>
              </div>

              <div className='flex flex-col items-center justify-start '>
                <img className='h-72 md:h-80' src="/images/transparentes/infografia-19.png" alt="" />
                <div className='px-12'>
                <h1 className='text-xl font-semibold'>6- Recibe tu diseño impreso.</h1>
                <p className='text-base text-justify '>Una vez aprobada tu prueba de impresión procederemos a imprimir tu pedido tal como lo especificaste y podrás recibir tus productos en la comodidad de tu casa.</p>
                </div>
              </div>

            </div>

          </div>

          <div className='flex items-center justify-center mb-10 md:mb-20'>
              <Link to={'/productos'} 
              className=' text-gray-900 active:text-white bg-secondary-blueLight hover:bg-sky-300 active:bg-sky-400
              transition duration-150 ease-in-out rounded px-6 md:px-12 py-2 font-medium text-lg md:text-2xl uppercase'>Ir a comprar</Link>
          </div>
          

      </div>

    </div>
  )
}
