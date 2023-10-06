import React from 'react'

export default function AdminTable() {
  return (
    <>
      <div className='bg-gray-100 h-screen p-5'>
            <h1 className='text-xl mb-2'>Your Orders</h1>

                <div className='overflow-auto rounded-lg shadow hidden md:block'>
                    <table className='w-full'>
                        <thead className='bg-gray-50 border-b-2 border-gray-200 '>
                            <tr>
                                <th className='w-24 p-3 text-sm font-semibold traking-wide text-left'>No.</th>
                                <th className='p-3 text-sm font-semibold traking-wide text-left'>Details</th>
                                <th className='w-24 p-3 text-sm font-semibold traking-wide text-left'>Status</th>
                                <th className='w-32 p-3 text-sm font-semibold traking-wide text-left'>Date</th>
                                <th className='w-24 p-3 text-sm font-semibold traking-wide text-left'>Total</th>
                            </tr>
                        </thead>

                        <tbody className='divide-y divide-gray-100'>
                            <tr className='bg-white'>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    <a href='#' className='font-bold text-blue-500 hover:underline'>451515</a> 
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Stickers Mate x 50</td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    <span className='p-1.5 text-xs font-medium uppercase
                                    text-green-800 bg-green-200 bg-opacity-50 tracking-wider ronded-lg'>Entregado</span>
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>23 de agosto</td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>$2300</td>
                            </tr>
                            <tr className='bg-gray-50'>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    <a href="#" className='font-bold text-blue-500 hover:underline'>23546</a>
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Stickers Espejo x 200</td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    <span className='p-1.5 text-xs font-medium uppercase
                                    text-green-800 bg-green-200 bg-opacity-50 tracking-wider ronded-lg'>Entregado</span>
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>24 de agosto</td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>$15000</td>
                            </tr>
                            <tr className='bg-white'>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    <a href='#' className='font-bold text-blue-500 hover:underline'>561515</a> 
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Stickers Holográficos x 50</td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    <span className='p-1.5 text-xs font-medium uppercase tracking-wider 
                                    text-yellow-800 bg-yellow-200 bg-opacity-50 rounded-lg'>Enviado</span>
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>11 de agosto</td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>$2400</td>
                            </tr>
                            <tr className='bg-gray-50'>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    <a href="#" className='font-bold text-blue-500 hover:underline'>15246</a>
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Stickers Metal Gold x 150</td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                                    <span className='p-1.5 text-xs font-medium uppercase tracking-wider 
                                    text-gray-800 bg-gray-200 bg-opacity-50 rounded-lg'>Cancelado</span>
                                </td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>2 de agosto</td>
                                <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>$15500</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* MOBILE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">

                    <div className='p-4 bg-white space-y-3 ronded-lg shadow'>
                        <div className='flex items-center space-x-2 text-sm'>
                            <div>
                                <a href="#" className='text-blue-500 font-bold hover:underline'>#451515</a>
                            </div>
                            <div className='text-gray-500'>23 de agosto</div>
                            <div className='p-1.5 text-xs font-medium uppercase tracking-wider
                            text-green-800 bg-green-200 bg-opacity-50 rounded-lg'>Entregado</div>
                        </div>
                        <div className='text-sm text-gray-700'>Stickers Mate x 50</div>
                        <div className='text-sm font-medium text-black'>$200</div>
                    </div>

                    <div className='p-4 bg-white space-y-3 ronded-lg shadow'>
                        <div className='flex items-center space-x-2 text-sm'>
                            <div>
                                <a href="#" className='text-blue-500 font-bold hover:underline'>#451515</a>
                            </div>
                            <div className='text-gray-500'>23 de agosto</div>
                            <div className='p-1.5 text-xs font-medium uppercase tracking-wider
                            text-gray-800 bg-gray-200 bg-opacity-50 rounded-lg'>Cancelado</div>
                        </div>
                        <div className='text-sm text-gray-700'>Stickers Mate x 50</div>
                        <div className='text-sm font-medium text-black'>$200</div>
                    </div>

                    <div className='p-4 bg-white space-y-3 ronded-lg shadow'>
                        <div className='flex items-center space-x-2 text-sm'>
                            <div>
                                <a href="#" className='text-blue-500 font-bold hover:underline'>#451515</a>
                            </div>
                            <div className='text-gray-500'>23 de agosto</div>
                            <div className='p-1.5 text-xs font-medium uppercase tracking-wider
                            text-yellow-800 bg-yellow-200 bg-opacity-50 rounded-lg'>Enviado</div>
                        </div>
                        <div className='text-sm text-gray-700'>Stickers Mate x 50</div>
                        <div className='text-sm font-medium text-black'>$200</div>
                    </div>

                    <div className='p-4 bg-white space-y-3 ronded-lg shadow'>
                        <div className='flex items-center space-x-2 text-sm'>
                            <div>
                                <a href="#" className='text-blue-500 font-bold hover:underline'>#451515</a>
                            </div>
                            <div className='text-gray-500'>23 de agosto</div>
                            <div className='p-1.5 text-xs font-medium uppercase tracking-wider
                            text-green-800 bg-green-200 bg-opacity-50 rounded-lg'>Entregado</div>
                        </div>
                        <div className='text-sm text-gray-700'>Stickers Mate x 50</div>
                        <div className='text-sm font-medium text-black'>$200</div>
                    </div>

                </div>
            
      </div>
    </>
  )
}
