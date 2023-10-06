import React from 'react'

export default function Spinner() {
  return (
    <div className='bg-black bg-opacity-50 flex items-center justify-center fixed right-0 left-0 top-0 bottom-0 z-50'>
      <div>
        <img className='h-24' src="./images/spiner.svg" alt="Loading..." />
      </div>
    </div>
  )
}
