import React from 'react'

export default function Tooltip({ content, imageSrc, children, isTooltipVisible}) {
    if(!isTooltipVisible) return <>{children}</>
  return (
    <div className='relative inline-block'>
        {children}
        <div className='absolute left-[-400px] md:left-[-700px] bg-gray-600 text-white p-2 rounded-md'> 

            <>
            {content}
            {imageSrc && <img src={imageSrc} alt='' className='mt-2'/>}
            </>
        </div>
    </div>
  )
}
