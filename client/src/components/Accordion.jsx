import React, { useState } from 'react';

export default function Accordion(props) {
  const [isActive, setIsActive] = useState(false);

  const handleToggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className={`bg-gray-200 p-5 mb-3 border border-[#c9c6c655] rounded-md w-full shadow duration-200 group ${
        isActive ? 'is-active bg-white' : ''
      }`}
    >
      <div onClick={handleToggleActive} className='flex items-start cursor-pointer'>
            <div className='w-full font-medium group-[.is-active]:underline'>{props.datas.question}</div>
            <div 
            style={{
                transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
                transiton: 'transform 0.2s ease-in-out',
            }}
            className='text-xl duration-200 cursor-pointer'>
                <p className=''>+</p>
            </div>
      </div>

      <div className={`overflow-hidden max-h-0 ease-in-out duration-200 transition-max-h group-[.is-active]:max-h-full`}>
        {props.datas.answer}
      </div>
    </div>
  );
}
