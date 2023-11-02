import React, { useEffect, useState } from 'react'
import { BsFacebook, BsFillTelephoneFill } from 'react-icons/bs'
import { IoLogoWhatsapp } from 'react-icons/io'
import { TiSocialFacebookCircular, TiSocialInstagramCircular, TiSocialYoutubeCircular } from 'react-icons/ti'
import { MdEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Contacto() {
    const [ isMobile, setIsMobile ] = useState(false)
    
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 640px)')
        const handleMediaQuery = (e) => {
            setIsMobile(e.matches)
        }
        mediaQuery.addEventListener('change', handleMediaQuery)
        setIsMobile(mediaQuery.matches)
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQuery)
        }
    }, [])
    const icon130 = {
        fontSize: isMobile ? '35px' : '130px',
        cursor: 'pointer',
        transition: 'font-size 0.3s ease',
    }

    const icon155 = {
        fontSize: isMobile ? '55px' : '155px',
        cursor: 'pointer',
        transition: 'font-size 0.3s ease',
    }

    const icon170 = {
        fontSize: isMobile ? '55px' : '170px',
        cursor: 'pointer',
        transition: 'font-size 0.3s ease',
    }
  return (
    <div>
        <h1 className='text-3xl md:text-5xl font-bold text-center mt-20'>¡Ponte en contacto con nosotros!</h1>
        <div className='flex flex-col items-center justify-center space-y-8 mt-8 mb-8'>
            
            <div className='flex items-end justify-center space-x-6 md:space-x-36 mt-8 mb-8'>
                <div className='flex flex-col items-center space-y-2'> 
                    <Link to={'/'}>
                    <MdEmail
                    className='hover:text-primary-blueLight transition duration-300 ease-in-out'
                    style={{fontSize: '55px'}}/>
                    </Link>
                    <p className='text-xl md:text-2xl whitespace-nowrap font-medium text-gray-900'>info@kwali.us</p>
                </div>

                <div className='flex flex-col items-center space-y-3'> 
                    <div className='flex items-center space-x-4'>
                        <Link to={'/'}>
                        <BsFillTelephoneFill
                        className='hover:text-primary-blueLight transition duration-300 ease-in-out'
                        style={{fontSize: '45px'}}/>
                        </Link>
                        {/* <Link to={'/'}>
                        <IoLogoWhatsapp
                         className='hover:text-primary-blueLight transition duration-300 ease-in-out'
                         style={{fontSize: '55px'}}/>
                         </Link> */}
                         
                    </div>
                    <p className='text-xl md:text-2xl whitespace-nowrap font-medium text-gray-900'>+52 686 945 8899</p>
                </div>
            </div>
            
               <h2 className='text-2xl md:text-4xl font-bold text-gray-900 '>Síguenos en redes sociales</h2>

        </div>
        <div className='flex items-center justify-center space-x-12 mb-8'>
                    <Link to={'/'}>
                    <TiSocialFacebookCircular 
                    className='hover:text-primary-blueLight transition duration-300 ease-in-out'
                    style={icon155}/>
                    </Link>
                    <Link to={'/'}>
                    <TiSocialYoutubeCircular className='hover:text-primary-blueLight transition duration-300 ease-in-out'
                    style={icon155}/>
                    </Link>
                    <Link to={'/'}>
                    <TiSocialInstagramCircular className='hover:text-primary-blueLight transition duration-300 ease-in-out'
                    style={icon155}  />
                    </Link>
        </div>
    </div>
  )
}
