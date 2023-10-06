import React from 'react'

export default function SocialIcons({Icons}) {
  return (
    <div className='text-primary-blueLight'>
       {Icons.map(icon => (
        <span 
        key={icon.name} 
        className='p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700
        mx-1.5 text-xl hover:text-gray-100 hover:bg-primary-blueLight duration-300'>
            <ion-icon name={icon.name}></ion-icon>
        </span>
       ))} 
    </div>
  )
}
