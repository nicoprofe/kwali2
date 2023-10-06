import React from 'react'

export default function Modal({ isOpen, onClose, imageUrl, modalKey, children}) {
    if(!isOpen) return null
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>

      <div className='fixed inset-0 bg-black opacity-50'></div>

      <div className='bg-white p-4 rounded-lg shadow-lg z-10'>
        <div className='max-h-full overflow-y-auto px-3'>
           {children}
           
        </div>
        <div className='flex justify-between mt-4 px-10 md:px-0'>
            <button
            onClick={onClose}
            className='bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded'>Cerrar</button>
        </div>
        
      </div>
        
      
    </div>
  )
}
