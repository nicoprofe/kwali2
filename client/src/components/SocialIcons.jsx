import React from 'react'

export default function SocialIcons({Icons}) {
  return (
    <div className='text-primary-blueLight'>
       {Icons.map(icon => (
        <a 
        key={icon.name} 
        href={icon.link} // Add the link here
        target='_blank' // Open in a new tab
        rel='noopener noreferrer' // Recomended for security
        className='p-[1.2vh] cursor-pointer inline-flex items-center rounded-full bg-gray-700
        mx-[0.8vh] text-[2.7vh] hover:text-gray-100 hover:bg-primary-blueLight duration-300'>
            <ion-icon name={icon.name}></ion-icon>
        </a>
       ))} 
    </div>
  )
}
