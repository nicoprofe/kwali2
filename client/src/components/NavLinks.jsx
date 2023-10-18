import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NavLinks = ({ toggleHamburguer}) => {

    const [ heading, setHeading ] = useState("")
    const [ subHeading, setSubHeading ] = useState("")

    // TOGGLE HAMBURGUER
    const [ mobileMenuVisible, setMobileMenuVisible ] = useState(false)

    const toggleMobileMenu = () => {
        setMobileMenuVisible(!mobileMenuVisible)
    }

    const links = [
        {
            name: "Productos", 
            submenu: true, 
            // link: "/productos",
            sublinks: [
            {
                Head: "Todos los productos",
                sublink: [
                    {name: "Todos los productos", link: "/productos"},
                    {name: "Stickers", link: "/stickers"},
                    {name: "Etiquetas", link: "/etiquetas"},
                    {name: "Stickers de piso", link: "/stickers-de-piso"},
                    {name: "Imanes", link: "/imanes"},
                    {name: "Water activated tape", link: "/water-activated-tape"},
                    {name: "Planillas de stickers", link: "/planillas-de-stickers"},
                    {name: "Muestras", link: "/muestras"},
                ],
              },
            {
                Head: "Stickers",
                sublink: [
                    {name: "Mate", link: "/stickers/mate"},
                    {name: "Brillantes", link: "/stickers/brillantes"},
                    {name: "Holograficos", link: "/stickers/holograficos"},
                    {name: "Transparentes", link: "/stickers/transparentes"},
                    {name: "Espejo", link: "/stickers/espejo"},
                    {name: "Metal silver", link: "/stickers/metal-silver"},
                    {name: "Metal gold", link: "/stickers/metal-gold"},
                ],
              },
            {
                Head: "Etiquetas",
                sublink: [
                    {name: "Circulares", link: "/etiquetas/circulares"},
                    {name: "Ovaladas", link: "/etiquetas/ovaladas"},
                    {name: "Cuadradas", link: "/etiquetas/cuadradas"},
                    {name: "Rectangulares", link: "/etiquetas/rectangulares"},
                ],
              },
            {
                Head: "Stickers para piso",
                sublink: [
                    {name: "Stickers para piso", link: "/stickers-para-piso"},
                    
                ],
              },
            {
                Head: "Imanes",
                sublink: [
                    {name: "Imanes", link: "/imanes"},
                   
                ],
              },
            {
                Head: "Water activated tape",
                sublink: [
                    {name: "Water activated tape", link: "/water-activated-tape"},
                
                ],
              },
            {
                Head: "Planillas de stickers",
                sublink: [
                    {name: "Planillas de stickers", link: "/planillas-de-stickers"},
           
                ],
              },
            {
                Head: "Muestras",
                sublink: [
                    {name: "Muestras", link: "/muestras"},
           
                ],
              },
            ],
        
            
            
        }
    ]

  return (
          <>
    {links.map((LinkItem) => (
            <div key={LinkItem.name}>
                <div className='px-3 text-left md:cursor-pointer group'>
                    <h1 className='py-7 flex justify-between items-center md:pr-0 pr-5 group' 
                    onClick={() => {
                    heading !== LinkItem.name 
                    ? setHeading(LinkItem.name)
                    : setHeading("");
                    setSubHeading("")}}>
                        {LinkItem.name}
                        <span className='text-xl md:hidden inline'>
                            <ion-icon name={`${heading === LinkItem.name ? "chevron-up" : "chevron-down"}`}></ion-icon>
                        </span>
                        <span className='text-xl md:mt-1 md:ml-2 md:block hidden group-hover:rotate-180 group-hover:-mt-2'>
                            <ion-icon name="chevron-down"></ion-icon>
                        </span>
                    </h1>
                    {LinkItem.submenu && (
                        <div>
                            <div className='absolute top-20 hidden group-hover:md:block hover:md:block z-50'>
                                <div className='py-3'>
                                    <div className='w-4 h-4 left-3 absolute mt-1 
                                    bg-white rotate-45'></div>
                                </div>
                                <div className='bg-white shadow-lg p-5 grid grid-cols-3 gap-10'>
                                    {LinkItem.sublinks.map((mysublinks) => (
                                        <div key={mysublinks.Head}>
                                            <h1 className='text-lg font-semibold'>
                                                {mysublinks.Head}
                                            </h1>
                                            {mysublinks.sublink.map((slink) => (
                                                <li key={slink.name} className='text-sm text-gray-600 my-2.5'>
                                                    <Link 
                                                    to={slink.link}
                                                    className='hover:text-primary-blueLight'>
                                                        {slink.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* mobile menus */}
                <div className={`
                    ${heading === LinkItem.name ? "md:hidden" : "hidden"}
                `}>
                    {/* sublinks */}
                    {
                        LinkItem.sublinks.map((slinks) => (
                            <div key={slinks.Head}>
                                <div>
                                    <h1
                                    onClick={() => 
                                    subHeading !== slinks.Head
                                    ? setSubHeading(slinks.Head)
                                    : setSubHeading("")} 
                                    className='py-4 pl-7 font-semibold md:pr-0 pr-5 flex justify-between items-center'>
                                        {slinks.Head}
                                        <span className='text-xl md:mt-1 md:ml-2 inline'>
                                        <ion-icon name={`${subHeading === slinks.Head ? "chevron-up" : "chevron-down"}`}></ion-icon>
                                        </span>
                                    </h1>
                                    <div className={`${
                                        subHeading === slinks.Head 
                                        ? "md:hidden"
                                        : "hidden"
                                    }`}>
                                        {slinks.sublink.map(slink => (
                                            <li key={slink.name} className='py-3 pl-14'>
                                                <Link 
                                                to={slink.link}
                                                className='hover:text-primary-blueLight'
                                                onClick={() => toggleHamburguer()}>
                                                    {slink.name} 
                                                </Link>
                                            </li>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        ))}
    </>
  )
}

export default NavLinks
