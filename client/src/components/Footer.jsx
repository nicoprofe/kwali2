import React from 'react'
import ItemsContainer from './ItemsContainer'
import SocialIcons from './SocialIcons'
import { Icons } from './Menus'
import useModal from '../hooks/useModal'
import Modal from './Modal'
import TermsAndConditions from '../pages/TermsAndConditions'
import Privacy from '../pages/Privacy'

export default function Footer() {
    const modalTerminos = useModal()
    const modalPrivacidad = useModal()
  return (
    <footer className='bg-gray-900 text-white'>
        <div className='md:flex md:justify-between sm:px-12 px-4 py-7 md:items-center bg-[#ffffff19]'>
            <h1 className='md:text-3xl text-1xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5'>
                <span className='text-primary-blueLight text-3xl md:text-6xl'>Newsletter</span><br />Enterate antes que nadie de todas nuestras promociones y descuentos
            </h1>
            <div>
                <input type="text" placeholder='Email'
                className='text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none' />
                <button className='bg-sky-500 hover:bg-sky-600 active:bg-sky-800 duration-300 
                px-5 py-2.5 font-[Poppins] rounded-md text-white md:w-auto w-full'>Suscribirme</button>
            </div>
        </div>
        <ItemsContainer/>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400
        text-sm pb-8'>
            <span>© 2023 Kwali. Todos los derechos reservados.</span>

            <div>
                <span 
                onClick={modalTerminos.openModal}
                className='cursor-pointer'>Términos . 
                </span>
                <span 
                onClick={modalPrivacidad.openModal}
                className='cursor-pointer'>Política de Privacidad</span>

                <Modal
                isOpen={modalTerminos.isOpen}
                onClose={modalTerminos.closeModal}>
                    <TermsAndConditions/>

                </Modal>

                <Modal
                isOpen={modalPrivacidad.isOpen}
                onClose={modalPrivacidad.closeModal}>
                    <Privacy/>
                </Modal>
            </div>
            
            <SocialIcons Icons={Icons}/>
        </div>

    </footer>
  )
}
