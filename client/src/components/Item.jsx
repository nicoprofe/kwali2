import React from 'react'

export default function Item({Links, title}) {
  return <ul>
        <h1 className='mb-[0.7vh] font-semibold text-[2.2vh]'>{title}</h1>
            {Links.map((Link) => (
                <li key={Link.name}>
                    <a className='text-gray-400 hover:text-primary-blueLight duration-300 text-[1.9vh] cursor-pointer leading-[3vh]' 
                    href={Link.link}>{Link.name}</a>
                </li>
            ))}
        
    </ul>
  
}
