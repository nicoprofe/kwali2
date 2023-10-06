import React from 'react'

export default function TooltipForText({ content, imageSrc, children, isTooltipVisible}) {
    if(!isTooltipVisible) return <>{children}</>
  return (
    <div className='relative'>
        {children}
        <div className='absolute bg-gray-600 text-white p-2 rounded-md'> 
            {content}
            {imageSrc && <img src={imageSrc} alt='' className='mt-2'/>}
        </div>
    </div>
  )
}