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
        <div className='md:flex md:justify-between sm:px-[7vh] px-[2vh] py-[6vh] md:items-center bg-[#ffffff19]'>
            <h1 className='md:text-[4vh] text-xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5'>
                <span className='text-primary-blueLight text-3xl md:text-[8vh]'>Newsletter</span><br />Enterate antes que nadie de todas nuestras promociones y descuentos
            </h1>
            <div>
                <input type="text" placeholder='Email'
                className='text-gray-800 sm:w-[40vh] w-full sm:mr-[3vh] mr-[1vh] lg:mb-0 mb-[2vh] py-[1.5vh] text-[2vh] rounded px-[2vh] focus:outline-none' />
                <button className='bg-sky-500 hover:bg-sky-600 active:bg-sky-800 duration-300 
                px-[2.5vh] py-[1.5vh] font-[Poppins] rounded-md text-[2vh] text-white md:w-auto w-full'>Suscribirme</button>
            </div>
        </div>
        <ItemsContainer/>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-[1vh] text-gray-400
        text-[1.9vh] pb-[5vh]'>
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
